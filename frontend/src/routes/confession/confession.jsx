import { ChakraProvider, Flex, Text, Textarea, Input, Button, Checkbox, Box, Spinner } from '@chakra-ui/react';
import { useState, useEffect } from 'react';

import LoadingBar from '../../components/loading/loading_bar';
import LoadingConfession from '../../components/loading/loading_confessions';
import BackButton from '../../components/back_button/back_button';
import { comment_is_downvoted, comment_is_upvoted, downvote_comment, get_confession, post_comment, upvote_comment } from '../../api_endpoints/api_endpoints';

import { Confession } from '../../components/confessions/confession_template';
import { ShareLinks } from '../../components/links/share_links';
import { FaRegCommentDots } from "react-icons/fa";

import { FaRegThumbsUp } from "react-icons/fa6";
import { FaThumbsUp } from "react-icons/fa6";
import { FaRegThumbsDown } from "react-icons/fa6";
import { FaThumbsDown } from "react-icons/fa6";

import { useToast } from '@chakra-ui/react'

const ConfessionRoute = () => {
    return (    
        <ChakraProvider>
            <LoadingBar />
            <ConfessionBody />
        </ChakraProvider>
    )
}

const ConfessionBody = () => {

    const [confession, setConfession] = useState()

    useEffect(() => {
        fetch_confession();
    }, [])    

    const get_id = () => {
        const path_array = window.location.pathname.split('/');
        return path_array[path_array.length - 1];
    }

    const fetch_confession = async () => {
        setConfession(await get_confession(get_id()));
    }

    return (
        <>
            {
                confession ?
                <Flex pt='20px' maxW='650px' w='92vw' flexDirection='column' alignItems='center'>
                <BackButton/>
                <Title username={confession ? confession.username : ''}/>

                <ConfessionPosted confession={confession} updateConfessions={fetch_confession} />
                <CommentSection id={confession ? confession.id : ''} comments={confession ? confession.comments : []} updateConfessions={fetch_confession} />
                </Flex>
                
                   
                :
                <Flex pt='155px' pb='100vh' alignItems='center' justifyContent='center'>
                   <LoadingConfession/>
                </Flex>
                
           
            }

</>
        
    )
}

const Title = ({username}) => {
    return (
        <Flex w='100%' flexDirection='column'>
            <Text mt='15px' className='rubik-bold' fontSize={{base: '26px', md: '32px'}} color='gray.600'>
                {username === 'anonymous' ?
                    'Anonymous confession' 
                :
                    `${username}'s confession`
                }
            </Text>
        
            <Text fontWeight='medium' fontSize='16px' color='gray.400'>Vote, comment & share this confession!</Text>
        </Flex>
    )
}

const ConfessionPosted = ({confession, updateConfessions}) => {

    return (
        <Flex mt='30px'>
            {
                confession ?

                    <Flex flexDirection='column' gap={5}>
                        <Confession idx={1} updateConfessions={updateConfessions} id={confession.id} text={confession.text} username={confession.username} time_stamp={confession.time_stamp} upvotes={confession.upvotes} downvotes={confession.downvotes} commentsLength={confession.comments.length}/>
                        <ShareLinks id={confession.id} />
                    </Flex>

                :

                    'loading'
            }
        </Flex>
    )
}

const CommentSection = ({id, comments, updateConfessions}) => {
    
    return (
        <Flex w='100%' flexDirection='column'>
            <CommentForm id={id} updateConfessions={updateConfessions}/>
            <CommentList comments={comments} updateConfessions={updateConfessions}/>
        </Flex>
    )
}

const CommentForm = ({id, updateConfessions}) => {

    const [text, setText] = useState('')
    const toast = useToast();

    const handleSubmit = async () => {
        if (text.length > 3) {
            await post_comment(id, text)
            updateConfessions();
            document.getElementById('textarea').value = '';
            setText('')
            toast({
                title: 'Comment added.',
                status: 'success',
                colorScheme: 'blue',
                duration: 9000,
                isClosable: true,
                position:'bottom-left'
              })
        }
    }

    return (
        <Flex mt='40px' w='100%' flexDirection='column'>
            <CommentInput setText={setText} />
            <Submit handleSubmit={handleSubmit}/>
        </Flex>
    )
}

