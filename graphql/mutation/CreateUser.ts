import { gql } from "@apollo/client"

export const CREATEUSER = gql`
 mutation createUser($name: String!, $email: String!) {
    createUser(name: $name, email: $email) {
      name
      email
    }
  }`