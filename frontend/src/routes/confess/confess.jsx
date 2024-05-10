import { ChakraProvider, Flex, Text, Textarea, Input, Checkbox, Button, useToast, InputLeftAddon, InputGroup } from '@chakra-ui/react';
import { useState } from 'react';

import LoadingBar from '../../components/loading/loading_bar';
import BackButton from '../../components/back_button/back_button';

import { IoSend } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import { post_confession } from '../../api_endpoints/api_endpoints';


const Confess = () => {
    return (    
        <ChakraProvider>
            <LoadingBar />
            <ConfessBody />
        </ChakraProvider>
    )
}

const ConfessBody = () => {
    return (
        <Flex pt='20px' w='92vw' maxW='650px' flexDirection='column' alignItems='center'>
            <BackButton />
            <Title />
            <Form />
        </Flex>
    )
}

const Title = () => {
    return (
        <Text mt={{base: '10px',md:'15px'}} w='100%' className='rubik-bold' fontSize={{base: '34px', md:'40px'}} color='gray.600'>Got something to confess?</Text>
    )
}

const Form = () => {

    const [username, setUsername] = useState('anonymous');
    const [confession, setConfession] = useState('');
    const [insta, setInsta] = useState('')
    const [isAnonymous, setAnonymous] = useState(true);
    const [characterError, setCharacterError] = useState(false);
    const navigate = useNavigate();
    const toast = useToast();

    const removeError = () => {
        setCharacterError(false)
    }

    const handleSubmit = async () => {
        try {
            if (confession.length < 3) {
                setCharacterError(true)
            } else {
                navigate('/')
                await post_confession(username, confession)
                toast({
                    title: 'Confession posted.',
                    status: 'success',
                    colorScheme: 'blue',
                    duration: 9000,
                    isClosable: true,
                    position:'bottom-left'
                  })
            }
        } catch {
            toast({
                title: 'Confession failed to post.',
                status: 'error',
                colorScheme: 'red',
                duration: 9000,
                isClosable: true,
                position:'bottom-left'
              })
        }
    }

    const changeAnonymous = () => {
        if (!isAnonymous) {
            setUsername('anonymous')
        }
        setAnonymous(!isAnonymous)
        
    }

    return (
        <Flex w='100%' mt={{base: '20px', md:'30px'}} flexDirection='column'>
            <ConfessionTextSection setConfession={setConfession} characterError={characterError} removeError={removeError} />
            <UsernameSection setUsername={setUsername} isAnonymous={isAnonymous} changeAnonymous={changeAnonymous} />
            <InstagramSection setInsta={setInsta} />
            <Submit submit={handleSubmit} />
        </Flex>
    )
}

const Submit = ({submit}) => {
    return (
        <Button onClick={submit} size='lg' bg='blue.300' color='white' mt='40px' transition="background-color 0.3s ease" _hover={{bg:'blue.400'}} _active={{bg:'blue.400'}}>
            <Flex flexDirection='row' alignItems='center' gap={2}>
                <Text fontSize='14px' className='rubik-bold'>CONFESS</Text>
                <IoSend size={12}/>
            </Flex>
        </Button>
    )
}

const ConfessionTextSection = ({setConfession, characterError, removeError}) => {
    return (
        <Flex flexDirection='column'>
            <Flex flexDirection='column'>
                <Flex mb='10px' fontSize='14px' fontWeight='medium'>
                    <Text color='gray.600'  mr='1px'>Your Confession</Text><Text color='orange.500'>*</Text>
                </Flex>
                <Textarea fontSize='14px' onClick={removeError} placeholder='Want to confess something?' className='input' bg='white' minH={{base:'100px', md:'140px'}} borderColor={characterError ? 'red.200' : 'gray.300'} outline='none' _active={{borderColor:'black'}} _hover={characterError ? {borderColor:'red.200'} : {borderColor:'gray.300'}} _focus={{borderColor:'gray.200', border:'1px', outline:'none'}} resize='none' onChange={(e) => setConfession(e.target.value)}/>
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

const CheckboxSection = ({isAnonymous, changeAnonymous}) => {
    return (
        <Checkbox className='noSelect' onChange={() => changeAnonymous()} isChecked={isAnonymous} colorScheme='blue' size='sm' fontSize='14px' color='gray.600' fontWeight='medium' borderColor='gray.300'>Anonymous</Checkbox>
    )
}

const InputSection = ({isAnonymous, setUsername}) => {
    return (
        <Flex mt='20px' flexDirection='column'>
            <Input fontSize='14px'  onChange={(e) => setUsername(e.target.value)} disabled={isAnonymous} className='input' borderColor='gray.300' bg='white' outline='none' _active={{borderColor:'gray.500'}} _focus={{borderColor:'gray.500'}}/>
            <Text mt='8px' fontSize='12px' color='gray.500'>Choose a username that will show on your confession or keep it anonymous.</Text>
        </Flex>
    )
}

const UsernameSection = ({isAnonymous, changeAnonymous, setUsername}) => {
    return (
        <Flex mt={{base:'20px', md:'40px'}} flexDirection='column'>
            <Flex mb='15px' fontSize='14px'><Text mr='1px' color='gray.600'>Username</Text><Text color='orange.500'>*</Text></Flex>
            <CheckboxSection changeAnonymous={changeAnonymous} isAnonymous={isAnonymous}/>
            <InputSection isAnonymous={isAnonymous} setUsername={setUsername}/>
        </Flex>
    )
}

const InputInstagram= ({setInsta}) => {
    return (
        <Flex mt='20px' flexDirection='column'>
            <InputGroup >
                <InputLeftAddon borderColor='gray.300'>@</InputLeftAddon>
                <Input fontSize='14px'  onChange={(e) => setInsta(e.target.value)} className='input' borderColor='gray.300' bg='white' outline='none' _active={{borderColor:'gray.500'}} _focus={{borderColor:'gray.500'}}/>
            </InputGroup>
            <Text mt='8px' fontSize='12px' color='gray.500'>Enter you username and your Instagram will be linked to your confession.</Text>
        </Flex>
    )
}

const InstagramSection = ({setInsta}) => {
    return (
        <Flex mt={{base:'20px', md:'40px'}} flexDirection='column'>
            <Flex flexDirection='row' alignItems='center'>
                <Text fontSize='14px' color='gray.600' mr='3px'>Link your Instagram</Text>
                <Text fontSize='10px' color='gray.500' pt='2px'>(Optional)</Text>
            </Flex>
            <InputInstagram setInsta={setInsta} />
        </Flex>
    )
}

export default Confess;