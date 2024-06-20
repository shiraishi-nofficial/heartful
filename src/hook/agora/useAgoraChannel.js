import { useEffect, useState } from "react";
import generateAgoraToken from "../../function/generateAgoraToken";
import { createClient } from "agora-rtc-sdk-ng"; // 正しいパッケージをインポート

const useAgoraChannel = ({ uid, cname }) => {
    const SCREEN_SHARE_ID = 100;
    const [hasJoined, setHasJoined] = useState(false);
    const [isPoorNetworkQuality, setIsPoorNetworkQuality] = useState(false);
    const [remoteUserList, setRemoteUserList] = useState([]);
    const [screenVideoTrack, setScreenVideoTrack] = useState(null);
    const [client, setClient] = useState(null);

    const joinAgora = async () => {
        const variables = { uid, cname, role: "publisher", type: "rtc" };
        const token = await generateAgoraToken(variables);

        const agoraClient = createClient({ mode: "live", codec: "vp8" });
        setClient(agoraClient);
        const agoraApiKey = import.meta.env.VITE_AGORA_WITH_TOKEN;
        await agoraClient.join(agoraApiKey, cname, token, uid);

        agoraClient.on("user-published", async (user, mediaType) => {
            await agoraClient.subscribe(user, mediaType);
            if (user.uid !== SCREEN_SHARE_ID) {
                if (mediaType === "audio") {
                    user.audioTrack?.play();
                }
                if (mediaType === "video") {
                    setRemoteUserList((prev) => [...prev, user]);
                }
            } else {
                if (mediaType === "video") setScreenVideoTrack(user.videoTrack);
            }
        });

        agoraClient.on("user-unpublished", (user, type) => {
            if (user.uid !== SCREEN_SHARE_ID) {
                if (type === "audio") {
                    user.audioTrack?.stop();
                }

                if (type === "video") {
                    setRemoteUserList((prev) => prev.filter((item) => item?.uid !== user.uid));
                }
            } else {
                setScreenVideoTrack(null);
            }
        });

        agoraClient.on("user-left", (user, type) => {
            if (user.uid !== SCREEN_SHARE_ID) {
                if (type === "audio") {
                    user.audioTrack?.stop();
                }

                if (type === "video") {
                    setRemoteUserList((prev) => prev.filter((item) => item?.uid !== user.uid));
                }
            } else {
                setScreenVideoTrack(null);
            }
        });

        agoraClient.on("network-quality", (stats) => {
            setIsPoorNetworkQuality(
                stats.downlinkNetworkQuality === 0 ||
                    stats.downlinkNetworkQuality >= 4 ||
                    stats.uplinkNetworkQuality === 0 ||
                    stats.uplinkNetworkQuality >= 4
            );
        });

        setHasJoined(true);
    };

    useEffect(() => {
        if (uid && cname) {
            joinAgora();
        }
    }, [uid, cname]);

    return { client, hasJoined, remoteUserList, screenVideoTrack, isPoorNetworkQuality };
};

export default useAgoraChannel;
