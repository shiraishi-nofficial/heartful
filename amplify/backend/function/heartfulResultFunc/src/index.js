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
const AWS_REGION = process.env.AWS_REGION || 'us-east-1';
const { Sha256 } = crypto;

const query = /* GraphQL */ `
  query LiveProfilesByType(
    $type: String!
    $starttime: ModelIntKeyConditionInput
    $sortDirection: ModelSortDirection  = DESC
    $filter: ModelLiveProfileFilterInput
    $limit: Int = 10000
    $nextToken: String
  ) {
    liveProfilesByType(
      type: $type
      starttime: $starttime
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
        sessionDuration {
          duration
        }
        screenShareDuration {
          duration
        }
        __typename
      }
      nextToken
      __typename
    }
  }
`;

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */

 export const handler = async (event) => {
  const variables = {
    type: 'live'
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

  let statusCode = 200;
  let body;
  let response;

  try {
    response = await fetch(request);
    let tmpBody = await response.json();
    tmpBody = tmpBody['data']['liveProfilesByType']['items']
    tmpBody = tmpBody.map(item=>{
      const sessionDuration = item?.sessionDuration?item.sessionDuration.duration:0;
      const screenShareDuration = item?.screenShareDuration?item.screenShareDuration.duration:0;
      return {...item, sessionDuration, screenShareDuration}
    })
    body = tmpBody;
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
    body: JSON.stringify(body)
  };
};