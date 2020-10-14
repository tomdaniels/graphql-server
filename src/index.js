const { ApolloServer, gql } = require('apollo-server');

const typeDefs = gql`
    type Query {
        hello: String
        helloTwo: String
    }
`;

const mocks = {
    String: () => "hello",
};

const resolvers = {
    Query: {
        helloTwo: () => 'Real hello'
    }
}

const server = new ApolloServer({
    typeDefs,
    mocks,
    resolvers,
    mockEntireSchema: false,
});

server.listen().then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`)
});
