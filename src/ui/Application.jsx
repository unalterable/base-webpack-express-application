import React from 'react';
import purple from '@material-ui/core/colors/purple';
import red from '@material-ui/core/colors/red';
import Button from '@material-ui/core/Button';
import Theme from './Theme.jsx';
import TopNav from './components/TopNav.jsx';
import AppRouter from './components/AppRouter.jsx';

class Application extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      primaryColour: purple,
    };
  }
  render() {
    return (
      <Theme primary={this.state.primaryColour}>
        <TopNav />
        <div>
          <p>Hello World!</p>
          <p> {this.props.text} </p>
          <Button
            variant='outlined'
            onClick={async () => {
              console.info('JS working');
              await new Promise(res => setTimeout(res, 2000));
              this.setState({ primaryColour: red });
              console.info('JS working');
            }}
          >
            Change Theme
          </Button>
        </div>
        <AppRouter/>
      </Theme>
    );
  }
}

export default Application;
