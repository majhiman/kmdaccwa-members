import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase-config';
import React, {useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { makeStyles } from '@mui/styles';
import TextField from '@mui/material/TextField';

const useStyles = makeStyles(theme => ({
    dialogBox:{
      backgroundImage:"radial-gradient(#256D85 ,#256D85)",
      color:"#DFF6FF"
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
      backgroundColor:"#06283D !important",
      color:"#47B5FF !important"
    }
  }));

const EditMembers = ({editOpen,setEditOpen,addCheck,setAddCheck,id,handleEditSnackbar}) => {
    const handleClose = () => {
        setEditOpen(false);
      };
      
      const [memberValues,setMemberValues] = useState({
        ProprietorName2:"",
        ProprietorName3:"",
        Address:"",
        MobileNumber:"",
        MobileNumber2:"",
        MobileNumber3:"",
      })
        
      const changeAddHandler = e =>{
        e.preventDefault();
        setMemberValues({
          ...memberValues,
          [e.target.name]:e.target.value
        })
      }
  
        
      const handleAClose =  e =>{
        setMemberValues({
            ProprietorName2:"",
            ProprietorName3:"",
            Address:"",
            MobileNumber:"",
            MobileNumber2:"",
            MobileNumber3:"",
        })
        handleClose()
      }

      const editMember = async (e) =>{
        const newFields = {
          ProprietorName:{
            ProprietorName2:memberValues.ProprietorName2,
            ProprietorName3:memberValues.ProprietorName3,
          },            
          Address:memberValues.Address,
          MobileNumber:{
            MobileNumber1:memberValues.MobileNumber,
            MobileNumber2:memberValues.MobileNumber2,
            MobileNumber3:memberValues.MobileNumber3,
          }            
        }
        const memberDoc = doc(db,"members",id[0]);
            await updateDoc(memberDoc,newFields)

        setAddCheck(addCheck+1);
        handleClose();
        handleEditSnackbar()
    }
      
          
      const classes = useStyles();
  return (
    <div>
        <Dialog
        open={editOpen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"   
        PaperProps={{ sx: { width: "70vw", height: "27vw" } }}     
      >
        <DialogTitle id="alert-dialog-title" className={classes.dialogBox}>
          {"Edit Member Details"}
        </DialogTitle>
        <DialogContent className={classes.dialogBox}>

          <TextField 
            id="outlined-basic" 
            label="Proprietor Name 2" 
            variant="outlined" 
            size="small" 
            className={classes.textField} 
            name="ProprietorName2"
            value={memberValues.ProprietorName2} 
            onChange={changeAddHandler}
          />

          <TextField 
            id="outlined-basic" 
            label="Proprietor Name 3" 
            variant="outlined" 
            size="small" 
            className={classes.textField} 
            name="ProprietorName3"
            value={memberValues.ProprietorName3} 
            onChange={changeAddHandler}
          />

          <TextField 
            id="outlined-basic" 
            label="Mobile Number 1" 
            variant="outlined" 
            size="small" 
            className={classes.textField} 
            name="MobileNumber"
            value={memberValues.MobileNumber} 
            onChange={changeAddHandler}
          />


          <TextField 
            id="outlined-basic" 
            label="Mobile Number 2" 
            variant="outlined" 
            size="small" 
            className={classes.textField} 
            name="MobileNumber2"
            value={memberValues.MobileNumber2} 
            onChange={changeAddHandler}
          />

          <TextField 
            id="outlined-basic" 
            label="Mobile Number 3" 
            variant="outlined" 
            size="small" 
            className={classes.textField} 
            name="MobileNumber3"
            value={memberValues.MobileNumber3} 
            onChange={changeAddHandler}
          />

          <TextField 
            fullWidth 
            label="Address" 
            id="fullWidth" 
            className={classes.textAddress}
            name="Address"
            value={memberValues.Address} 
            onChange={changeAddHandler}
          />

        </DialogContent>
        <DialogActions className={classes.dialogBox}>
          <Button onClick={handleAClose} className={classes.button}>Cancel</Button>
          <Button onClick={editMember} autoFocus className={classes.button}>
            Add Data
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default EditMembers