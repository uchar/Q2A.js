import gql from 'graphql-tag';

const userType = `user {
      id
      profileImage
      publicName
      score
      language
      theme
    }`;
const QUESTION = `{
    id
    title
    content
    viewsCount
    votesCount
    answersCount
    ${userType}
    createdAt
    tag1
    tag2
    tag3
    tag4
    tag5
    active
  }`;

export const GET_ALL_QUESTIONS = gql`
  query($language:Language!,$tag: String,$limit: Int) {
    latestQuestions(language: $language,tag: $tag,limit: $limit,offset: 0) ${QUESTION}
    popularQuestions(language: $language,tag: $tag,limit: $limit,offset: 0)  ${QUESTION}
    mostViewsQuestions(language: $language,tag: $tag,limit: $limit,offset: 0)  ${QUESTION}
    noAnswersQuestions(language: $language,tag: $tag,limit: $limit,offset: 0)  ${QUESTION}
  }
`;

export const GET_LATEST_QUESTIONS = gql`
  query($language:Language!,$tag: String,$limit: Int,$offset: Int) {
    latestQuestions(language: $language,tag: $tag,limit: $limit,offset: $offset) ${QUESTION}
  }
`;

export const GET_POPULAR_QUESTIONS = gql`
  query($language:Language!,$tag: String,$limit: Int,$offset: Int) {
    popularQuestions(language: $language,tag: $tag,limit: $limit,offset: $offset)  ${QUESTION}
  }
`;

export const GET_MOST_VIEW_QUESTIONS = gql`
  query($language:Language!,$tag: String,$limit: Int,$offset: Int) {
    mostViewsQuestions(language: $language,tag: $tag,limit: $limit,offset: $offset)  ${QUESTION}
  }
`;

export const GET_NO_ANSWERS_QUESTIONS = gql`
  query($language:Language!,$tag: String,$limit: Int,$offset: Int) {
    noAnswersQuestions(language: $language,tag: $tag,limit: $limit,offset: $offset)  ${QUESTION}
  }
`;

export const GET_QUESTION = gql`
  query($language:Language!,$id: String!) {
    getQuestion(language: $language,id: $id) {
      id
      title
      content
      viewsCount
      votesCount
      answersCount
      createdAt
      ${userType}
      createdAt
      tag1
      tag2
      tag3
      tag4
      tag5
      active
      answers {
        id
        content
        ${userType}
        votesCount
        createdAt
        active
        comments {
          id
          content
          ${userType}
          createdAt
          active
        }
      }
      comments {
        id
        content
        ${userType}
        createdAt
        active
      }
    }
  }
`;

export const GET_BLOG_POST = gql`
  query($language:Language!,$id: String!) {
    getBlogPost(language: $language,id: $id) {
      id
      title
      content
      viewsCount
      votesCount
      commentsCount
      ${userType}
      tag1
      tag2
      tag3
      tag4
      tag5
      comments {
        id
        content
        ${userType}
        createdAt
        active
      }
      createdAt
      updatedAt
    }
  }
`;
export const ALL_TAGS = gql`
  query($language: Language!, $limit: Int, $offset: Int) {
    getTags(language: $language, limit: $limit, offset: $offset) {
      id
      title
      content
      used
    }
  }
`;

export const ALL_BLOG_POSTS = gql`
  query($language: Language!, $limit: Int!, $offset: Int!) {
    getBlogPosts(language: $language, limit: $limit, offset: $offset) {
      id
      title
      content
      ${userType}
      viewsCount
      votesCount
      commentsCount
      tag1
      tag2
      tag3
      tag4
      tag5
      createdAt
      updatedAt
    }
  }
`;

export const GET_TAG = gql`
  query($language: Language!, $tag: String!) {
    getTagDetail(language: $language, tag: $tag) {
      id
      title
      content
      used
    }
  }
`;

export const GET_NOTIFICATIONS = gql`
  query($language: Language!, $limit: Int!, $offset: Int!) {
    getNotifications(language: $language, limit: $limit, offset: $offset) {
      id
      reason
      title
      content
      type
      metaData
      read
      createdAt
    }
  }
`;

export const GET_MY_USER = gql`
  query {
    getUser {
      id
      publicName
      profileImage
      score
      theme
      role
    }
  }
`;

export const GET_STATISTICS = gql`
  query($language: Language!) {
    getStatistics(language: $language) {
      tagsCount
      allQuestionsCount
      usersCount
      blogPostsCount
    }
  }
`;

export const GET_USER = gql`
  query($language:Language,$id: String) {
    getUser(language:$language,id: $id) {
      id
      publicName
      score
      profileImage
      about
      theme
      answers {
        id
        content
        votesCount
        createdAt
        active
      }
      questions {
        id
        title
        content
        viewsCount
        votesCount
        answersCount
        createdAt
        tag1
        tag2
        tag3
        tag4
        tag5
        active
      }
      clapItems {
        type
        answer {
          id
          content
          ${userType}
          votesCount
          createdAt
          active
        }
        question {
          id
          title
          content
          viewsCount
          votesCount
          answersCount
          ${userType}
          createdAt
          tag1
          tag2
          tag3
          tag4
          tag5
          active
        }
      }
    }
  }
`;
