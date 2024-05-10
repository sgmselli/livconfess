import { Flex, Heading, Text, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {

    const navigate = useNavigate();

    const handleNavigate = (route) => {
        navigate(`/${route}`)
    }

    return (
        <Flex maxW='800px' w='95%' h='85px'>
            <Flex bg='white' p={{base: '20px 15px 20px 25px', md:'30px 30px 30px 40px' }}w='100%' h='80px' justifyContent='space-between' alignItems='center' borderRadius={10} border='1px solid' borderColor='gray.300'>
                <Logo navigate={() => handleNavigate('')}/>
                <ConfessButton navigate={() => handleNavigate('confess')} />
            </Flex>
        </Flex>
    )
}

const Logo = ({navigate}) => {
    return (
        <Flex onClick={navigate} cursor='pointer'>
            <Text fontSize={{base:'18px', lg:'20px'}} className='rubik-extrabold' color='gray.600'>LivConfess.</Text>
        </Flex>
    )
}

const ConfessButton = ({navigate}) => {

    return (
        <Button onClick={navigate} transition="background-color 0.3s ease" _hover={{bg:'blue.400'}} _active={{bg:'blue.400'}} bg='blue.300' size='md' color='white' p={{base: '20px 18px', lg:'22px 20px'}}>
            <Flex gap={2} className='rubik-bold' justifyContent='center'>
                <Text fontWeight='extrabold' fontSize={{base: '14px', lg:'17px'}}>+</Text>
                <Text fontWeight='extrabold' justifySelf='center' alignSelf='center' fontSize={{base: '13px', lg:'15px'}}>Confess</Text>
            </Flex>
        </Button>
    )
}

export default Navbar;