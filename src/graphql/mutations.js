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
export const createScreenShareDuration = /* GraphQL */ `
  mutation CreateScreenShareDuration(
    $input: CreateScreenShareDurationInput!
    $condition: ModelScreenShareDurationConditionInput
  ) {
    createScreenShareDuration(input: $input, condition: $condition) {
      liveId
      duration
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateScreenShareDuration = /* GraphQL */ `
  mutation UpdateScreenShareDuration(
    $input: UpdateScreenShareDurationInput!
    $condition: ModelScreenShareDurationConditionInput
  ) {
    updateScreenShareDuration(input: $input, condition: $condition) {
      liveId
      duration
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteScreenShareDuration = /* GraphQL */ `
  mutation DeleteScreenShareDuration(
    $input: DeleteScreenShareDurationInput!
    $condition: ModelScreenShareDurationConditionInput
  ) {
    deleteScreenShareDuration(input: $input, condition: $condition) {
      liveId
      duration
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const createChatTemplate = /* GraphQL */ `
  mutation CreateChatTemplate(
    $input: CreateChatTemplateInput!
    $condition: ModelChatTemplateConditionInput
  ) {
    createChatTemplate(input: $input, condition: $condition) {
      id
      content
      weight
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateChatTemplate = /* GraphQL */ `
  mutation UpdateChatTemplate(
    $input: UpdateChatTemplateInput!
    $condition: ModelChatTemplateConditionInput
  ) {
    updateChatTemplate(input: $input, condition: $condition) {
      id
      content
      weight
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteChatTemplate = /* GraphQL */ `
  mutation DeleteChatTemplate(
    $input: DeleteChatTemplateInput!
    $condition: ModelChatTemplateConditionInput
  ) {
    deleteChatTemplate(input: $input, condition: $condition) {
      id
      content
      weight
      createdAt
      updatedAt
      __typename
    }
  }
`;
