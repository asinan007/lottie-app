import { gql } from "@apollo/client"

export const CREATEANIMATION = gql`
 mutation createAnimation($userId: Int!, $title: String!,$description:String!,$path:String!,$tagId:Int!) {
    createAnimation(userId: $userId, title: $title,description:$description,path:$path,tagId:$tagId) {
      userId
      title
      description
      path
      tagId
    }
  }`