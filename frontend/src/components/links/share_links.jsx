import { Flex, Box, useToast } from '@chakra-ui/react';

import { FaFacebook } from "react-icons/fa";
import { RiTwitterXLine } from "react-icons/ri";
import { FaFacebookMessenger } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { FaReddit } from "react-icons/fa";
import { FaLink } from "react-icons/fa6";
import { RiWhatsappFill } from "react-icons/ri";


export const ShareLinks = ({id}) => {
    return (
        <Flex w='100%' gap={3} justifyContent='center' flexDirection='row'>
            <CopyLink id={id}/>
            <FaceBookLink id={id}/>
            <MessengerLink id={id}/>
            <LinkedInLink id={id}/>
            <TwitterLink id={id}/>
            <RedditLink id={id}/>
        </Flex>
    )
}

const CopyLink = ({id}) => {

    const toast = useToast();

    const handleCopy = () => {
        copyToClipboard();
        toast({
            title: 'Copied to clipboard.',
            status: 'success',
            colorScheme: 'blue',
            duration: 9000,
            isClosable: true,
            position:'bottom-left'
          })
    }

    const copyToClipboard = () => {
        const textToCopy = `https://livconfessions.com/confession/${id}`;
    
        // Create a temporary textarea element
        const textarea = document.createElement('textarea');
        textarea.value = textToCopy;
    
        // Set the textarea to be invisible
        textarea.style.position = 'fixed';
        textarea.style.top = 0;
        textarea.style.left = 0;
        textarea.style.opacity = 0;
    
        // Append the textarea to the body
        document.body.appendChild(textarea);
    
        // Select the text within the textarea
        textarea.select();
    
        // Copy the selected text to the clipboard
        document.execCommand('copy');
    
        // Remove the textarea from the DOM
        document.body.removeChild(textarea);
    };

    return (
        <Flex onClick={handleCopy} cursor='pointer' justifyContent='center' alignItems='center' bg='gray.300' color='gray.500' borderRadius='50%' w={22} h={22}>
            <FaLink size={14} />
        </Flex>
    )
}


const FaceBookLink = ({id}) => {

    const handleDirect = () => {
        window.open(`https://www.facebook.com/sharer/sharer.php?u=https://livconfessions.com/confession/${id}`);
    }

    return (
        <Box onClick={handleDirect} cursor='pointer' color='#1877F2'>
            <FaFacebook size={22}/>
        </Box>
    )
}

const TwitterLink = ({id}) => {

    const handleDirect = () => {
        window.open(`https://twitter.com/intent/tweet?url=https://livconfessions.com/confession/${id}`);
    }

    return (
        <Flex onClick={handleDirect} cursor='pointer' justifyContent='center' alignItems='center' bg='black' color='white' borderRadius='50%' w={22} h={22}>
            <RiTwitterXLine size={13}/>
        </Flex>
    )
}

const MessengerLink = ({id}) => {

    const handleDirect = () => {
        window.open(`https://www.facebook.com/dialog/share?app_id=1234567890&display=popup&href='https://livconfessions.com/confession/${id}'`);
    }
    
    return (
        <Box onClick={handleDirect} cursor='pointer' color='#0078ff'> 
            <FaFacebookMessenger size={22}/>
        </Box>
    )
}

const LinkedInLink = ({id}) => {

    const handleDirect = () => {
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=https://livconfessions.com/confession/${id}`);
    }
    
    return (
        <Flex onClick={handleDirect} cursor='pointer' justifyContent='center' alignItems='center' bg='#0A66C2' color='white' borderRadius='50%' w={22} h={22}>
            <FaLinkedinIn size={11}/>
        </Flex>
    )
}

const RedditLink = ({id}) => {

    const handleDirect = () => {
        window.open(`https://www.reddit.com/submit?url=https://livconfessions.com/confession/${id}`);
    }

    return (
        <Box onClick={handleDirect} cursor='pointer' color='#FF5700'> 
            <FaReddit size={22}/>
        </Box>
    )
}
