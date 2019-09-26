import React from 'react';
import { withRouter } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import LoginForm from '../components/LoginForm/LoginForm';
import SignUpForm from '../components/SignUpForm/SignUpForm';
import { IconButton } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { inject } from 'mobx-react';

const styles = theme => ({
  root: {
    height: '100vh'
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    paddingTop: theme.spacing(5),
    paddingBototm: theme.spacing(2),
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3)
  },
  image: {
    backgroundColor: 'orange',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  }
});

@inject('authStore')
class Auth extends React.Component {
  state = {
    login: true
  }
  
  toggle = () => {
    this.setState({
      login: !this.state.login
    })
  };

  handleBack = () => {
    this.props.history.push('/');
  };

  redirect = (path) => {
    this.props.history.push(path);
  }

  handleLogin = async ({ email, password, remember }) => {
    return this.props.authStore.login(email, password, remember);
  }

  render() {
    const { classes } = this.props;
    const { login } = this.state;

    return (
      <Grid container component="main" className={classes.root}>
        <Grid item xs={false} sm={4} md={7} className={classes.image} />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <div className={classes.header}>
            <IconButton className={classes.button} onClick={this.handleBack}>
              <ArrowBackIcon />
            </IconButton>
          </div>
          <div>
            {login ? (
              <LoginForm toggle={this.toggle} submit={this.handleLogin} onSuccess={this.redirect} />
            ) : (
              <SignUpForm toggle={this.toggle} />
            )}
          </div>
        </Grid>
      </Grid>
    )
  }
}

export default withStyles(styles)(withRouter(Auth));
