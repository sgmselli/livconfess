import { Flex, Text,Box } from '@chakra-ui/react';
import { useState } from 'react';

import { IoArrowBackCircleOutline } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
 
const BackButton = () => {

    const [isHovered, setHovered] = useState(false);

    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate('/')
    }

    const handleEnter = () => {
        setHovered(true);
    }

    const handleLeave = () => {
        setHovered(false);
    }

    return (
        <Flex pl={{base:'10px', md:0}} w='100%'>
            <Flex onClick={handleNavigate} cursor='pointer' flexDirection='row' alignItems='center' gap={2} onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
                <Box fontSize={{base:14, md:16}}>
                    <IoArrowBackCircleOutline/>
                </Box>
                <Text fontSize={{base: '14px', md:'16px'}} textDecoration={isHovered ? 'underline' : ''} >Back</Text>
            </Flex>
        </Flex>
    )
}

export default BackButton;