import { ApolloProvider } from '@apollo/client';
import { ChakraProvider } from '@chakra-ui/react';
import type { AppProps } from 'next/app';

import { useApollo } from '@/graphql/apollo';
import theme from '@/theme';
import Layout from '@/views/layout';

function MyApp({ Component, pageProps }: AppProps) {
  const apolloClient = useApollo({});

  return (
    <ApolloProvider client={apolloClient}>
      <ChakraProvider resetCSS theme={theme}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ChakraProvider>
    </ApolloProvider>
  );
}

export default MyApp;
