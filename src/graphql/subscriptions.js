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
export const onCreateChatLog = /* GraphQL */ `
  subscription OnCreateChatLog(
    $filter: ModelSubscriptionChatLogFilterInput
    $username: String
  ) {
    onCreateChatLog(filter: $filter, username: $username) {
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
export const onUpdateChatLog = /* GraphQL */ `
  subscription OnUpdateChatLog(
    $filter: ModelSubscriptionChatLogFilterInput
    $username: String
  ) {
    onUpdateChatLog(filter: $filter, username: $username) {
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
export const onDeleteChatLog = /* GraphQL */ `
  subscription OnDeleteChatLog(
    $filter: ModelSubscriptionChatLogFilterInput
    $username: String
  ) {
    onDeleteChatLog(filter: $filter, username: $username) {
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
export const onCreateLiveSessionDuration = /* GraphQL */ `
  subscription OnCreateLiveSessionDuration(
    $filter: ModelSubscriptionLiveSessionDurationFilterInput
  ) {
    onCreateLiveSessionDuration(filter: $filter) {
      liveId
      duration
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateLiveSessionDuration = /* GraphQL */ `
  subscription OnUpdateLiveSessionDuration(
    $filter: ModelSubscriptionLiveSessionDurationFilterInput
  ) {
    onUpdateLiveSessionDuration(filter: $filter) {
      liveId
      duration
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteLiveSessionDuration = /* GraphQL */ `
  subscription OnDeleteLiveSessionDuration(
    $filter: ModelSubscriptionLiveSessionDurationFilterInput
  ) {
    onDeleteLiveSessionDuration(filter: $filter) {
      liveId
      duration
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreateScreenShareDuration = /* GraphQL */ `
  subscription OnCreateScreenShareDuration(
    $filter: ModelSubscriptionScreenShareDurationFilterInput
  ) {
    onCreateScreenShareDuration(filter: $filter) {
      liveId
      duration
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateScreenShareDuration = /* GraphQL */ `
  subscription OnUpdateScreenShareDuration(
    $filter: ModelSubscriptionScreenShareDurationFilterInput
  ) {
    onUpdateScreenShareDuration(filter: $filter) {
      liveId
      duration
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteScreenShareDuration = /* GraphQL */ `
  subscription OnDeleteScreenShareDuration(
    $filter: ModelSubscriptionScreenShareDurationFilterInput
  ) {
    onDeleteScreenShareDuration(filter: $filter) {
      liveId
      duration
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreateChatTemplate = /* GraphQL */ `
  subscription OnCreateChatTemplate(
    $filter: ModelSubscriptionChatTemplateFilterInput
  ) {
    onCreateChatTemplate(filter: $filter) {
      id
      content
      weight
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateChatTemplate = /* GraphQL */ `
  subscription OnUpdateChatTemplate(
    $filter: ModelSubscriptionChatTemplateFilterInput
  ) {
    onUpdateChatTemplate(filter: $filter) {
      id
      content
      weight
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteChatTemplate = /* GraphQL */ `
  subscription OnDeleteChatTemplate(
    $filter: ModelSubscriptionChatTemplateFilterInput
  ) {
    onDeleteChatTemplate(filter: $filter) {
      id
      content
      weight
      createdAt
      updatedAt
      __typename
    }
  }
`;
