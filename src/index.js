const { ApolloServer, gql } = require('apollo-server');

const typeDefs = gql`
    type Image {
        url: String
        description: String
        thumbnailUrl(width: Int, height: Int): String
    }

    type Product {
        name: String
        description: String
        imageUrl: String @deprecated(reason: "Use \`image { url }\`.")
        image: Image
    }

    type Query {
        hello: String
        helloTwo: String
        product(id: ID!): Product
    }
`;

const mocks = {
    String: () => "mock string",
    Product: () => ({
        imageUrl: () => null
    }),
    Image: () => ({
        thumbnailUrl: () => 'https:///www.example.com/abc-xs-xs.png'
    }),
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
