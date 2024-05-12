import { Flex, Divider, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const Footer = () => {
    return (
        <Flex flexDirection='column' mt={{base:'80px', md:'130px'}}>
            <FooterDivider />
            <FooterTitle />
            <FooterLinkSection />
        </Flex>
    )
}

const FooterTitle = () => {
    return (
        <Flex  mb={{base:'30px', md:'60px'}} mt='50px' w='100%' justifyContent='center' cursor='pointer'>
            <Text fontSize={{base:'26px', lg:'30px'}} className='rubik-extrabold' color='gray.600'>LivConfess.</Text>
        </Flex>
    )
}

const FooterDivider = () => {
    return (
        <Flex w='85vw' maxW='650px' color='gray.400'>
            <Divider orientation="horizontal" />
        </Flex>
    )
}

const FooterLinkSection = () => {

    const navigate = useNavigate();

    const redirect_confessions = async () => {
        if (window.location.pathname !== '/') {
            await navigate('/')
        }
        document.getElementById('confessions').scrollIntoView({ behavior: 'smooth'});
    }

    const redirect_post = () => {
        navigate('/confess')
    }

    const discover_links = [
        {'title': 'Hot confessions', 'function': redirect_confessions},
        {'title': 'New confessions', 'function': redirect_confessions},
        {'title': 'Top confessions', 'function': redirect_confessions},
    ]

    const engage_links = [
        {'title': 'Post confession', 'function': redirect_post},
    ]

    const contact_links = [
        {'title': 'Give us feedback', 'function': redirect_post},
    ]


    return (
        <Flex flexDirection={{base: 'column', md:'row'}} textAlign={{base:'center', md:'start'}} justifyContent='space-between'>
            <FooterColumn header='Discover' links={discover_links} />
            <FooterColumn header='Engage' links={engage_links}/>
            <FooterColumn header='Contact' links={contact_links} />
        </Flex>
    )
}

const FooterColumn = ({header, links}) => {
    return (
        <Flex mb='60px' flexDirection='column' gap={6}>
            <Text fontSize='17px' className='rubik-medium' color='gray.600'>{header}</Text>
            <Flex flexDirection='column' gap={4} >
                {links.map((link, idx) => {
                    return <Link key={idx} title={link.title} redirection={link.function} />
                })}
            </Flex>
        </Flex>
    )
}

const Link = ({title, redirection}) => {

    return (
        <Text onClick={redirection} color='gray.600' fontSize='15px' cursor='pointer' _hover={{textDecoration:'underline'}}>{title}</Text>
    )
}

export default Footer;