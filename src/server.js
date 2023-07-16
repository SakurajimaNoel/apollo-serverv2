import { ApolloServer } from '@apollo/server';
import { startServerAndCreateLambdaHandler, handlers } from '@as-integrations/aws-lambda';

import { Neo4jGraphQL } from '@neo4j/graphql';
import neo4j from "neo4j-driver";

import {typeDefs} from './typedefs.js';


const driver = neo4j.driver(
    "neo4j+s://a385299d.databases.neo4j.io",
    neo4j.auth.basic("neo4j", "CF0T52k5tLfOachns14qdQBTFXVvT-3uMp4-29Simpo")
);

const neoSchema = new Neo4jGraphQL({typeDefs, driver});

const server = new ApolloServer({
    schema: await neoSchema.getSchema(),
});



export const graphqlHandler = startServerAndCreateLambdaHandler(
  server,
  handlers.createAPIGatewayProxyEventV2RequestHandler(),
);
