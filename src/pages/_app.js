import Navbar from 'root/components/navbar';
import { MyProvider } from '../context/MyContext';
import './page.css'
// import Sidebar from 'root/components/home/sidebar';

function App({ Component, pageProps }) {
  return (
    <MyProvider>
      <Navbar/>
      {/* <Sidebar/> */}
      <Component {...pageProps} />
    </MyProvider>
  );
}

export default App;
