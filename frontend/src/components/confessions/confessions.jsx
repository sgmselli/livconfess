import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Flex, Text, Divider, AbsoluteCenter, Box } from "@chakra-ui/react"

import { FaRegThumbsUp } from "react-icons/fa6";
import { FaThumbsUp } from "react-icons/fa6";
import { FaRegThumbsDown } from "react-icons/fa6";
import { FaThumbsDown } from "react-icons/fa6";
import { MdAddCircleOutline } from "react-icons/md";
import { FaStar } from "react-icons/fa";
import { GrInstagram } from "react-icons/gr";

import { downvote_post, is_downvoted, is_upvoted, upvote_post } from "../../api_endpoints/api_endpoints";
import { check_confession_downvote, check_confession_upvote, check_if_storage_exists, click_confession_downvote, click_confession_upvote } from "../../local_storage";

import LoadingConfession from "../loading/loading_confessions";

const ConfessionList = ({confessions, updateConfessions}) => {
    return (
        <Flex maxW='650px' flexDirection='column' gap={{base: 4, md:6}} alignItems='center' justifyContent='center' mt={{base: '10px', md:'20px'}}>
            {
                confessions ?

                    confessions.map((confession, idx) => {

                        if (idx == 3 || idx == 15 || idx == 32 || idx == 55 || idx == 86) {
                            return <AddConfession key={idx} />
                        } else {
                            return <Confession key={idx} updateConfessions={updateConfessions} idx={idx+1} id={confession.id} text={confession.text} username={confession.username} insta={confession.instagram} time_stamp={confession.time_stamp} upvotes={confession.upvotes} downvotes={confession.downvotes} commentsLength={confession.comments.length}/>
                        }

                    })
                
                :

                <>
                <LoadingConfession />
                <LoadingConfession />
                <LoadingConfession />
                </>
                    
           
                
            }

        </Flex>
    )
}

const Confession = ({idx, updateConfessions, id, text, username, insta, time_stamp, upvotes, downvotes, commentsLength}) => {

    const [isHovered, setHovered] = useState(false);
    const navigate = useNavigate();

    const handleEnter = () => {
        setHovered(true);
    }
    
    const handleLeave = () => {
        setHovered(false);
    }

    const handleDirect = (e) => {
        if (e.target.tagName !== 'path' && e.target.tagName !== 'svg' ) {
            navigate(`confession/${id}`)
        }
    }

    return (
        <Flex onClick={(e) => handleDirect(e)} cursor='pointer' w='95vw' maxW='650px' minH='160px' bg='white' borderRadius={10} transition="border-color 0.3s ease" border='1px solid' borderColor={isHovered ? 'gray.500' : 'gray.300' } onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
            <Flex w='100%' p={{base:'20px 18px 18px 23px', lg:'22px 40px 20px 25px'}} flexDirection='row' justifyContent='space-between' gap={4}>
                <Box display={{base:'none', md:'block'}}>
                    <ConfessionNum idx={idx}/>
                </Box>
                <Flex w='100%' gap={10} flexDirection='column' justifyContent='space-between'>
                    <ConfessionText isHovered={isHovered} text={text} />
                    <ConfessionFooter updateConfessions={updateConfessions} id={id} username={username} insta={insta} time_stamp={time_stamp} upvotes={upvotes} downvotes={downvotes} commentsLength={commentsLength}/>
                </Flex>
            </Flex>
        </Flex>
    )
}

const ConfessionText = ({text, isHovered}) => {
    return (
        <Text fontSize={{base: '14px', lg:'16px'}} color='gray.600' fontWeight='medium'>{text}</Text>
    )
}

const ConfessionFooter = ({updateConfessions, id, username, insta, time_stamp, upvotes, downvotes, commentsLength}) => {
    return (
        <Flex flexDirection='row' justifyContent='space-between' alignItems='center'>   
            <ConfessionDetails username={username} insta={insta} time_stamp={time_stamp} commentsLength={commentsLength}/>
            <ConfessionVotes updateConfessions={updateConfessions} id={id} upvotes={upvotes} downvotes={downvotes} />
        </Flex>
    )
}

