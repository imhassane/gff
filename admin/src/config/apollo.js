import { ApolloClient, HttpLink, InMemoryCache } from "apollo-boost";
import { setContext } from "apollo-link-context";

// Initialisation des entêtes.
const authLink = setContext((_, { headers}) => {
    const token = localStorage.getItem('x-auth-token');
    
    return {
        headers: {
            ...headers,
            'authToken': token
        }
    }
});

// Initialisation du cache.
export const cache = new InMemoryCache({});

const client = new ApolloClient({
    uri: 'http://localhost:4000/',
    link: authLink.concat(new HttpLink({ uri: 'http://localhost:4000/' })),
    cache
});

export default client;