import { SessionProvider } from 'next-auth/react';
import MyContext from 'root/context/MyContext';

function MyApp({ Component, pageProps }) {
    return (
        <SessionProvider session={pageProps.session}>
            <MyContext>
            <Component {...pageProps} />
            </MyContext>
        </SessionProvider>
    );
}

export default MyApp;
