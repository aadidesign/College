import { MyProvider } from '../context/MyContext';
import './page.css'

function App({ Component, pageProps }) {
  return (
    <MyProvider>
      <Component {...pageProps} />
    </MyProvider>
  );
}

export default App;
