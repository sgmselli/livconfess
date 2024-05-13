import { Flex, Text, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const LandingBottom = () => {
    return (
        <Flex maxW='650px' mt='40px' flexDirection='column' alignItems='center'>
            <BottomText />
            <ConfessButton />
            <About />
        </Flex>
    )   
}

const BottomText = () => {
    return (
        <Flex fontSize={{base: '14px', lg:'16px'}} color='gray.700'><Text mr='3px'>You've reached the end of confessions...</Text><Text fontWeight='bold'>Awkard.</Text></Flex>
    )
}

const ConfessButton = () => {

    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate('/confess')
    }

    return (
        <Button onClick={handleNavigate} mt='50px' bg='blue.300' p={{base: '36px 28px', lg:'38px 30px'}} borderRadius={10} transition="background-color 0.3s ease" _hover={{bg:'blue.400'}} _active={{bg:'blue.400'}}>
            <Flex flexDirection='column' color='white' className="rubik-bold" fontSize={{base: '16px', lg:'18px'}}>
                <Text>
                    Write your
                </Text>
                <Text>
                    confession.
                </Text>
            </Flex>
        </Button>
    )
}

const About = () => {
    return (
        <Flex mt='100px' flexDirection='column' gap={8} w='85vw' maxW='650px'>
            <Text color='gray.700' fontSize={{base: '22px', md:'24px'}} className='rubik-bold'>What is LivConfess?</Text>
            <Flex color='gray.600' fontWeight='medium' flexDirection='column' fontSize={{base: '15px', md:'17px'}} gap={8}>
                <Flex flexDirection='column'>
                    
                     <Text >LivConfess is a social media for students in the city of Liverpool, United Kingdom. Students post confessions on their experiences in uni, no matter how messed up. Scroll through confessions, upvote, downvote, comment--no account needed. See your posted confession is the current hottest, or if it makes it to the top voted!</Text>
            
                    {/* <Text>Students post confessions on their experiences in uni, no matter how messed up.</Text> */}
                    {/* <Text>Scroll through confessions, upvote, downvote, comment--no account needed.</Text>
                    <Text>See you posted confession is the current hottest, or if it makes it to the top voted!</Text> */}
                </Flex>
                {/* <Flex><Text mr='4px'>Feel free to give us some</Text><Text textDecoration='underline'>feedback</Text><Text>.</Text></Flex> */}
            </Flex>
        </Flex>
        
    )
}

export default LandingBottom;