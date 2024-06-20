/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getLiveProfile = /* GraphQL */ `
  query GetLiveProfile($id: ID!) {
    getLiveProfile(id: $id) {
      id
      performerUsername
      performerUserProfile {
        username
        icon
        createdAt
        updatedAt
        __typename
      }
      starttime
      duration
      type
      passCode
      isUnpublished
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listLiveProfiles = /* GraphQL */ `
  query ListLiveProfiles(
    $filter: ModelLiveProfileFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listLiveProfiles(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        performerUsername
        starttime
        duration
        type
        passCode
        isUnpublished
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getUserProfile = /* GraphQL */ `
  query GetUserProfile($username: String!) {
    getUserProfile(username: $username) {
      username
      icon
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listUserProfiles = /* GraphQL */ `
  query ListUserProfiles(
    $username: String
    $filter: ModelUserProfileFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listUserProfiles(
      username: $username
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        username
        icon
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getChatLog = /* GraphQL */ `
  query GetChatLog($id: ID!) {
    getChatLog(id: $id) {
      id
      role
      liveId
      duration
      type
      kind
      content
      createdAt
      updatedAt
      username
      __typename
    }
  }
`;
export const listChatLogs = /* GraphQL */ `
  query ListChatLogs(
    $filter: ModelChatLogFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listChatLogs(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        role
        liveId
        duration
        type
        kind
        content
        createdAt
        updatedAt
        username
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const chatLogsByLive = /* GraphQL */ `
  query ChatLogsByLive(
    $liveId: ID!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelChatLogFilterInput
    $limit: Int
    $nextToken: String
  ) {
    chatLogsByLive(
      liveId: $liveId
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        role
        liveId
        duration
        type
        kind
        content
        createdAt
        updatedAt
        username
        __typename
      }
      nextToken
      __typename
    }
  }
`;
