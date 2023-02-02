import Home from './routes/home/home.component';
import { Routes, Route } from 'react-router-dom';
import Navigation from './routes/navigation/navigation.component';

const Shop = () => {
  return <h1>I am the shop page</h1>;
};

const Contact = () => {
  return <h1>I am the contact page</h1>;
};

const SignIn = () => {
  return <h1>I am the sign in page</h1>;
};

const App = () => {
  return (
    <Routes>
      <Route path = '/' element = {<Navigation/>}>
        <Route index element = {<Home/>}/>
        <Route path = 'shop' element = {<Shop/>}/>
        <Route path = 'contact' element = {<Contact/>}/>
        <Route path = 'signin' element = {<SignIn/>}/>
      </Route>
    </Routes>
  )
};
export default App;
