import { Flex, Heading, Text, Button } from "@chakra-ui/react";

const LandingTitle = () => {
    return (
        <Flex flexDirection='column' alignItems='center'>
           <TitleHeader />
           <TitleSubheader />
        </Flex>
    )
}

const TitleHeader = () => {
    return (
        <Flex color='gray.600' fontSize={{base:'25px', lg:'36px'}} textAlign='center' flexDirection='column' gap={{base:0, md:2}} className='rubik-extrabold' alignItems='center'>
            <Flex flexDirection={{base:'column', md:'row'}}>
                <Text display={{base:'none', md:'block'}} mr={{base:0, md:'10px'}}>LivConfess.</Text>
                <Text>Confessions written by</Text>
            </Flex>
            <Flex flexDirection={{base: 'column' , md:'row'}} gap={{base:0, md:2}}>
                <Text color='blue.300' mr={{base:0, md:'10px'}}>Liverpool University</Text>
                <Text color='gray.600'>students</Text>
            </Flex>
        </Flex>
    )
}

const TitleSubheader = () => {
    return (
        <Flex flexWrap='wrap' mt={{base: '20px', md:'60px'}} color='gray.600' fontSize={{base:'13px', lg:'17px'}} textAlign='center' flexDirection='column' className='rubik-medium' alignItems='center' gap={2}>
            <Flex alignItems='center' textAlign='center' flexDirection={{base:'column', md:'row'}} gap={2}>
                <Flex flexDirection='row' mr={{base: 0, md:'5px' }}>
                    <Text whiteSpace='none' className="rubik-bold" color='gray.700' mr='5px' textDecoration='underline' textDecorationColor='blue.300' textDecorationThickness='2px'>Upvote & Comment</Text>
                    <Text color='gray.600' >your favourites.</Text>
                </Flex>
                <Flex flexDirection='row' mr={{base: 0, md:'5px' }}>
                    <Text className="rubik-bold" color='gray.700' mr='5px' textDecoration='underline' textDecorationColor='blue.300' textDecorationThickness='2px'>Confess</Text>
                    <Text color='gray.600'>your worst.</Text>
                </Flex>
            </Flex>
            <Text color='gray.600'>No account needed!</Text>
        </Flex>
    )
}

export default LandingTitle;