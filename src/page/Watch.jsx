import { Heading, Image, VStack } from "@chakra-ui/react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import useLiveProfile from "../hook/aws/useLiveProfile";
import ChatIndex from '../component/ChatIndex'
import { useEffect, useState } from "react";
import useChatLogList from "../hook/aws/useChatLogList";
import VideoIndex from "../component/VideoIndex";
import AudioIndex from "../component/AudioIndex";
import useAgoraRtm from "../hook/agora/useAgoraRtm";
import useLiveSessionDuration from "../hook/aws/useLiveSessionDuration";
import CountDownTimer from "../component/CountDownTimer";
import reload from "../function/reload";
import hasOneWeekPassed from "../function/hasOneWeekPassed";
import * as Images from '../image/index';
import LiveKindName from "../function/LiveKindName";

const UID = 22222;
const IS_PERFORMER = false;

const Watch = () => {
    const [hasStarted, setHasStarted] = useState(false);
    const { liveId } = useParams();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const pwd = searchParams.get('pwd');
    const {liveProfile, isReady, passCodeError} = useLiveProfile({liveId, passCode: pwd, isPerformer: IS_PERFORMER});
    const {isReady: isChatLogListReady, newMsgList, ...chatHook} = useChatLogList({liveId, isSub: true, role: IS_PERFORMER?'performer':'audience'});
    const {isTheyOnline} = useAgoraRtm({liveId: liveProfile?.id, role: IS_PERFORMER?'performer':'audience', isActive: hasStarted});
    const {leftSeconds} = useLiveSessionDuration({liveId, liveDuration: liveProfile?.duration, isTheyOnline, isActive: IS_PERFORMER});

    const navigate = useNavigate();

    useEffect(()=>{
        if(liveProfile?.starttime){
            if(hasOneWeekPassed(liveProfile?.starttime)){
                return;
            }
            const currentUnixTime = Math.floor(Date.now() / 1000);
            const buffer = 18000;
            if(liveProfile?.starttime+liveProfile?.duration+buffer<currentUnixTime){
                window.location.href = 'https://uranai.heartf.com/Public/Videochat/error';
            }
        }
    }, [liveProfile?.starttime]);

    useEffect(()=>{
        // 画面を離れたら更新
        return ()=>reload(1000);
    }, []);
    
    return (isReady&&isChatLogListReady)
        ?!passCodeError
            ?(<VStack bgImage={`url(${Images.Bg})`} bgSize="cover" bgPosition="center" width="100%" height="100vh" spacing={0}>
                <CountDownTimer leftSeconds={leftSeconds} isPerformer={IS_PERFORMER} />
                {liveProfile?.kind!=='video'&&<VStack w={'full'} bgColor={'purple'}>
                    <Heading size={'md'} color={'white'} py={2}>{LiveKindName(liveProfile?.kind)}</Heading>
                </VStack>}
                <Image src={Images.Obi} mb={5} w={'full'} />
                {liveProfile.kind==='chat'
                    ?<ChatIndex liveProfile={liveProfile} uid={UID} chatHook={chatHook} isPerformer={IS_PERFORMER} hasStarted={hasStarted} setHasStarted={setHasStarted} isTheyOnline={isTheyOnline} />
                    :liveProfile.kind==='audio'
                        ?<AudioIndex liveProfile={liveProfile} uid={UID} chatHook={chatHook} isPerformer={IS_PERFORMER} hasStarted={hasStarted} setHasStarted={setHasStarted} isTheyOnline={isTheyOnline} />
                        :liveProfile.kind==='video'
                            ?<VideoIndex liveProfile={liveProfile} newMsgList={newMsgList} uid={UID} chatHook={chatHook} isPerformer={IS_PERFORMER} hasStarted={hasStarted} setHasStarted={setHasStarted} isTheyOnline={isTheyOnline} />
                            :<Heading>何にもなし</Heading>}
            </VStack>)
            :<Heading>パスコードエラー</Heading>
        :<Heading>読み込み中</Heading>
};



export default Watch;