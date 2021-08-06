import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import AllPosts from './components/AllPosts'
import OnePosts from './components/OnePost'

function App() {
  return (
    <BrowserRouter>
      <div>
        <Route component={AllPosts} path="/" exact />
        <Route component={OnePosts} path="/:slug" />
      </div>
    </BrowserRouter>
  );
}

export default App;
