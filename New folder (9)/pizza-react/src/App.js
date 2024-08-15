
import { Provider } from 'react-redux';
import store from './store';
import Home from './screens/Home';
import { Place } from './Place';


import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Routes
} from "react-router-dom";

import Cart from "./screens/Cart";
import Login from './Login';
import {React} from 'react';

 function Logout(){
  return (
    <div>
      Logout
    </div>
  )
}

function App() {
  return(
 <div>
 <Router>
      <Provider store={store}>
        <Routes>
          <Route path="/" element={<Login/>} />
          <Route path="/Home" element={<Home/>} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/Logout" element={<Logout />} /> 
          <Route path="/Place" element={<Place />} /> 
        </Routes>
      </Provider>
    </Router>
  </div>
  );
}

export default App;

 