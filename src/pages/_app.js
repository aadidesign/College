import { MyProvider } from '../context/MyContext';

function App({ Component, pageProps }) {
  return (
    <MyProvider>
      <Component {...pageProps} />
    </MyProvider>
  );
}

export default App;
