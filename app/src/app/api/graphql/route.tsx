// Next.js Custom Route Handler: https://nextjs.org/docs/app/building-your-application/routing/router-handlers
import { createSchema, createYoga } from "graphql-yoga";
const { readFile } = require("fs/promises");

const getSchema = async () => {
  const typeDefs = await readFile(
    "./src/app/api/graphql/schema.graphql",
    "utf8"
  );
  console.log(typeDefs);

  return createSchema({
    typeDefs,
    /*resolvers: {
    Query: {
      greetings: () => 'This is the `greetings` field of the root `Query` type'
    }
  }*/
  });
};

const { handleRequest } = createYoga({
  schema: getSchema(),

  // While using Next.js file convention for routing, we need to configure Yoga to use the correct endpoint
  graphqlEndpoint: "/api/graphql",

  // Yoga needs to know how to create a valid Next response
  fetchAPI: { Response },
});

export { handleRequest as GET, handleRequest as POST };
