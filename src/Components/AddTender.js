
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
  

const AddTender = ({addOpen,setAddOpen,addCheck,setAddCheck,handleAddSnackbar}) => {
    const handleClose = () => {
        setAddOpen(false);
      };

      /*const membersCollectionRef = collection(db, "members")
    const [memberValues,setMemberValues] = useState({
      CompanyName:"",
      ProprietorName1:"",
      ProprietorName2:"",
      ProprietorName3:"",
      Address:"",
      MobileNumber:"",
      PhotoURL:"",
      IsDeleted:"",
      MobileNumber2:"",
      MobileNumber3:"",
    })
    const [memberPhoto,setMemberPhoto] = useState(null)
    
    const changeAddHandler = e =>{
      e.preventDefault();
      setMemberValues({
        ...memberValues,
        [e.target.name]:e.target.value
      })
    }

    const createMember = () =>{
      if(memberPhoto == null)
        return;
      var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      var charactersLength = characters.length;
      const photoRef = ref(storage,`Photo/${memberValues.CompanyName+memberValues.MobileNumber+characters.charAt(Math.floor(Math.random() * 
        charactersLength))}`);

        const uploadTask = uploadBytesResumable(photoRef, memberPhoto)
      uploadTask.on('state_changed', (snapshot) => {
        }, 
      (error) => { 
        // error function ....
        console.log(error);
      }, 
      ()=>{
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          addDoc(membersCollectionRef,
            {
              CompanyName:memberValues.CompanyName,
              },              
              Address:memberValues.Address,
              MobileNumber: {
                MobileNumber1:memberValues.MobileNumber,
                MobileNumber2:memberValues.MobileNumber2,
                MobileNumber3:memberValues.MobileNumber3,
              },
              PhotoURL:downloadURL,
              IsDeleted:0,              
            })
          handleAClose()
          setAddCheck(addCheck+1)
          handleAddSnackbar()
        })  
      });
     
    */
 const classes = useStyles();
  return (
    
    <div >
      <Dialog
        open={addOpen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"   
        PaperProps={{ sx: { width: "70vw", height: "27vw" } }}     
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