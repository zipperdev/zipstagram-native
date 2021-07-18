import { ApolloClient, createHttpLink, InMemoryCache, makeVar } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import AsyncStorage from "@react-native-async-storage/async-storage";

const TOKEN = "token";

export const isLoggedInVar = makeVar(false);
export const tokenVar = makeVar("");

export const logUserIn = async token => {
    await AsyncStorage.setItem(TOKEN, token);
    isLoggedInVar(true);
    tokenVar(token);
};

export const logUserOut = async () => {
    await AsyncStorage.removeItem(TOKEN);
    isLoggedInVar(false);
    tokenVar(null);
};

const httpLink = createHttpLink({
    uri: "http://882dd1eb5420.ngrok.io/graphql"
});
const authLink = setContext((_, { headers }) => {
    return {
        headers: {
            ...headers, 
            token: tokenVar()
        }
    };
});
const client = new ApolloClient({
    link: authLink.concat(httpLink),  
    cache: new InMemoryCache()
});
export default client;