import React from 'react';
import Route from 'react-router-dom/Route';

const Index = () => <h2>Home</h2>;
const About = () => <h2>About</h2>;
const Users = () => <h2>Users</h2>;

const AppRouter = () => (
  <div>
    <Route path="/" exact component={Index} />
    <Route path="/about/" component={About} /> 
    <Route path="/users/" component={Users} />
  </div>
);

export default AppRouter;