import { createChannel, createClient } from 'agora-rtm-react'
import { useEffect, useState } from 'react';
import generateAgoraToken from '../../function/generateAgoraToken';

const useClient = createClient(import.meta.env.VITE_AGORA_WITH_TOKEN);

const useAgoraRtm = ({liveId, role}) => {
    const variables = { username: role, cname: liveId, role: "publisher", type: "rtm" };
    const [rtm, setRtm] = useState({});
    const [hasRequested, setHasRequested] = useState(false);
    const [hasJoined, setHasJoined] = useState(false);
    const [rtmUserIdList, setRtmUserIdList] = useState([]);

    const client = useClient();

    // ログイン関数
    const rtmLogin = async() => {
        setHasRequested(true);
        // ログイン処理
        const token = await generateAgoraToken(variables);
        await client.login({ uid: role, token });
        await rtm.channel.join();
        setHasJoined(true);

        // 現在の参加者一覧把握
        const tempRtmUserIdList = await rtm.channel.getMembers();
        setRtmUserIdList(tempRtmUserIdList);

        rtm.channel.on('ChannelMessage', (msg, uid) => {

        });

          // rtm.client.on('MessageFromPeer', async ({text}, peerId) => {
          // });

        rtm.channel.on('MemberJoined', async (memberId) => {
            // チャット参加者更新
            const tempRtmUserIdList = await rtm.channel.getMembers();
            setRtmUserIdList(tempRtmUserIdList);
        });

        rtm.channel.on('MemberLeft', async (memberId) => {
            // チャット参加者更新
            const tempRtmUserIdList = await rtm.channel.getMembers();
            setRtmUserIdList(tempRtmUserIdList);
        });

    };

    // channel準備
    useEffect(()=>{
      if(liveId&&role){
        setRtm(prev=>({...prev, client}))
        const channel = createChannel(liveId)(client);
        setRtm({client, channel})
      }
    }, [client, liveId, role]);

    // ログイン
    useEffect(()=>{
      if(rtm?.channel&&role&&!hasRequested){
        rtmLogin();
      }
    }, [rtm?.channel, role]);

    return {rtmUserIdList, isTheyOnline: rtmUserIdList.length>1};
}

export default useAgoraRtm;