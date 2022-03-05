import { gql } from "@apollo/client";

export const GET_ANIMATIONS = gql`
  query getAnimations {
    getAnimations {
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