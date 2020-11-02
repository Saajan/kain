const { gql } = require("apollo-server-koa");

const typeDefs = gql`
  type Message {
    id: ID!
    title: String!
    description: String!
    status: Boolean!
    created_at: String!
    updated_at: String!
  }

  type Query {
    Messages: [Message]
    Message(id: ID): Message
  }

  input NewMessage {
    title: String!
    description: String!
  }

  type Mutation {
    addMessage(message: NewMessage!): Message!
  }
`;

module.exports = typeDefs;
