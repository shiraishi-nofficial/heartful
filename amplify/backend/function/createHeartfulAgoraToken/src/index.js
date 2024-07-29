/*
Use the following code to retrieve configured secrets from SSM:

const aws = require('aws-sdk');

const { Parameters } = await (new aws.SSM())
  .getParameters({
    Names: ["secretName"].map(secretName => process.env[secretName]),
    WithDecryption: true,
  })
  .promise();

Parameters will be of the form { Name: 'secretName', Value: 'secretValue', ... }[]
*/


/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */

const aws = require('aws-sdk');
const RtcTokenBuilder = require('agora-access-token').RtcTokenBuilder;
const RtcRole = require('agora-access-token').RtcRole;
const RtmTokenBuilder = require('agora-access-token').RtmTokenBuilder;
const RtmRole = require('agora-access-token').RtmRole;

exports.handler = async (event) => {
    const {uid=0, username='', cname='', role='', type=''} = JSON.parse(event.body);
    const appID  = '7d2396c438a444de9251f50f026eef6b';
    const { Parameters } = await (new aws.SSM())
      .getParameters({
        Names: ["secretName"].map(secretName => process.env[secretName]),
        WithDecryption: true,
      })
      .promise();
    const primaryCertificate = Parameters[0].Value

    const expirationTimeInSeconds = 60 * 240;
    const currentTimestamp = Math.floor(Date.now() / 1000);
    const privilegeExpiredTs = currentTimestamp + expirationTimeInSeconds;

    let token = '';
    if(type==='rtc'){
      const roleInRtc = role==='publisher'?RtcRole.PUBLISHER:RtcRole.SUBSCRIBER;
      token = RtcTokenBuilder.buildTokenWithUid(appID, primaryCertificate, cname, uid, roleInRtc, privilegeExpiredTs);
    }else if(type==='rtm'){
      const roleInRtm = RtmRole.Rtm_User
      token = RtmTokenBuilder.buildToken(appID, primaryCertificate, username, roleInRtm, privilegeExpiredTs);
    }
    const resBody = JSON.stringify({ token });
    return {
      statusCode: 200,
  //  Uncomment below to enable CORS requests
      headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "*",
      },
      body: resBody
  };
};