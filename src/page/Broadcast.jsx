import { Heading, useToast } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import useLiveProfile from "../hook/aws/useLiveProfile";
import ChatIndex from '../component/ChatIndex'
import { useState } from "react";
import useChatLogList from "../hook/aws/useChatLogList";
import VideoIndex from "../component/VideoIndex";
import AudioIndex from "../component/AudioIndex";

const URANAI_MODE = 'video';
const UID = 11111;
const IS_PERFORMER = true;

const Broadcast = () => {
    const [hasStarted, setHasStarted] = useState(false);
    const { liveId, passCode } = useParams();
    const {liveProfile, isReady, passCodeError, updateIcon} = useLiveProfile({liveId, passCode: Number(passCode)})
    const {isReady: isChatLogListReady, ...chatHook} = useChatLogList({liveId, isSub: true});
    const toast = useToast();

    const handleIconChange = async({iconName, iconImage}) => {
        try{
            await updateIcon({iconName, iconImage});
            toast({ title: 'アイコン設定完了', description: "正常に更新されました", status: 'success', duration: 9000, isClosable: true});
        }catch(e){
            toast({ title: 'アイコン設定失敗', description: "正常に更新されませんでした", status: 'error', duration: 9000, isClosable: true});
        }
    };
    
    return (isReady&&isChatLogListReady)
        ?!passCodeError
            ?URANAI_MODE==='chat'
                ?<ChatIndex liveProfile={liveProfile} uid={UID} chatHook={chatHook} isPerformer={IS_PERFORMER} handleIconChange={handleIconChange} hasStarted={hasStarted} setHasStarted={setHasStarted} />
                :URANAI_MODE==='audio'
                    ?<AudioIndex liveProfile={liveProfile} uid={UID} chatHook={chatHook} isPerformer={IS_PERFORMER} handleIconChange={handleIconChange} hasStarted={hasStarted} setHasStarted={setHasStarted} />
                    :URANAI_MODE==='video'
                        ?<VideoIndex liveProfile={liveProfile} uid={UID} chatHook={chatHook} isPerformer={IS_PERFORMER} handleIconChange={handleIconChange} hasStarted={hasStarted} setHasStarted={setHasStarted} />
                        :<Heading>何にもなし</Heading>
            :<Heading>パスコード間違え</Heading>
        :<Heading>読み込み中</Heading>
};



export default Broadcast;