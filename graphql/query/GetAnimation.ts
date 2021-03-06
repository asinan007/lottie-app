import { gql } from "@apollo/client";

export const GET_ANIMATION = gql`
  query getAnimation($id:ID!) {
    getAnimation(id:$id) {
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