import { Box, Button, Heading, Progress, VStack, useBoolean } from "@chakra-ui/react";
import IconSetting from "./performer/IconSetting";
import useAgoraChannel from "../hook/agora/useAgoraChannel";
import useAgoraAudioPublisher from "../hook/agora/useAgoraAudioPublisher";
import ChatInterface from "./chat/ChatInterface";
import FuncBox from "./FuncBox";
import ScreenShareBox from "./ScreenShareBox";
import WatchScreenShareBox from "./WatchScreenShareBox";
import * as Images from '../image/index';
import StartBtn from "./StartBtn";
import reload from "../function/reload";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const AudioIndex = ({liveProfile, uid, chatHook, setHasScreenShare, isPerformer, setHasStarted, isTheyOnline}) => {
    const {client, hasJoined, remoteUserList, screenVideoTrack, isPoorNetworkQuality} = useAgoraChannel({uid: uid, cname: liveProfile?.id});
    const {hasPublished, localAudioTrack, volume, publishAgora, toggleAudioOff} = useAgoraAudioPublisher({client});
    const [isScreenShareShowed, setIsScreenShareShowed] = useBoolean(false);
    const useScreenShareState = useBoolean(false);
    const gradientPercentage = Math.min(Math.max(volume, 0), 100);

    const navitate = useNavigate();

    const handleStart = async() => {
        await publishAgora();
        setHasStarted(true);
    };

    const performerFuncBoxList = [
        {name: '画面共有', icon: Images.ScreenShareImg, isOpen: isScreenShareShowed, onClick: ()=>{setIsScreenShareShowed.toggle()}},
    ];

    const funcBoxList = [
        {name: 'マイク', icon: !localAudioTrack?.enabled?Images.MicImgToumei:Images.MicImg, isOpen: !localAudioTrack?.enabled, onClick: toggleAudioOff, coverBg: `linear-gradient(to right, green ${gradientPercentage}%, transparent ${gradientPercentage}%)`},
        ...(isPerformer
            ?performerFuncBoxList
            :[]),
        {name: '保留', icon: Images.Horyu, onClick: reload},
        {name: '退出', icon: Images.Leave, onClick: ()=>navitate('/ended')},
    ].filter(Boolean);

    useEffect(()=>{
        if(setHasScreenShare){
            if(screenVideoTrack){
                setHasScreenShare(true);
            }else{
                setHasScreenShare(false);
            }
        }
    }, [screenVideoTrack]);

    return hasPublished
        ?<VStack w={'full'} h={'70vh'}>
            {isScreenShareShowed&&<ScreenShareBox useScreenShareState={useScreenShareState} screenVideoTrack={screenVideoTrack} liveId={liveProfile.id} onClose={setIsScreenShareShowed.off} />}
            {screenVideoTrack&&<WatchScreenShareBox screenVideoTrack={screenVideoTrack} />}
            <Box w={'full'} pr={{base: 0, md: 28}} h={'full'} mt={10}>
                <ChatInterface chatHook={chatHook} isPerformer={isPerformer} performerIconUrl={liveProfile.iconUrl} isTheyOnline={isTheyOnline} />
                {localAudioTrack&&<Progress colorScheme='green' size='sm' value={volume} w={'full'} />}
            </Box>
            <VStack p={5} color={'white'} justify={'end'} pos={'fixed'} top={'0'} right={'0'} >
                {funcBoxList.map((item, i)=><FuncBox key={i} {...item} />)}
            </VStack>
        </VStack>
        :<VStack spacing={10} w={'80%'} pt={40}>
            {/* <Avatar boxSize={'xl'} src={'https://uranai.heartf.com/images3/0524.jpg'} /> */}
            {/* <IconSetting username={liveProfile.performerUsername} defaultIconUrl={liveProfile?.iconUrl} handleIconChange={handleIconChange} /> */}
            {localAudioTrack&&<Progress colorScheme='green' size='sm' value={volume} w={'full'} maxW={'sm'} />}
            {hasJoined&&localAudioTrack&&<StartBtn onClick={handleStart} />}
        </VStack>
};

export default AudioIndex;


