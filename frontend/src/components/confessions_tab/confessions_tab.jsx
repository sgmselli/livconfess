import { Flex, Text, Box } from "@chakra-ui/react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'

import { useEffect, useState } from 'react';
import { get_hot_confessions, get_new_confessions, get_top_confessions, is_downvoted, is_upvoted } from '../../api_endpoints/api_endpoints.js'

import { HiOutlineSparkles } from "react-icons/hi";
import { BsFillBarChartFill } from "react-icons/bs";
import { IoMdFlame } from "react-icons/io";

import ConfessionList from "../confessions/confessions.jsx";
import { add_confession_downvote, add_confession_upvote, check_confession_downvote, check_confession_upvote, check_if_storage_exists, initialise_storage } from "../../local_storage.js";

const ConfessTabs = () => {

    const [hotConfessions, setHotConfessions] = useState(null);
    const [newConfessions, setNewConfessions] = useState(null);
    const [topConfessions, setTopConfessions] = useState(null);

    useEffect(() => {
        updateConfessions();
    }, [])    

    const updateConfessions = () => {
        fetch_hot();
        fetch_new();
        fetch_top();
    }

    const fetch_hot = async () => {
        initialise_storage();
        const fetch_confessions = async () => {
            const confessions = await get_hot_confessions()
            await set_votes(confessions);
            setHotConfessions(confessions);
        }
        fetch_confessions();
    }

    const fetch_new = async () => {
        initialise_storage();
        const fetch_confessions = async () => {
            const confessions = await get_new_confessions()
            await set_votes(confessions);
            setNewConfessions(confessions);
            
        }
        fetch_confessions();
    }

    const fetch_top = async () => {
        initialise_storage();
        const fetch_confessions = async () => {
            const confessions = await get_top_confessions()
            await set_votes(confessions);
            setTopConfessions(confessions);
            
        }
        fetch_confessions();
    }

    const handle_hot_click = () => {
        fetch_hot();
    }

    const handle_new_click = () => {
        fetch_new();
    }

    const handle_top_click = () => {
        fetch_top();
    }

    const set_votes = async (confessions) => {
        for (const confession of confessions) {
            const confession_id = confession.id;

            let upvoted;
            let downvoted;
            if (check_if_storage_exists()) {   
                upvoted = check_confession_upvote(confession_id);
                downvoted = check_confession_downvote(confession_id);
            } else {
                upvoted = await is_upvoted(confession_id)
                downvoted = await is_downvoted(confession_id)
            }
            if (upvoted) {
                add_confession_upvote(confession_id);
            } else if (downvoted) {
                add_confession_downvote(confession_id);
            }
        }
    }

    return (
        <Flex id='confessions' mt={{base: '20px', md:'60px'}} alignItems='center' flexDirection='column'>
            <Tabs defaultIndex={1} maxW='650px' w='95vw' _focus={{bg:'none'}} _active={{bg:'none'}}>
                <Flex className="sticky" pt='15px' bg='#F5F8FA' flexDirection='column'>
                    <TabList justifyContent='space-between'  >
                        <TabTitle load_confessions={handle_hot_click} title='Hot' icon={<IoMdFlame />} iconSize={{base:17, md:18}}/>
                        <TabTitle load_confessions={handle_new_click} title='New' icon={<HiOutlineSparkles />} iconSize={{base:17, md:18}}/>
                        <TabTitle load_confessions={handle_top_click} title='Top' icon={<BsFillBarChartFill />} iconSize={{base:15, md:16}}/>
                    </TabList>
                </Flex>
                
                <TabPanels >
                    <TabPanel>
                        <ConfessionList confessions={hotConfessions} updateConfessions={updateConfessions}/>
                    </TabPanel>
                    <TabPanel>
                        <ConfessionList confessions={newConfessions} updateConfessions={updateConfessions} />
                    </TabPanel>
                    <TabPanel>
                        <ConfessionList confessions={topConfessions} updateConfessions={updateConfessions}/>
                    </TabPanel>
                </TabPanels>
            </Tabs>
            
        </Flex>
    )
}

const TabTitle = ({icon, title, load_confessions, iconSize}) => {
    return (
        <Tab className="noSelect" bg='#F5F8FA'  _active={{bg:'none', border:'none'}} onClick={load_confessions} color='gray.300' borderColor='gray.300' _selected={{color:'gray.600', borderColor:'gray.600', pb:'none'}} w='100%' pb={{base:'12px', md:'20px'}}>
            <Flex alignItems='center' className="rubik-bold" gap={1.5}>
                <Box fontSize={iconSize}>
                    {icon}
                </Box>
                <Text fontSize={{base:'16px', md:'17px'}}>{title}</Text>
            </Flex>
        </Tab>
    )
}

export default ConfessTabs;