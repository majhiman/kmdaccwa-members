import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Logo from "../Assets/Logo.png";
import TextField from '@mui/material/TextField';
import { makeStyles } from '@mui/styles';
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  card:{
    marginLeft:"37%",
    color:"#06283D",
    borderColor:"#06283D !important",
    borderStyle:"solid"
  },
  field:{
    marginTop:"1.5% !important"
  },
  button:{
    marginTop:"1.5% !important",
    backgroundColor:"#06283D !important",
    color:"#DFF6FF !important"
  },
  text:{
    color:"#06283D !important"
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

  
  return (
    <div className={classes.background}>
      <Card sx={{ maxWidth: "25%" ,height:"30%"}} className={classes.card}>
        <CardMedia
          component="img"
          image={Logo}
          alt="logo"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div" className={classes.text}>
            KMDA Civil Contractors Welfare Association
          </Typography>
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