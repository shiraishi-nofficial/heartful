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
export const updateLiveProfile = /* GraphQL */ `
  mutation UpdateLiveProfile(
    $input: UpdateLiveProfileInput!
    $condition: ModelLiveProfileConditionInput
  ) {
    updateLiveProfile(input: $input, condition: $condition) {
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
export const deleteLiveProfile = /* GraphQL */ `
  mutation DeleteLiveProfile(
    $input: DeleteLiveProfileInput!
    $condition: ModelLiveProfileConditionInput
  ) {
    deleteLiveProfile(input: $input, condition: $condition) {
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
export const createUserProfile = /* GraphQL */ `
  mutation CreateUserProfile(
    $input: CreateUserProfileInput!
    $condition: ModelUserProfileConditionInput
  ) {
    createUserProfile(input: $input, condition: $condition) {
      username
      icon
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateUserProfile = /* GraphQL */ `
  mutation UpdateUserProfile(
    $input: UpdateUserProfileInput!
    $condition: ModelUserProfileConditionInput
  ) {
    updateUserProfile(input: $input, condition: $condition) {
      username
      icon
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteUserProfile = /* GraphQL */ `
  mutation DeleteUserProfile(
    $input: DeleteUserProfileInput!
    $condition: ModelUserProfileConditionInput
  ) {
    deleteUserProfile(input: $input, condition: $condition) {
      username
      icon
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
export const updateChatLog = /* GraphQL */ `
  mutation UpdateChatLog(
    $input: UpdateChatLogInput!
    $condition: ModelChatLogConditionInput
  ) {
    updateChatLog(input: $input, condition: $condition) {
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
export const deleteChatLog = /* GraphQL */ `
  mutation DeleteChatLog(
    $input: DeleteChatLogInput!
    $condition: ModelChatLogConditionInput
  ) {
    deleteChatLog(input: $input, condition: $condition) {
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