const CommentInput = ({setText}) => {
    const characterError = false
    return (
        <Flex w='100%' flexDirection='column'>
            <Flex flexDirection='column'>
                <Flex mb='10px' fontSize='14px' fontWeight='medium'><Text  color='gray.500'>Your Comment</Text><Text color='orange.500'>*</Text></Flex>
                <Textarea id='textarea' placeholder='Want to comment something?' className='input' bg='white' minH='70px' borderColor={characterError ? 'red.200' : 'gray.300'} outline='none' _active={{borderColor:'black'}} _hover={characterError ? {borderColor:'red.200'} : {borderColor:'gray.300'}} _focus={{borderColor:'gray.200', border:'1px', outline:'none'}} onChange={(e) => setText(e.target.value)} />
            </Flex>
            {
                characterError ?
                    <Text color='red.300' fontSize='11px'>*A minimum of 3 characters is required.</Text>
                :
                    ''
            }
        </Flex>
    )
}

const Submit = ({handleSubmit}) => {
    return (
        <Button onClick={handleSubmit} w='120px' size='md' bg='blue.300' color='white' mt='20px' transition="background-color 0.3s ease" _hover={{bg:'blue.400'}} _active={{bg:'blue.400'}}>
            <Flex flexDirection='row' alignItems='center' gap={2}>
                <Text fontSize='12px' className='rubik-bold'>COMMENT</Text>
                <FaRegCommentDots size={14} />
            </Flex>
        </Button>
    )
}

const CommentList = ({comments, updateConfessions}) => {
    return (
        <Flex mt='40px' flexDirection='column' gap={8}>

            {
            
            comments ?

                comments.length > 0 ?

                    comments.map((comment, idx) => {
                        return <Comment key={idx} id={comment.id} comment={comment.text} upvotes={comment.upvotes} downvotes={comment.downvotes} updateConfessions={updateConfessions} time_stamp={comment.time_stamp}/>
                    }).reverse()

                :

                <Flex flexDirection='row' color='gray.600' fontWeight='medium' fontSize='14px'>
                    <Text mr='4px'>This confession has no comments...</Text>
                    <Text textDecoration='underline '>Add yours</Text>
                    <Text>!</Text>
                </Flex>

            :
                ''
        
            }
        </Flex>
    )
}

const Comment = ({id, comment, upvotes, downvotes, time_stamp, updateConfessions}) => {

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
        <Flex flexDirection='column' w='100%' gap={3} >
            <Text fontSize='10px' color='gray.600'>Commented anonymously {getTimeAgo(time_stamp)}</Text>
          
            <Flex flexDirection='row' gap={8}>
                <CommentVotes id={id} upvotes={upvotes} downvotes={downvotes} updateConfessions={updateConfessions}/>
                <Text fontSize='14px' color='gray.700'> {comment}</Text>
            </Flex>
            
        </Flex>
    )
}

const CommentVotes = ({updateConfessions, upvotes, downvotes, id}) => {

    const [upvoted, setUpvoted] = useState(false);
    const [downvoted, setDownvoted] = useState(false);

    useEffect(() => {
        isUpvoted();
        isDownvoted();
    }, [upvotes, downvotes])

    const isUpvoted = async () => {
        setUpvoted(await comment_is_upvoted(id));
    }
    
    const isDownvoted = async () => {
        setDownvoted(await comment_is_downvoted(id));
    }

    const handleUpVote = async () => {
        await upvote_comment(id);
        isUpvoted();
        isDownvoted();
        updateConfessions();
    }

    const handleDownVote = async (e) => {
        await downvote_comment(id);
        isUpvoted();
        isDownvoted();
        updateConfessions();
    }

    const vote_count = () => {
        return upvotes.length - downvotes.length
    }

    return (
        <Flex flexDirection='row' alignItems='center' gap={2}>
            {
                !upvoted ?
                    <Box className='noredirect' cursor='pointer' onClick={handleUpVote}>
                        <FaRegThumbsUp size={14} />
                    </Box>
                    :
                    <Box className='noredirect' color='gray.600' cursor='pointer' onClick={handleUpVote}>
                        <FaThumbsUp size={14} />
                    </Box>
            }

            <Text color='gray.600' fontSize='14px' className="rubik-bold">{vote_count()}</Text>

            {
                !downvoted ?
                    <Box className='noredirect' cursor='pointer' onClick={handleDownVote}>
                        <FaRegThumbsDown size={14} />
                    </Box>
                    :
                    <Box className='noredirect' color='gray.600' cursor='pointer' onClick={handleDownVote}>
                        <FaThumbsDown size={14}/>
                    </Box>
            }
        </Flex>
    )
}

export default ConfessionRoute;