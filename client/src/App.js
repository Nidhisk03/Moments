import React from 'react';
import { Container } from '@material-ui/core';
import { BrowserRouter, Route, Routes,Navigate } from 'react-router-dom';
import PostDetails from './components/PostDetails/PostDetails';
import Home from './components/Home/Home';
import Navbar from './components/Navbar/Navbar';
import Auth from './components/Auth/Auth';

const App = () => {

  const user = JSON.parse(localStorage.getItem('profile'));

  return (
  <BrowserRouter>
    <Container maxWidth="lg">
      <Navbar />

      <Routes>


        <Route path="/" exact Component={() => <Navigate to="/posts" />}/>
        <Route path="/posts" exact element={<Home />} />
          <Route path="/posts/search" exact element={<Home />} />
          <Route path="/posts/:id" exact element={<PostDetails />} />
{/* 
        <Navigate to="/dashboard" replace={true} /> */}
        <Route path="/auth" exact
         //Component={() => (!user ? <Auth /> : <Navigate to="/posts" />)}
         element={<Auth />}
         />

      </Routes>

    </Container>

  </BrowserRouter>
);
      }
export default App;
