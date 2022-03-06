import { gql } from "@apollo/client";

export const GET_ANIMATIONS_BY_TAG_USER = gql`
  query getAnimationsByTagUser($name:String!,$userId:String!) {
    getAnimationsByTagUser(name:$name,userId:$userId) {
      id
      user{
      name
      }
      title
      path
      description
      TagOnAnimation{
      tag{
      id
      name
      }
      }
      }
  }
`;