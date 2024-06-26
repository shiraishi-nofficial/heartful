/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createLiveProfile = /* GraphQL */ `
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
export const updateLiveProfile = /* GraphQL */ `
  mutation UpdateLiveProfile(
    $input: UpdateLiveProfileInput!
    $condition: ModelLiveProfileConditionInput
  ) {
    updateLiveProfile(input: $input, condition: $condition) {
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
export const deleteLiveProfile = /* GraphQL */ `
  mutation DeleteLiveProfile(
    $input: DeleteLiveProfileInput!
    $condition: ModelLiveProfileConditionInput
  ) {
    deleteLiveProfile(input: $input, condition: $condition) {
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
export const createChatLog = /* GraphQL */ `
  mutation CreateChatLog(
    $input: CreateChatLogInput!
    $condition: ModelChatLogConditionInput
  ) {
    createChatLog(input: $input, condition: $condition) {
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
export const updateChatLog = /* GraphQL */ `
  mutation UpdateChatLog(
    $input: UpdateChatLogInput!
    $condition: ModelChatLogConditionInput
  ) {
    updateChatLog(input: $input, condition: $condition) {
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
export const deleteChatLog = /* GraphQL */ `
  mutation DeleteChatLog(
    $input: DeleteChatLogInput!
    $condition: ModelChatLogConditionInput
  ) {
    deleteChatLog(input: $input, condition: $condition) {
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
export const createLiveSessionDuration = /* GraphQL */ `
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
export const updateLiveSessionDuration = /* GraphQL */ `
  mutation UpdateLiveSessionDuration(
    $input: UpdateLiveSessionDurationInput!
    $condition: ModelLiveSessionDurationConditionInput
  ) {
    updateLiveSessionDuration(input: $input, condition: $condition) {
      liveId
      duration
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteLiveSessionDuration = /* GraphQL */ `
  mutation DeleteLiveSessionDuration(
    $input: DeleteLiveSessionDurationInput!
    $condition: ModelLiveSessionDurationConditionInput
  ) {
    deleteLiveSessionDuration(input: $input, condition: $condition) {
      liveId
      duration
      createdAt
      updatedAt
      __typename
    }
  }
`;
