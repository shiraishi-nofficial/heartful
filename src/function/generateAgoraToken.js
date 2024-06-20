import { put } from 'aws-amplify/api';

const generateAgoraToken = async(variables) => {
    // const res = await API.graphql({query: getAgoraToken, variables, authMode: 'AWS_IAM'});
    const restOperation = put({apiName: 'heartfulAgoraApi', path: '/', options: {body: variables}});
    const response = await restOperation.response;
    const body = await response.body.json();
    return body.token;
};

export default generateAgoraToken;