const { ApolloServer, gql } = require('apollo-server');

const typeDefs = gql`
    type Image {
        url: String
        description: String
        thumbnailUrl(width: Int, height: Int): String
    }

    enum ProductDescriptionFormat {
        TEXT
        HTML
    }

    enum Locales {
        EN
        FR
        DE
    }

    type Product {
        name: String
        description(format: ProductDescriptionFormat = TEXT, locale: Locales = EN): String
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
        url: () => 'https:///www.example.com/abc.png',
    }),
};

const resolvers = {
    Query: {
        helloTwo: () => 'Real hello'
    },
    Product: {
        description: (_, { locale }) => {
            const foreignDescription = locale === 'FR' && 'bonjour le monde' || locale === 'DE' && 'hallo wereld'
            
            if (locale === 'EN') {
                return 'hello world'
            }
            return foreignDescription;
        }
    },
    Image: {
        thumbnailUrl: (_, {width, height}) => `https:///www.example.com/abc-${width}-${height}.png`,
    },
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
