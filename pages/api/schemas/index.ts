import { gql } from "apollo-server-micro";

export const typeDefs = gql`
    type  User {
        id:ID,
        name: String,
        email:String
    }

    type  Query {
        getUsers: [User]
        getUser(name: String!): User
    }

    type Mutation {
    createUser(name: String!, email: String!): User
    createTag(name:String!):Tags
    }

    type Tags{
        id:ID,
        name:String
    }

    type  Query {
        getTags: [Tags]
    }

    type TagOnAnimation{
        tag:Tags
    }

    type Animation{
        id:ID
        user:User,
        title: String!,
        description:String!,
        path:String!,
        TagOnAnimation:[TagOnAnimation],
        background:String
    }


    type  Query {
        getAnimations: [Animation]
        getAnimationsByTag(name: String!): [Animation]
        getAnimationsByUser(id:ID!):[Animation]
        getAnimation(id:ID!):Animation
        getAnimationsByTagUser(name: String!,userId:String!): [Animation]
    }
    
    `