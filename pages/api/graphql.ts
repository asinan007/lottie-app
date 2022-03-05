import { ApolloServer } from "apollo-server-micro";
import { typeDefs } from "./schemas";
import { resolvers } from "./resolvers";
import { MicroRequest } from "apollo-server-micro/dist/types";
import { ServerResponse } from "http";
import Cors from 'micro-cors'

const cors = Cors()

const apolloServer = new ApolloServer({ typeDefs, resolvers })

const startServer = apolloServer.start()

export default cors(async function handler(req: MicroRequest, res: ServerResponse) {
  if (req.method === 'OPTIONS') {
    res.end()
    return false
  }
  await startServer
  await apolloServer.createHandler({
    path: '/api/graphql'
  })(req, res)
})


export const config = {
  api: {
    bodyParser: false
  }
}
