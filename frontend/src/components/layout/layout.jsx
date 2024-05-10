import { ChakraProvider, Flex } from '@chakra-ui/react';

import LoadingBar from '../loading/loading_bar';
import Navbar from '../navbar/navbar';
import Footer from '../footer/footer';
import { useEffect } from 'react';
import { create_ip } from '../../api_endpoints/api_endpoints';

const Layout = ({children}) => {

    useEffect(() => {
        const createIP = async () => {
            await create_ip();
        }
        createIP();

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