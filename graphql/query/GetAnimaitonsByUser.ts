import { gql } from "@apollo/client";

export const GET_ANIMATIONS_BY_USER = gql`
  query getAnimationsByUser($id:ID!) {
    getAnimationsByUser(id:$id) {
        id
      user{
        id
        name
      }
      title
      path
      description
      background
      TagOnAnimation{
      tag{
      id
      name
      }
      }
      }
  }
`;