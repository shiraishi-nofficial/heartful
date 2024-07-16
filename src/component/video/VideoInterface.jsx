import { AspectRatio, Avatar, Box, Heading, HStack, Text, VStack } from "@chakra-ui/react";
import { AgoraVideoPlayer } from "agora-rtc-react";

const VideoInterface = ({localVideoTrack, remoteUserList, videoMode, newMsg}) => {
    
    return(
        <VStack w={'full'}>
            <VStack direction="column" w={'full'} maxW={'1000px'}>
                <VStack w={'full'} maxW={'xl'} pos={'relative'}>
                    <VideoLayout videoMode={videoMode} myVideoTrack={localVideoTrack} theirVideoTrack={remoteUserList[0]?.videoTrack} />
                    {newMsg&&<Box pos={'absolute'} bottom={0} bgColor={'skyblue'} zIndex={'99999999999'} w={'xs'} px={3} py={2}>  
                        <Heading size={'sm'}>新着メッセージ</Heading>
                        <Text noOfLines={1}>{newMsg.kind==='img'?'新しい画像':newMsg.content}</Text>
                    </Box>}
                </VStack>
            </VStack>
        </VStack>
    );
};

export default VideoInterface;

const VideoLayout = ({videoMode, myVideoTrack, theirVideoTrack}) => {
    switch(getFirstDigit(videoMode)){
        case 1:
            return(
                <VStack h={'full'} w={'80%'} justify={'center'} maxW={'xs'} spacing={0}>
                    <AspectRatio ratio={9/16} w={'full'}>
                        <VideoScreen videoTrack={videoMode%10===1?myVideoTrack:theirVideoTrack} />
                    </AspectRatio>
                </VStack>
            );
        case 2:
            return(
                <HStack w={'full'} h={'full'} spacing={0}>
                    <AspectRatio ratio={9/16} w={'50%'}>
                        <VideoScreen videoTrack={videoMode%10===1?myVideoTrack:theirVideoTrack} />
                    </AspectRatio>
                    <AspectRatio ratio={9/16} w={'50%'}>
                        <VideoScreen videoTrack={videoMode%10===1?theirVideoTrack:myVideoTrack} />
                    </AspectRatio>
                </HStack>
            );
        case 3:
            return(
                <VStack h={'full'} w={'80%'} justify={'center'} maxW={'xs'} spacing={0}>
                    <AspectRatio ratio={9/16} w={'full'} pos={'relative'}>
                        <Box>
                            <AspectRatio ratio={9/16} w={'full'}>
                                <VideoScreen videoTrack={videoMode%10===1?myVideoTrack:theirVideoTrack} />
                            </AspectRatio>
                            <AspectRatio pos={'absolute'} bottom={0} right={0} ratio={9/16} w={'100px'}>
                                <VideoScreen videoTrack={videoMode%10===1?theirVideoTrack:myVideoTrack} />
                            </AspectRatio>
                        </Box>
                    </AspectRatio>
                </VStack>
            );
        case 4:
            return(
                <VStack h={'full'} w={'80%'} justify={'center'} maxW={'xs'} spacing={0}>
                    <AspectRatio ratio={9/16} w={'50%'}>
                        <VideoScreen videoTrack={videoMode%10===1?myVideoTrack:theirVideoTrack} />
                    </AspectRatio>
                    <AspectRatio ratio={9/16} w={'50%'}>
                        <VideoScreen videoTrack={videoMode%10===1?theirVideoTrack:myVideoTrack} />
                    </AspectRatio>
                </VStack>
            );
        default:
            return <></>;
    }
};

const VideoScreen = ({videoTrack}) => {
    return videoTrack
        ?<AgoraVideoPlayer videoTrack={videoTrack} style={{height: '100%', width: '100%'}} />
        :<Box><Avatar /></Box>
}

function getFirstDigit(num) {
    // 数字が0になるまで10で割り続ける
    while (num >= 10) {
        num = Math.floor(num / 10);
    }
    return num;
}