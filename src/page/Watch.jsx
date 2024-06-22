import { Heading } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import useLiveProfile from "../hook/aws/useLiveProfile";
import ChatIndex from '../component/ChatIndex'
import { useState } from "react";
import useChatLogList from "../hook/aws/useChatLogList";
import VideoIndex from "../component/VideoIndex";
import AudioIndex from "../component/AudioIndex";

const URANAI_MODE = 'video';
const UID = 22222;
const IS_PERFORMER = false;

const Watch = () => {
    const [hasStarted, setHasStarted] = useState(false);
    const { liveId, passCode } = useParams();
    const {liveProfile, isReady, passCodeError} = useLiveProfile({liveId, passCode: Number(passCode)})
    const {isReady: isChatLogListReady, ...chatHook} = useChatLogList({liveId, isSub: true});
    
    return (isReady&&isChatLogListReady)
        ?!passCodeError
            ?URANAI_MODE==='chat'
                ?<ChatIndex liveProfile={liveProfile} uid={UID} chatHook={chatHook} isPerformer={IS_PERFORMER} hasStarted={hasStarted} setHasStarted={setHasStarted} />
                :URANAI_MODE==='audio'
                    ?<AudioIndex liveProfile={liveProfile} uid={UID} chatHook={chatHook} isPerformer={IS_PERFORMER} hasStarted={hasStarted} setHasStarted={setHasStarted} />
                    :URANAI_MODE==='video'
                        ?<VideoIndex liveProfile={liveProfile} uid={UID} chatHook={chatHook} isPerformer={IS_PERFORMER} hasStarted={hasStarted} setHasStarted={setHasStarted} />
                        :<Heading>何にもなし</Heading>
            :<Heading>パスコード間違え</Heading>
        :<Heading>読み込み中</Heading>
};



export default Watch;