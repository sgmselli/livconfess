import { Flex, Box, SkeletonText } from "@chakra-ui/react"

const LoadingConfession = () => {
    return (
        <Flex cursor='pointer' w='95vw' maxW='650px' minH='160px' bg='white' borderRadius={10} border='1px solid' borderColor='gray.300' >
            <Box w='100%' p={{base:'20px 18px 18px 23px', lg:'10px 40px 20px 25px'}}>
                <SkeletonText mt='4' noOfLines={4} spacing='4' skeletonHeight='2' />
            </Box>
        </Flex>
    )
}

export default LoadingConfession;