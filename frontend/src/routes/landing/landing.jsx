import { ChakraProvider, Flex } from '@chakra-ui/react';

import LoadingBar from '../../components/loading/loading_bar';
import LandingTitle from '../../components/landing_title/landing_title';
import LandingBottom from '../../components/landing_bottom/landing_bottom';
import ConfessTabs from '../../components/confessions_tab/confessions_tab';

const Landing = () => {
    return (    
        <ChakraProvider>
            <LoadingBar />
            <Flex pt={{base: '20px', md: '50px'}} flexDirection='column' alignItems='center' maxW='800px' margin='auto'>
                <LandingTitle />
                <ConfessTabs />
                <LandingBottom />
            </Flex>
        </ChakraProvider>
    )
}

export default Landing;