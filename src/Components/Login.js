import React, { useState } from 'react';
import { Grid } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Wallpap from "../Assets/Wallpap.png";
import TextField from '@mui/material/TextField';
import { makeStyles } from '@mui/styles';
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  card:{
    fontFamily:"oregano",
    position:"absolute",
    color:"#06283D",
    width: "15.4%",
    height: "30%",
    right: "28.5%",
    bottom: "10%",
    borderColor:"#e57059 !important",
    borderStyle:"solid"
  },
  field:{
    marginTop:"2% !important"
  },
  Wallpap:{
    backgroundImage:`url(${Wallpap})`,
    backgroundRepeat:"no-repeat center center fixed",
    height:"100vh",
    width:"100vw",
    backgroundSize:"cover"

  },

  button:{
    marginTop:"4vh !important",
    backgroundColor:"#385b64 !important",
    color:"#DFF6FF !important"
  },
  text:{
    color:"#385b64 !important"
  }
}));

const Login = ({setCheckLogin}) => {
  const navigate = useNavigate();
  const [login,setLogin] = useState({
    username:"",
    password:""
  })
  const classes = useStyles();
  const changeLoginHandler = e =>{
    e.preventDefault();
    setLogin({
      ...login,
      [e.target.name]:e.target.value
    })
  }
  const loginHadler = (e) =>{
    if(login.username==='KMDACCWA' && login.password==="1234"){
      setLogin({
        username:"",
        password:""
      });
      setCheckLogin(true);
      navigate('/admin', { replace: true, state: {authorized:true} })
      
    }
    else{
      setLogin({
        username:"",
        password:""
      });
      navigate('/', { replace: true, state: {authorized:false} })
    }
  }

  //window.onload = function () {window.location.reload()}
  return (
    <div className={classes.Wallpap}>

  
      <Card sx={{ maxWidth: "25%" ,height:"30%"}} className={classes.card}>
        <CardContent>
          <Grid container spacing={1} justify="center" align="left">
          </Grid>
          <TextField 
            fullWidth 
            label="Username"  
            name="username"
            className={classes.field} 
            onChange={changeLoginHandler}
          />
          <TextField 
            fullWidth 
            label="Password" 
            name="password"
            className={classes.field} 
            onChange={changeLoginHandler}
            type="password"
          />
          <Button variant="contained" disableElevation className={classes.button} onClick={loginHadler}>
            Login
          </Button>
        </CardContent>
      </Card>

    </div>
  )
}

export default Login