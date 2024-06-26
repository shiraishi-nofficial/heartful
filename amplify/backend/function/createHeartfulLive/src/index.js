/* Amplify Params - DO NOT EDIT
	API_HEARTFULGQL_GRAPHQLAPIENDPOINTOUTPUT
	API_HEARTFULGQL_GRAPHQLAPIIDOUTPUT
	ENV
	REGION
Amplify Params - DO NOT EDIT */

import crypto from '@aws-crypto/sha256-js';
import { defaultProvider } from '@aws-sdk/credential-provider-node';
import { SignatureV4 } from '@aws-sdk/signature-v4';
import { HttpRequest } from '@aws-sdk/protocol-http';
import { default as fetch, Request } from 'node-fetch';
import { Buffer } from 'buffer';

const GRAPHQL_ENDPOINT = process.env.API_HEARTFULGQL_GRAPHQLAPIENDPOINTOUTPUT;
const AWS_REGION = process.env.REGION || 'us-east-1';
const { Sha256 } = crypto;

const query = /* GraphQL */ `
  mutation CreateLiveProfile(
    $input: CreateLiveProfileInput!
    $condition: ModelLiveProfileConditionInput
  ) {
    createLiveProfile(input: $input, condition: $condition) {
      id
      performerUsername
      starttime
      duration
      type
      performerPassCode
      audiencePassCode
      kind
      isUnpublished
      createdAt
      updatedAt
      __typename
    }
  }
`;

const liveSessionQuery = /* GraphQL */ `
mutation CreateLiveSessionDuration(
  $input: CreateLiveSessionDurationInput!
  $condition: ModelLiveSessionDurationConditionInput
) {
  createLiveSessionDuration(input: $input, condition: $condition) {
    liveId
    duration
    createdAt
    updatedAt
    __typename
  }
}
`;

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */

 export const handler = async (event) => {
  const eventBody = JSON.parse(event.body);
  const performerStrPwd = await generatePwd(eventBody.performerPassCode);
  const audienceStrPwd = await generatePwd(eventBody.audiencePassCode);

  const variables = {
    input: {
      id: eventBody.id,
      performerUsername: eventBody.performerUsername,
      starttime: eventBody.starttime,
      duration: eventBody.duration,
      type: 'live',
      performerPassCode: eventBody.performerPassCode,
      audiencePassCode: eventBody.audiencePassCode,
      kind: eventBody.kind,
      isUnpublished: false
    }
  };

  const liveSessionvariables = {
    input: {
      liveId: eventBody.id,
      duration: 0
    }
  };

  const endpoint = new URL(GRAPHQL_ENDPOINT);

  const signer = new SignatureV4({
    credentials: defaultProvider(),
    region: AWS_REGION,
    service: 'appsync',
    sha256: Sha256
  });

  const requestToBeSigned = new HttpRequest({
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      host: endpoint.host
    },
    hostname: endpoint.host,
    body: JSON.stringify({ query, variables }),
    path: endpoint.pathname
  });

  const signed = await signer.sign(requestToBeSigned);
  const request = new Request(endpoint, signed);

  const liveSessionRequestToBeSigned = new HttpRequest({
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      host: endpoint.host
    },
    hostname: endpoint.host,
    body: JSON.stringify({ query: liveSessionQuery, variables: liveSessionvariables }),
    path: endpoint.pathname
  });

  const liveSessionSigned = await signer.sign(liveSessionRequestToBeSigned);
  const liveSessionRequest = new Request(endpoint, liveSessionSigned);

  let statusCode = 200;
  let body;
  let response;

  try {
    response = await fetch(request);
    body = await response.json();
    await fetch(liveSessionRequest);
    if (body.errors) statusCode = 400;
  } catch (error) {
    statusCode = 500;
    body = {
      errors: [
        {
          message: error.message
        }
      ]
    };
  }

  return {
    statusCode,
    //  Uncomment below to enable CORS requests
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "*"
    }, 
    body: JSON.stringify({body, performerStrPwd, audienceStrPwd})
  };
};

async function generatePwd(passcode) {
  const encoder = new TextEncoder();
  const data = encoder.encode(passcode);

  const sha256 = new Sha256();
  sha256.update(data);
  const hash = await sha256.digest();

  // ハッシュをBase64エンコード
  const base64String = Buffer.from(hash).toString('base64');

  // URL-safe Base64エンコードに変換
  const urlSafeBase64 = base64String.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  return urlSafeBase64;
}