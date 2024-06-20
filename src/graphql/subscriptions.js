/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateLiveProfile = /* GraphQL */ `
  subscription OnCreateLiveProfile(
    $filter: ModelSubscriptionLiveProfileFilterInput
    $performerUsername: String
  ) {
    onCreateLiveProfile(
      filter: $filter
      performerUsername: $performerUsername
    ) {
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
export const onUpdateLiveProfile = /* GraphQL */ `
  subscription OnUpdateLiveProfile(
    $filter: ModelSubscriptionLiveProfileFilterInput
    $performerUsername: String
  ) {
    onUpdateLiveProfile(
      filter: $filter
      performerUsername: $performerUsername
    ) {
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
export const onDeleteLiveProfile = /* GraphQL */ `
  subscription OnDeleteLiveProfile(
    $filter: ModelSubscriptionLiveProfileFilterInput
    $performerUsername: String
  ) {
    onDeleteLiveProfile(
      filter: $filter
      performerUsername: $performerUsername
    ) {
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
export const onCreateUserProfile = /* GraphQL */ `
  subscription OnCreateUserProfile(
    $filter: ModelSubscriptionUserProfileFilterInput
    $username: String
  ) {
    onCreateUserProfile(filter: $filter, username: $username) {
      username
      icon
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateUserProfile = /* GraphQL */ `
  subscription OnUpdateUserProfile(
    $filter: ModelSubscriptionUserProfileFilterInput
    $username: String
  ) {
    onUpdateUserProfile(filter: $filter, username: $username) {
      username
      icon
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteUserProfile = /* GraphQL */ `
  subscription OnDeleteUserProfile(
    $filter: ModelSubscriptionUserProfileFilterInput
    $username: String
  ) {
    onDeleteUserProfile(filter: $filter, username: $username) {
      username
      icon
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreateChatLog = /* GraphQL */ `
  subscription OnCreateChatLog(
    $filter: ModelSubscriptionChatLogFilterInput
    $username: String
  ) {
    onCreateChatLog(filter: $filter, username: $username) {
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
export const onUpdateChatLog = /* GraphQL */ `
  subscription OnUpdateChatLog(
    $filter: ModelSubscriptionChatLogFilterInput
    $username: String
  ) {
    onUpdateChatLog(filter: $filter, username: $username) {
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
export const onDeleteChatLog = /* GraphQL */ `
  subscription OnDeleteChatLog(
    $filter: ModelSubscriptionChatLogFilterInput
    $username: String
  ) {
    onDeleteChatLog(filter: $filter, username: $username) {
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
