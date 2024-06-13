import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Header from './components/Header';
import Footer from './components/Footer';
import 'react-toastify/dist/ReactToastify.css';


const App = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
      <ToastContainer />
    </>
  )
}

export default App
