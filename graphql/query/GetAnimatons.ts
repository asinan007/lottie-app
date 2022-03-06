import { gql } from "@apollo/client";

export const GET_ANIMATIONS = gql`
  query getAnimations {
    getAnimations {
      id
      user{
        id
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