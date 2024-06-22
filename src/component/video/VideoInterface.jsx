import { AspectRatio, Avatar, Box, HStack, VStack } from "@chakra-ui/react";
import { AgoraVideoPlayer } from "agora-rtc-react";

const VideoInterface = ({localVideoTrack, remoteUserList, videoMode}) => {
    
    return(
        <VStack w={'full'}>
            <VStack direction="column" h="100vh" w={'full'} maxW={'1000px'}>
                <VStack w={'full'} h={'full'} maxW={'sm'}>
                    <VideoLayout videoMode={videoMode} myVideoTrack={localVideoTrack} theirVideoTrack={remoteUserList[0]?.videoTrack} />
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
                <VStack h={'full'} w={'full'} justify={'center'}>
                    <AspectRatio ratio={9/16} w={'full'}>
                        <VideoScreen videoTrack={videoMode%10===1?myVideoTrack:theirVideoTrack} />
                    </AspectRatio>
                </VStack>
            );
        case 2:
            return(
                <HStack w={'full'} h={'full'}>
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
                <VStack h={'full'} w={'full'} justify={'center'}>
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
                <VStack h={'full'} w={'full'} justify={'center'}>
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