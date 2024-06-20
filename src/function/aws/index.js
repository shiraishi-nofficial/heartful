import { generateClient } from "aws-amplify/api";
import { createLiveProfile } from "../../graphql/mutations";
import imageCompression from 'browser-image-compression';
import { uploadData } from 'aws-amplify/storage';

const client = generateClient();

export const registerLiveProfile = async(data) => {
    const res = await client.graphql({query: createLiveProfile, variables: {input: data}, authMode: 'iam'});
    return res.data.createLiveProfile;
};

export const uploadImageToS3 = async({filename, file, maxSizeMB=0.2, maxWidthOrHeight=1024}) => {
    const options = {
        maxSizeMB,
        maxWidthOrHeight,
        useWebWorker: true
    };

    try{
        const compressedFile = await imageCompression(file, options);
        uploadData({path: 'public/'+filename, data: compressedFile, options: {accessLevel: 'public', contentType: 'image'}});
    }catch (error) {
        console.log("Error uploading file: ", error);
    }
};