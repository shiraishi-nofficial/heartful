import { useEffect, useState } from "react";
import { generateClient } from 'aws-amplify/api';
import { getLiveProfile } from "../../graphql/queries";
import { verifyPwd } from "../../function/pwd";

const useLiveProfile = ({liveId, passCode, isPerformer}) => {
    const [liveProfile, setLiveProfile] = useState();
    const [isReady, setIsReady] = useState();
    const [passCodeError, setPassCodeError] = useState(false);
    const client = generateClient();

    const fetchLiveProfile = async() => {
        const res = await client.graphql({query: getLiveProfile, variables: {id: liveId}, authMode: 'iam'})
        let tmpLiveProfile = res.data.getLiveProfile;
        const iconUrl = `https://uranai.heartf.com/images3/${tmpLiveProfile?.performerUsername}.jpg`
        setLiveProfile({...tmpLiveProfile, iconUrl});
        const inputPassCode = tmpLiveProfile[isPerformer?'performerPassCode':'audiencePassCode'];
        const isVerified = await verifyPwd(inputPassCode, passCode);
        setPassCodeError(!isVerified);
        setIsReady(true);
    };

    useEffect(()=>{
        if(liveId&&passCode){
            fetchLiveProfile();
        }
    }, [liveId, passCode]);

    return {liveProfile, isReady, passCodeError};
};

export default useLiveProfile;