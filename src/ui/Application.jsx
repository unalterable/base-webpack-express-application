import React from 'react';
import Button from '@material-ui/core/Button';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import TopNav from './components/TopNav.jsx';

const theme = createMuiTheme();

const Application = ({ text }) => {
  return (
    <MuiThemeProvider theme={theme}>
      <TopNav />
      <div>
        <p>Hello World!</p>
        <p onClick={() => console.log('JS working')}>{text}</p>
      </div>
    </MuiThemeProvider>
  );
};

export default Application;
