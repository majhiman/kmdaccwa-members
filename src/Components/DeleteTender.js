import React from 'react'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { makeStyles } from '@mui/styles';
import Typography from '@mui/material/Typography';

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
    button:{
      backgroundColor:"#831707 !important",
      color:"#DFF6FF !important"
    }
  }));


const DeleteTender = ({deleteOpen,setDeleteOpen,addCheck,setAddCheck,id,handleDeleteSnackbar}) => {
    const handleClose = () => {
        setDeleteOpen(false);
      };
        const deleteUser = async (e) =>{
            const newFields = {IsDeleted:1}
            for (let i = 0; i< id.length; i++){
                //const memberDoc = doc(db,"members",id[i]);
                //await updateDoc(memberDoc,newFields)
            }
            setAddCheck(addCheck+1);
            handleClose();
            handleDeleteSnackbar()
        }
        const classes = useStyles();
  return (
    <div>
        <Dialog
        open={deleteOpen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"   
        PaperProps={{ sx: { width: "50vw", height: "15vw" } }}     
      >
        <DialogTitle id="alert-dialog-title" className={classes.dialogBox}>
          {"Delete Tenders"}
        </DialogTitle>
        <DialogContent className={classes.dialogBox}>
        <Typography variant="subtitle1" component="div">
            Are you sure you want to delete the Tender records
        </Typography>     
        </DialogContent>
        <DialogActions className={classes.dialogBox}>
          <Button onClick={handleClose} className={classes.button}>Cancel</Button>
          <Button  autoFocus className={classes.button} onClick={deleteUser}>
            Delete Data
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default DeleteTender