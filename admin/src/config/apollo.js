import { ApolloClient, HttpLink, InMemoryCache } from "apollo-boost";
import { setContext } from "apollo-link-context";

// Initialisation des entêtes.
const authLink = setContext((_, { headers}) => {
    const authToken = localStorage.getItem('x-auth-token');
    if(authToken) return { headers: { ...headers, authToken }};
    return { headers };
});

// Initialisation du cache.
export const cache = new InMemoryCache({});

const client = new ApolloClient({
    uri: 'http://localhost:4000/graphql',
    link: authLink.concat(new HttpLink({ uri: 'http://localhost:4000/graphql' })),
    cache
});

export default client;