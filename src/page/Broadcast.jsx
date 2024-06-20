import { Heading, useToast } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import VideoScreen from "../component/VideoScreen";
import useLiveProfile from "../hook/aws/useLiveProfile";
import ChatIndex from '../component/ChatIndex'
import { useState } from "react";

const URANAI_MODE = 'chat';

const Broadcast = () => {
    const [hasStarted, setHasStarted] = useState(false);
    const { liveId, passCode } = useParams();
    const {liveProfile, isReady, passCodeError, updateIcon} = useLiveProfile({liveId, passCode: Number(passCode)})
    const uid = 99987;
    const toast = useToast();

    const handleIconChange = async({iconName, iconImage}) => {
        try{
            await updateIcon({iconName, iconImage});
            toast({ title: 'アイコン設定完了', description: "正常に更新されました", status: 'success', duration: 9000, isClosable: true});
        }catch(e){
            toast({ title: 'アイコン設定失敗', description: "正常に更新されませんでした", status: 'error', duration: 9000, isClosable: true});
        }
    };
    
    return isReady
        ?!passCodeError
            ?URANAI_MODE==='chat'
                ?<ChatIndex liveProfile={liveProfile} handleIconChange={handleIconChange} hasStarted={hasStarted} setHasStarted={setHasStarted} />
                :URANAI_MODE==='audio'
                    ?<Heading>オーディオ</Heading>
                    :URANAI_MODE==='video'
                        ?<VideoScreen liveId={liveId} uid={uid} />
                        :<Heading>何にもなし</Heading>
            :<Heading>パスコード間違え</Heading>
        :<Heading>読み込み中</Heading>
};



export default Broadcast;