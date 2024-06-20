export type AmplifyDependentResourcesAttributes = {
  "api": {
    "heartfulAgoraApi": {
      "ApiId": "string",
      "ApiName": "string",
      "RootUrl": "string"
    },
    "heartfulGql": {
      "GraphQLAPIEndpointOutput": "string",
      "GraphQLAPIIdOutput": "string"
    }
  },
  "auth": {
    "heartful989bdff7989bdff7": {
      "AppClientID": "string",
      "AppClientIDWeb": "string",
      "IdentityPoolId": "string",
      "IdentityPoolName": "string",
      "UserPoolArn": "string",
      "UserPoolId": "string",
      "UserPoolName": "string"
    }
  },
  "function": {
    "createHeartfulAgoraToken": {
      "Arn": "string",
      "LambdaExecutionRole": "string",
      "LambdaExecutionRoleArn": "string",
      "Name": "string",
      "Region": "string"
    },
    "createHeartfulLive": {
      "Arn": "string",
      "LambdaExecutionRole": "string",
      "LambdaExecutionRoleArn": "string",
      "Name": "string",
      "Region": "string"
    }
  },
  "storage": {
    "s3439abdb3": {
      "BucketName": "string",
      "Region": "string"
    }
  }
}