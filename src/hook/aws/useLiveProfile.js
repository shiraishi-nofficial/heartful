import { useEffect, useState } from "react";
import { generateClient } from 'aws-amplify/api';
import { getLiveProfile } from "../../graphql/queries";
import { uploadImageToS3 } from "../../function/aws";
import { createUserProfile, updateUserProfile } from "../../graphql/mutations";
import { getUrl } from "aws-amplify/storage";

const useLiveProfile = ({liveId, passCode}) => {
    const [liveProfile, setLiveProfile] = useState();
    const [isReady, setIsReady] = useState();
    const [passCodeError, setPassCodeError] = useState(false);
    const client = generateClient();

    const fetchLiveProfile = async() => {
        const res = await client.graphql({query: getLiveProfile, variables: {id: liveId}, authMode: 'iam'})
        let tmpLiveProfile = res.data.getLiveProfile;
        if(tmpLiveProfile?.performerUserProfile?.icon){
            const getUrlResult = await getUrl({
                path: 'public/'+ tmpLiveProfile?.performerUserProfile?.icon,
                options: {
                  validateObjectExistence: false,  // Check if object exists before creating a URL
                  expiresIn: 90000 // validity of the URL, in seconds. defaults to 900 (15 minutes) and maxes at 3600 (1 hour)
                },
              });
            tmpLiveProfile = {...tmpLiveProfile, iconUrl: getUrlResult.url.href}
        }
        setLiveProfile(tmpLiveProfile);
        setPassCodeError(tmpLiveProfile.passCode!==passCode);
        setIsReady(true);
    };

    const updateIcon = async({iconName, iconImage}) => {
        await uploadImageToS3({filename: iconName, file: iconImage});
        await client.graphql({query: liveProfile?.performerUserProfile?updateUserProfile:createUserProfile, variables: {input: {username: liveProfile.performerUsername, icon: iconName}}, authMode: 'iam'});
        fetchLiveProfile();
    };

    useEffect(()=>{
        if(liveId&&passCode){
            fetchLiveProfile();
        }
    }, [liveId, passCode]);

    return {liveProfile, isReady, passCodeError, updateIcon};
};

export default useLiveProfile;