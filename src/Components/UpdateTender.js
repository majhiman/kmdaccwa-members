
import React, {useState,useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { makeStyles } from '@mui/styles';
import TextField from '@mui/material/TextField';
import { Typography } from '@mui/material';

const useStyles = makeStyles(theme => ({
    dialogBox:{
      backgroundImage:"radial-gradient(#cb5041 ,#cb5041)",
      color:"#DFF6FF",
      fontWeight:'700 !important',
    },
    text:{
      color:"#DFF6FF",
      fontFamily:"Times New Roman"
    },
    textField:{
      marginLeft:"2% !important",
      marginTop:"2% !important",
      color:"#DFF6FF"
    },
    textAddress:{
      marginTop:"2% !important",
      color:"#DFF6FF"
    },
    button:{
      backgroundColor:"#831707 !important",
      color:"#DFF6FF !important"
    }
  }));

const UpdateTender = (editOpen,setEditOpen,addCheck,setAddCheck,id,members,handleEditSnackbar) => {
    const handleClose = () => {
        setEditOpen(false);
      };
    
      const [tenderValues,setTenderValues] = useState([])

      //for previous stored data
      const [fetchtenderdata,setFetchtenderdata] = useState({
        Address:"",
        CompanyName:"",
        IsDeleted:"",
        MobileNumber:{
          MobileNumber1:"",
          MobileNumber2:"",
          MobileNumber3:""
        },
        ProprietorName:{
          ProprietorName1:"",
          ProprietorName2:"",
          ProprietorName3:""
        },
        PhotoURL:"",
        id:""
      })


  return (
    <div>UpdateTender</div>
  )
}

export default UpdateTender