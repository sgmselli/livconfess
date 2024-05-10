import { Flex, Box } from '@chakra-ui/react';

import { FaFacebook } from "react-icons/fa";
import { RiTwitterXLine } from "react-icons/ri";
import { FaFacebookMessenger } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { FaReddit } from "react-icons/fa";
import { FaLink } from "react-icons/fa6";
import { RiWhatsappFill } from "react-icons/ri";


export const ShareLinks = () => {
    return (
        <Flex w='100%' gap={3} justifyContent='center' flexDirection='row'>
            <CopyLink />
            <FaceBookLink />
            <MessengerLink />
            <LinkedInLink />
            <TwitterLink />
            <RedditLink />
            <WhatsAppLink />
        </Flex>
    )
}

const CopyLink = () => {
    return (
        <Flex justifyContent='center' alignItems='center' bg='gray.300' color='gray.500' borderRadius='50%' w={22} h={22}>
            <FaLink size={14} />
        </Flex>
    )
}


const FaceBookLink = () => {

    const handleDirect = () => {
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent('http://localhost:3000/confession/29')}`);
    }

    return (
        <Box onClick={handleDirect} cursor='pointer' color='#1877F2'>
            <FaFacebook size={22}/>
        </Box>
    )
}

const TwitterLink = () => {

    const handleDirect = () => {
        window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent('http://localhost:3000/confession/29')}`);
    }

    return (
        <Flex onClick={handleDirect} cursor='pointer' justifyContent='center' alignItems='center' bg='black' color='white' borderRadius='50%' w={22} h={22}>
            <RiTwitterXLine size={13}/>
        </Flex>
    )
}

const MessengerLink = () => {
    return (
        <Box cursor='pointer' color='#0078ff'> 
            <FaFacebookMessenger size={22}/>
        </Box>
    )
}

const LinkedInLink = () => {
    return (
        <Flex cursor='pointer' justifyContent='center' alignItems='center' bg='#0A66C2' color='white' borderRadius='50%' w={22} h={22}>
            <FaLinkedinIn size={11}/>
        </Flex>
    )
}

const RedditLink = () => {
    return (
        <Box cursor='pointer' color='#FF5700'> 
            <FaReddit size={22}/>
        </Box>
    )
}

const WhatsAppLink = () => {
    return (
        <Box cursor='pointer' color='#25D366'> 
            <RiWhatsappFill size={25}/>
        </Box>
    )
}