const ConfessionNum = ({idx}) => {
    return (
        <Flex flex={1} flexDirection='column' className="rubik-medium" >
            <Text color='gray.500' fontSize={{base: '14px', lg:'16px'}}>{idx}.</Text>
        </Flex>
    )
}

const ConfessionVotes = ({updateConfessions, id, upvotes, downvotes}) => {

    const [upvoted, setUpvoted] = useState(false);
    const [downvoted, setDownvoted] = useState(false);
    // const [voteCount, setVoteCount] = useState(upvotes.length - downvotes.length);

    useEffect(() => {
        isUpvoted();
        isDownvoted();
    }, [upvotes, downvotes])

    const isUpvoted = () => {
        setUpvoted(check_confession_upvote(id))

    }
    const isDownvoted = () => {
        setDownvoted(check_confession_downvote(id));
    }

    const handleUpVote = async () => {  
        click_confession_upvote(id);
        isUpvoted();
        isDownvoted();
        await upvote_post(id);  
        updateConfessions();
    }

    const handleDownVote = async (e) => {
        click_confession_downvote(id);
        isUpvoted();
        isDownvoted();
        await downvote_post(id); 
        updateConfessions();
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

const ConfessionDetails = ({username, insta, time_stamp, commentsLength}) => {

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
            <Text mr='4px'>Posted by</Text>
            <Username username={username} insta={insta} />
            <Text>{getTimeAgo(time_stamp)}</Text><Text ml='5px' mr='5px'>|</Text>
            <Text cursor='pointer' _hover={{textDecoration:'underline', color:'blue.300'}}>{commentsLength} comments</Text>
        </Flex>
    )
}

const Username = ({username, insta}) => {

    const handleNavigate = () => {
        window.open(`https://www.instagram.com/${insta}`, "_blank");
    }

    return (
        <>
            {insta !== '' ?
                <Flex  onClick={handleNavigate} cursor='pointer' flexDirection='row' gap={1} _hover={{textDecoration:'underline', color:'blue.300'}} alignItems='center'>
                    <Box pt='2px'>
                        <GrInstagram size={10} />
                    </Box>
                    <Text fontWeight='extrabold' mr='4px'>{username}</Text>
                </Flex>
                :
                <Text mr='4px'>{username}</Text>
            }
        </>
        
    )
    
}

const AddConfession = () => {

    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate('/confess')
    }

    return (
        <Flex onClick={handleNavigate} w='95vw' maxW='645px' minH='90px' bg='blue.300' _hover={{bg:'blue.400'}} transition="background-color 0.3s ease" borderRadius={12} boxShadow=' 0px 3px 3px rgb(220, 220, 220)' cursor='pointer'>
            <Flex p='10px 40px 10px 35px' flexDirection='row' gap={5}>
               <Flex justifyContent='center' alignItems='center' color='white' fontSize={{base: 20,lg: 25}}>
                    <MdAddCircleOutline />
               </Flex>
               <Flex flexDirection='column' justifyContent='center' color='white'>
                    <Text fontSize={{base:'14px', lg:'17px'}} className="rubik-bold">
                        You have a confession? Add your own.
                    </Text>
                    <Text fontSize={{base:'11px', lg:'14px'}} fontWeight='medium'>
                        No account needed!
                    </Text>
               </Flex>
            </Flex>
        </Flex>
    )
}

const SponserUs = () => {
    return (
        <Box position='relative' w='100%' p='20px 0' color='gray.600'>
            <AbsoluteCenter bg='#F5F8FA' px='10' cursor='pointer'>
                <Flex flexDirection='row' gap={4} alignItems='center' justifyContent='center'>
                <FaStar />
                    <Text className="rubik-medium" fontSize='14px'>SPONSER US</Text> 
                <FaStar />

                </Flex>
            </AbsoluteCenter>
        </Box>
    )
}

export default ConfessionList;