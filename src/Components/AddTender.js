import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { makeStyles } from '@mui/styles';
import TextField from '@mui/material/TextField';



const useStyles = makeStyles(theme => ({
    dialogBox:{
      backgroundImage:"radial-gradient(#cb5041 ,#cb5041)",
      color:"#DFF6FF",
      fontWeight:'700 !important',
      /*fontSize:'150px !impotant'*/
    },
    text:{
      color:"#DFF6FF",
      fontFamily:"Times New Roman"
    },
    textField:{
      marginLeft:"2% !important",
      marginTop:"2% !important",
      borderColor:"#ff735c !important"
      //color:"#ff735c "
    },
    textAddress:{
      marginTop:"2% !important",
      color:"#ff735c"
    },
    uploadButton:{
      marginRight:"35% !important",
      backgroundColor:"#831707 !important",
      color:"#DFF6FF !important"
    },
    button:{
      backgroundColor:"#831707 !important",
      color:"#DFF6FF !important"
    },
    '& .MuiInputBase-input ':{
      color: "#ff735c !important"
    }
  }));
  

const AddTender = ({addOpen,setAddOpen}) => {

    const handleClose = () => {
        setAddOpen(false);
      };  
    

    
 const classes = useStyles();
  return (
    
    <div >
      <Dialog
        open={addOpen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"   
        PaperProps={{ sx: { width: "70vw", height: "20vw" } }}     
      >
        <DialogTitle id="alert-dialog-title" className={classes.dialogBox}>
          {"Add New Members"}
        </DialogTitle>
        <DialogContent className={classes.dialogBox}>
          
          <TextField 
            id="outlined-basic" 
            label="Company Name" 
            variant="outlined" 
            size="small" 
            name="CompanyName"
            className={classes.textField} 
           // value={memberValues.CompanyName} 
           // onChange={changeAddHandler}
            required
          />
          <TextField 
            id="outlined-basic" 
            label="Tender No." 
            variant="outlined" 
            size="small" 
            className={classes.textField} 
            name="TenderNo"
            //value={memberValues.ProprietorName1} 
            //onChange={changeAddHandler}
            required
          />
          <TextField 
            id="outlined-basic" 
            label="Tender Amount" 
            variant="outlined" 
            size="small" 
            className={classes.textField} 
            name="TenderAmount"
            //value={memberValues.ProprietorName2} 
            //onChange={changeAddHandler}
            required
          />

          <TextField 
            id="outlined-basic" 
            label="Rate" 
            variant="outlined" 
            size="small" 
            className={classes.textField} 
            name="Rate"
           // value={memberValues.ProprietorName3} 
           // onChange={changeAddHandler}
           required
          />

          <TextField 
            id="outlined-basic" 
            label="Receipt No." 
            variant="outlined" 
            size="small" 
            className={classes.textField} 
            name="ReceiptNo"
           // value={memberValues.MobileNumber} 
            //onChange={changeAddHandler}
            required
          />

        </DialogContent>
        <DialogActions className={classes.dialogBox}>
          <Button onClick={handleClose} className={classes.button}>Cancel</Button>
         <Button autoFocus className={classes.button}>
            Add Data
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default AddTender