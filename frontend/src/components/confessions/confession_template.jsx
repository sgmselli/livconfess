import { Flex, Text, Box } from '@chakra-ui/react';
import { useState, useEffect } from 'react';

import { downvote_post, upvote_post, is_downvoted, is_upvoted } from '../../api_endpoints/api_endpoints';

import { FaRegThumbsUp } from "react-icons/fa6";
import { FaThumbsUp } from "react-icons/fa6";
import { FaRegThumbsDown } from "react-icons/fa6";
import { FaThumbsDown } from "react-icons/fa6";

export const Confession = ({updateConfessions, id, text, username, time_stamp, upvotes, downvotes, commentsLength}) => {

    return (
        <Flex cursor='pointer' w='95vw' maxW='650px' minH='160px' bg='white' borderRadius={10} transition="border-color 0.3s ease" border='1px solid' borderColor='gray.300'>
            <Flex w='100%' p='22px 40px 20px 25px' flexDirection='row'>
                <Flex w='100%'  gap={10} flexDirection='column' justifyContent='space-between'>
                    <ConfessionText text={text} />
                    <ConfessionFooter updateConfessions={updateConfessions} id={id} username={username} time_stamp={time_stamp} upvotes={upvotes} downvotes={downvotes} commentsLength={commentsLength}/>
                </Flex>
            </Flex>
        </Flex>
    )
}

const ConfessionText = ({text}) => {
    return (
        <Text fontSize='16px' transition="color 0.3s ease" color='gray.600' fontWeight='medium'>{text}</Text>
    )
}

const ConfessionFooter = ({updateConfessions, id, username, time_stamp, upvotes, downvotes, commentsLength}) => {
    return (
        <Flex flexDirection='row' justifyContent='space-between' alignItems='center'>   
            <ConfessionDetails username={username} time_stamp={time_stamp} commentsLength={commentsLength}/>
            <ConfessionVotes updateConfessions={updateConfessions} id={id} upvotes={upvotes} downvotes={downvotes} />
        </Flex>
    )
}


const ConfessionVotes = ({updateConfessions, id, upvotes, downvotes}) => {

    const [upvoted, setUpvoted] = useState(false);
    const [downvoted, setDownvoted] = useState(false);

    useEffect(() => {
        isUpvoted();
        isDownvoted();
    }, [upvotes, downvotes])

    const isUpvoted = async () => {
        setUpvoted(await is_upvoted(id));
    }
    const isDownvoted = async () => {
        setDownvoted(await is_downvoted(id));
    }

    const handleUpVote = async () => {
        await upvote_post(id);
        isUpvoted();
        isDownvoted();
        updateConfessions();
    }

    const handleDownVote = async (e) => {
        await downvote_post(id);
        isUpvoted();
        isDownvoted();
        updateConfessions();
        e.stopPropagation();
    }

    const vote_count = () => {
        return upvotes.length - downvotes.length
    }

    return (
        <Flex flexDirection='row' alignItems='center' gap={{base:2, md: 3}}>
            {
                !upvoted ?
                    <Box className='noredirect' cursor='pointer' onClick={handleUpVote} fontSize={{base: 16, lg: 18}}>
                        <FaRegThumbsUp />
                    </Box>
                    :
                    <Box className='noredirect' color='gray.600' cursor='pointer' onClick={handleUpVote} fontSize={{base: 16, lg: 18}}>
                        <FaThumbsUp />
                    </Box>
            }

            <Text fontSize={{base: '14px', lg: '16px'}} color='gray.600' className="rubik-bold">{vote_count()}</Text>

            {
                !downvoted ?
                    <Box className='noredirect' cursor='pointer' onClick={(e) => handleDownVote(e)} fontSize={{base: 16, lg: 18}}>
                        <FaRegThumbsDown   />
                    </Box>
                    :
                    <Box className='noredirect' color='gray.600' cursor='pointer' onClick={handleDownVote} fontSize={{base: 16, lg: 18}}>
                        <FaThumbsDown/>
                    </Box>
            }
        </Flex>
    )
}

const ConfessionDetails = ({username, time_stamp, commentsLength}) => {

    const getTimeAgo = (timestamp) => {
        const now = new Date();
        const postTime = new Date(timestamp);
    
        const timeDifference = now - postTime;
        const seconds = Math.floor(timeDifference / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);
        const months = Math.floor(days / 30);
        const years = Math.floor(months / 12);
    
        if (seconds < 60) {
            return seconds === 1 ? "1 second ago" : seconds + " seconds ago";
        } else if (minutes < 60) {
            return minutes === 1 ? "1 minute ago" : minutes + " minutes ago";
        } else if (hours < 24) {
            return hours === 1 ? "1 hour ago" : hours + " hours ago";
        } else if (days < 30) {
            return days === 1 ? "1 day ago" : days + " days ago";
        } else if (months < 12) {
            return months === 1 ? "1 month ago" : months + " months ago";
        } else {
            return years === 1 ? "1 year ago" : years + " years ago";
        }
    }

    return (
        <Flex flexDirection='row' flexWrap='nowrap' color='gray.400' fontSize={{base: '9px', lg:'12px'}} fontWeight='medium'>
            <Text mr='4px'>Posted by</Text><Text fontWeight='extrabold' mr='4px'>{username}</Text>
            <Text>{getTimeAgo(time_stamp)}</Text><Text ml='5px' mr='5px'>|</Text>
            <Text cursor='pointer' _hover={{textDecoration:'underline', color:'blue.300'}}>{commentsLength} comments</Text>
        </Flex>
    )
}