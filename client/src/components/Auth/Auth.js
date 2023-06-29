import React from 'react';
import { useState,useEffect } from 'react';
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core';
import { GoogleLogin } from "react-google-login";
import { useNavigate} from 'react-router-dom';
import useStyles from "./styles";
import Lock from '@mui/icons-material/Lock';
import Input from './Input';
import Icon from './Icon';
import { gapi } from "gapi-script";
import { useDispatch} from "react-redux";
import { signin,signup} from "../../actions/auth";


const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' };

const Auth = () => {
  const [showpassword, setShowPassword] = useState(false);
  const [isSignup, setSignUp] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();




  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: '865273856040-roqge8uqnfskpugn5oaad00dotrq8o0e.apps.googleusercontent.com',
        scope: 'email',
      });
    }

    gapi.load('client:auth2', start);
  }, []);

  const classes = useStyles();
  
  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSignup) {
      dispatch(signup(formData, navigate));
    } else {
      dispatch(signin(formData, navigate));
    }
  };
  const handleShowPassword = () => setShowPassword((prevshowpassword) => !prevshowpassword);
 
  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const switchMode = () => {
    
    setSignUp((prevIsSignup) => !prevIsSignup);
    setShowPassword(false);
  };
  const googleError = (error) => {
    console.log(error);
    console.log("Google Sign In was unsuccessFull")
  }
  const googleSuccess = async (res) => {
       
     const result = res?.profileObj;
     const token = res?.tokenId;

     try {
       dispatch({type:'AUTH' , data:{result,token}});

       navigate('/');
     } catch (error) {
           console.log(error);
     }

  }


  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}> <Lock />  </Avatar>
        <Typography variant='h5'>{isSignup ? 'Sign Up' : 'Sign In '}</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
        <Grid container spacing={2}>
            { isSignup && (
            <>
              <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
              <Input name="lastName" label="Last Name" handleChange={handleChange} half />
            </>
            )}
            <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
            <Input name="password" label="Password" handleChange={handleChange} type={showpassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
            { isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" /> }
          </Grid>
          <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
            { isSignup ? 'Sign Up' : 'Sign In' }
          </Button>

          <GoogleLogin
            clientId="865273856040-roqge8uqnfskpugn5oaad00dotrq8o0e.apps.googleusercontent.com"
            render={(renderProps) => (
              <Button className={classes.googleButton} color="primary" fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon />} variant="contained">
                Google Sign In
              </Button>
            )}
            onSuccess={googleSuccess}
            onFailure={googleError}
            cookiePolicy="single_host_origin"
          />

          <Grid container justifyContent='flex-end'>
            <Grid item>
              <Button onClick={switchMode}>
                {isSignup ? "Already have an account? Sign In" : "Don,t have an account ? Sign Up"}
              </Button>
            </Grid>

          </Grid>


        </form>
      </Paper>
    </Container>
  )
}

export default Auth
