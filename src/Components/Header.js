import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Logo from "../Assets/Logo.png"; 
import { makeStyles } from '@mui/styles';
import { fontFamily } from '@mui/system';
import Ph from "../Assets/Ph.jpg";

const useStyles = makeStyles(theme => ({
    AppBar:{
        backgroundImage:`url(${Ph})` ,
        width:"100%",
        backgroundSize:'100vw 24vh',
        backgroundRepeat: "no-repeat"

    },
    

    logo:{
        height: "10vw",
        marginLeft: "2%",
        marginTop: "1%",
        marginBottom: "1%"
    },

    text:{
        color:"#385b64",
        fontFamily: 'Times-Bold' 
    }
}));


const Header = ({setCheckLogin}) => {
    const classes = useStyles();
    const logout = () =>{
        setCheckLogin(false);
    }
  return (
    <div>
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" className={classes.AppBar}>
                <Toolbar>
                    <img src={Logo} alt="logo" className={classes.logo}/>
                    <Typography variant="h5" component="div" sx={{ flexGrow: 1 }} className={classes.text}>
                        
                    </Typography>
                    <Button 
                        color="inherit" 
                        className={classes.text}
                        onClick={logout}
                    >
                        Logout
                    </Button>
                </Toolbar>
            </AppBar>
        </Box>
    </div>
  )
}

export default Header