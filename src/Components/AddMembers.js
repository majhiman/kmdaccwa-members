import { addDoc, collection } from 'firebase/firestore';
import { db, storage } from '../firebase-config';
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
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
  uploadButton:{
    marginRight:"35% !important",
    backgroundColor:"#06283D !important",
    color:"#47B5FF !important"
  },
  button:{
    backgroundColor:"#06283D !important",
    color:"#47B5FF !important"
  }
}));


const AddMembers = ({addOpen,setAddOpen,addCheck,setAddCheck,handleAddSnackbar}) => {
    const handleClose = () => {
      setAddOpen(false);
    };
    
    const membersCollectionRef = collection(db, "members")
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
      /*uploadBytes(photoRef, memberPhoto).then(() => {
        
      });*/

      const uploadTask = uploadBytesResumable(photoRef, memberPhoto)
      uploadTask.on('state_changed', (snapshot) => {
        // progrss function ....
        //const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        //console.log('Upload is ' + progress + '% done');
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
              ProprietorName1:memberValues.ProprietorName1,
              ProprietorName2:memberValues.ProprietorName2,
              ProprietorName3:memberValues.ProprietorName3,
              Address:memberValues.Address,
              MobileNumber:memberValues.MobileNumber,
              PhotoURL:downloadURL,
              IsDeleted:0,
              MobileNumber2:memberValues.MobileNumber2,
              MobileNumber3:memberValues.MobileNumber3,
            })
          handleAClose()
          setAddCheck(addCheck+1)
          handleAddSnackbar()
        })  
      });
      
      
      //const photoStorage = getStorage();
      //const photoimageRef = ref(photoStorage,`Photo/${memberValues.CompanyName+memberValues.MobileNumber}.jpeg`);
      //getDownloadURL(photoimageRef)
        //.then((url) => {
          //setPhotourl(url)
      //}) 
    }

    const handleAClose =  e =>{
      setMemberValues({
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
      handleClose()
    }
    
        
    const classes = useStyles();
  return (
    <div>
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
            value={memberValues.CompanyName} 
            onChange={changeAddHandler}
            required
          />
          <TextField 
            id="outlined-basic" 
            label="Proprietor Name 1" 
            variant="outlined" 
            size="small" 
            className={classes.textField} 
            name="ProprietorName1"
            value={memberValues.ProprietorName1} 
            onChange={changeAddHandler}
            required
          />
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
            required
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
            required
          />

        </DialogContent>
        <DialogActions className={classes.dialogBox}>
        <Button  
          variant="contained" 
          component="label" 
          className={classes.uploadButton}       
        >
          Upload Image
          <input 
            hidden 
            accept="image/*" 
            multiple type="file" 
            onChange={(e) => {
              setMemberPhoto(e.target.files[0]);
            }}
            required
            />
        </Button>
          <Button onClick={handleAClose} className={classes.button}>Cancel</Button>
          <Button onClick={createMember} autoFocus className={classes.button}>
            Add Data
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default AddMembers