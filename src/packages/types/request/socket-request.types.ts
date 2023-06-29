/**
 * Namespace
 */
export enum SocketNamespace {
    MAIN = 'main',
    COMMON_STORIES = 'common-stories',
    USER_STORIES = 'user-stories',
}

/**
 * Socket events
 */
export enum SocketEvent {
    /**
     * Front to back
     */
    // User Story
    RESUME_USER_STORY = 'resume-user-story',
    SELECT_USER_STORY_OPTIONS = 'select-user-story-options',
    SELECT_USER_STORY_TOPIC = 'select-user-story-topic',
    SELECT_USER_STORY_CHAPTER_CHOICE = 'select-user-story-chapter-choice',
    SAVE_FINISHED_USER_STORY = 'save-finished-user-story',
    DELETE_USER_STORY = 'delete-user-story',
    LEAVE_USER_STORY_ROOM = 'leave-user-story-room',
    
    // Common Story
    START_COMMON_STORY = 'start-common-story',
    GET_ALL_COMMON_STORIES_BEING_GENERATED_PREVIEWS = 'get-all-common-being-generated-stories-previews',
    GET_COMMON_STORY_BEING_GENERATED_DATA = 'get-common-story-being-generated-data',
    SELECT_COMMON_STORY_CHAPTER_CHOICE = 'select-common-story-chapter-choice',
    SEND_COMMON_STORY_CHAT_MESSAGE = 'send-common-story-chat-message',
    

    /**
     * Back to front
     */
    // User Story
    USER_STORY_TOPICS_DATA = 'user-story-topics-data',
    USER_STORY_TOPICS_IMAGES = 'user-story-topics-images',
    USER_STORY_CHAPTER_CHOICE_IS_SELECTED = 'user-story-chapter-choice-is-selected',
    USER_STORY_CHAPTER_DATA = 'user-story-chapter-data',
    USER_STORY_CHAPTER_IMAGE = 'user-story-chapter-image',
    USER_STORY_CHAPTER_IS_GENERATED = 'user-story-chapter-is-generated',
    USER_STORY_IS_DELETED = 'user-story-is-deleted',

    // Common Story
    FIRST_COMMON_STORY_CHAPTER = 'first-common-story-chapter',
    COMMON_STORY_CHAPTER_DATA = 'common-story-chapter-data',
    COMMON_STORY_CHAPTER_IMAGE = 'common-story-chapter-image',
    COMMON_STORY_CHAPTER_CHOICE_AND_ALL_NUMB_OF_VOTES = 'common-story-chapter-choice-and-all-numb-of-votes',
    COMMON_STORY_IS_STOPPED = 'common-story-is-stopped',
    COMMON_STORY_IS_FINISHED = 'common-story-is-finished',
    NEW_COMMON_STORY_CHAT_MESSAGE = 'new-common-story-chat-message'
}