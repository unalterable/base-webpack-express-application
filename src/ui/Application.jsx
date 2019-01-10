import React from 'react';
import Theme from './Theme.jsx';
import TopNav from './components/TopNav.jsx';

const Application = ({ text }) => {
  return (
    <Theme>
      <TopNav />
      <div>
        <p>Hello World!</p>
        <p onClick={() => console.log('JS working')}>{text}</p>
      </div>
    </Theme>
  );
};

export default Application;
