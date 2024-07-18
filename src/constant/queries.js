/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getLiveProfile = /* GraphQL */ `
  query GetLiveProfile($id: ID!) {
    getLiveProfile(id: $id) {
      id
      performerUsername
      starttime
      duration
      type
      performerPassCode
      audiencePassCode
      kind
      isUnpublished
      sessionDuration {
        liveId
        duration
        createdAt
        updatedAt
        __typename
      }
      screenShareDuration {
        liveId
        duration
        createdAt
        updatedAt
        __typename
      }
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
        performerPassCode
        audiencePassCode
        kind
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

export const liveProfilesByType = /* GraphQL */ `
  query LiveProfilesByType(
    $type: String!
    $starttime: ModelIntKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelLiveProfileFilterInput
    $limit: Int
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

export const getChatLog = /* GraphQL */ `
  query GetChatLog($id: ID!) {
    getChatLog(id: $id) {
      id
      role
      liveId
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
export const getLiveSessionDuration = /* GraphQL */ `
  query GetLiveSessionDuration($liveId: ID!) {
    getLiveSessionDuration(liveId: $liveId) {
      liveId
      duration
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listLiveSessionDurations = /* GraphQL */ `
  query ListLiveSessionDurations(
    $liveId: ID
    $filter: ModelLiveSessionDurationFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listLiveSessionDurations(
      liveId: $liveId
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        liveId
        duration
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getScreenShareDuration = /* GraphQL */ `
  query GetScreenShareDuration($liveId: ID!) {
    getScreenShareDuration(liveId: $liveId) {
      liveId
      duration
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listScreenShareDurations = /* GraphQL */ `
  query ListScreenShareDurations(
    $liveId: ID
    $filter: ModelScreenShareDurationFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listScreenShareDurations(
      liveId: $liveId
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        liveId
        duration
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
