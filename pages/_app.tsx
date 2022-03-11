import '../styles/globals.css'
import type { AppProps } from 'next/app'
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink
} from "@apollo/client";
import { onError } from '@apollo/client/link/error';
import ProgressBar from "@badrap/bar-of-progress";
import Router from "next/router";

const progress = new ProgressBar({
  size: 2,
  color: "#38a169",
  className: "bar-of-progress",
  delay: 100,
});

Router.events.on("routeChangeStart", progress.start);
Router.events.on("routeChangeComplete", progress.finish);
Router.events.on("routeChangeError", progress.finish);

function MyApp({ Component, pageProps }: AppProps) {

  const errorLink = onError(({ graphQLErrors, networkError, operation }) => {
    const def: any = operation.query.definitions[0]
    let err: any = []
    if (graphQLErrors) {
      graphQLErrors.forEach(({ message }) => {
        err.push(`${message}`)
      }
      );
    }
    if (networkError) err.push(`Network Error: Response not successful`)
    if (def?.operation === 'mutation') alert(err.toString())
    console.log(err, graphQLErrors)
  });

  const httpLink = createHttpLink({
    uri: '/api/graphql/',
  });

  const client = new ApolloClient({
    link: errorLink.concat(httpLink),
    cache: new InMemoryCache()
  });

  return <ApolloProvider client={client}>
    <div className="container mx-auto py-20">
      <Component {...pageProps} />
    </div>
  </ApolloProvider>
}

export default MyApp
