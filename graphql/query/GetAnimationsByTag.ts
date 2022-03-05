import { gql } from "@apollo/client";

export const GET_ANIMATIONS_BY_TAG = gql`
  query getAnimationsByTag($name:String!) {
    getAnimationsByTag(name:$name) {
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