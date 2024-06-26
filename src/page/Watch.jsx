import { Heading, VStack } from "@chakra-ui/react";
import { useLocation, useParams } from "react-router-dom";
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

const URANAI_MODE = 'video';
const UID = 22222;
const IS_PERFORMER = false;

const Watch = () => {
    const [hasStarted, setHasStarted] = useState(false);
    const { liveId } = useParams();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const pwd = searchParams.get('pwd');
    const {liveProfile, isReady, passCodeError} = useLiveProfile({liveId, passCode: pwd, isPerformer: IS_PERFORMER});
    const {isReady: isChatLogListReady, ...chatHook} = useChatLogList({liveId, isSub: true});
    const {isTheyOnline} = useAgoraRtm({liveId: liveProfile?.id, role: IS_PERFORMER?'performer':'audience', isActive: hasStarted});
    const {leftSeconds} = useLiveSessionDuration({liveId, liveDuration: liveProfile?.duration, isTheyOnline, isActive: IS_PERFORMER});

    useEffect(()=>{
        // 画面を離れたら更新
        return ()=>reload(1000);
    }, []);
    
    return (isReady&&isChatLogListReady)
        ?!passCodeError
            ?(<VStack w={'full'}>
                <CountDownTimer leftSeconds={leftSeconds} />
                {liveProfile.kind==='chat'
                    ?<ChatIndex liveProfile={liveProfile} uid={UID} chatHook={chatHook} isPerformer={IS_PERFORMER} hasStarted={hasStarted} setHasStarted={setHasStarted} isTheyOnline={isTheyOnline} />
                    :liveProfile.kind==='audio'
                        ?<AudioIndex liveProfile={liveProfile} uid={UID} chatHook={chatHook} isPerformer={IS_PERFORMER} hasStarted={hasStarted} setHasStarted={setHasStarted} isTheyOnline={isTheyOnline} />
                        :liveProfile.kind==='video'
                            ?<VideoIndex liveProfile={liveProfile} uid={UID} chatHook={chatHook} isPerformer={IS_PERFORMER} hasStarted={hasStarted} setHasStarted={setHasStarted} isTheyOnline={isTheyOnline} />
                            :<Heading>何にもなし</Heading>}
            </VStack>)
            :<Heading>パスコードエラー</Heading>
        :<Heading>読み込み中</Heading>
};



export default Watch;