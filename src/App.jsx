import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Routes } from 'react-router-dom';
import { Route } from 'react-router-dom';
import Home from './pages/Home';
import Cart from './pages/Cart';
import { Navbar } from './components/Navbar';
import store from './store/store';

function App() {
  return (
    <>
      <div className="">
        <Provider store={store}>
          <BrowserRouter>
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />}></Route>
              <Route path="/cart" element={<Cart />}></Route>
            </Routes>
          </BrowserRouter>
        </Provider>
      </div>
    </>
  );
}

export default App;
