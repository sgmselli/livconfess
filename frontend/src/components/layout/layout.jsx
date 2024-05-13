import { ChakraProvider, Flex } from '@chakra-ui/react';
import Navbar from '../navbar/navbar';
import Footer from '../footer/footer';
import { useEffect } from 'react';
import { initialise_storage, get_user_key, check_if_storage_exists } from '../../local_storage';

const Layout = ({children}) => {

    useEffect(() => {
        const createKey = async () => {
            if (!check_if_storage_exists) {
                await initialise_storage();
                get_user_key();
            }
        }
        createKey();
    }, [])

    return (
        <ChakraProvider>
            <Flex minH='100vh' w='100vw' bg='#F5F8FA' pt={{base: '20px', md:'30px'}} pb={{base: '50px', md:'150px'}} alignItems='center' flexDirection='column' >
                <Navbar />
                {children}
                <Footer />
            </Flex>
        </ChakraProvider>
    )
}

export default Layout;