import React, {useEffect,useState} from 'react';
import { db } from '../firebase-config';
import {collection, getDocs, where, query, addDoc} from "firebase/firestore"
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { makeStyles } from '@mui/styles';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';



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
      marginTop:"5% !important",
      borderColor:"#ff735c !important"
      //color:"#ff735c "
    },
    companyName:{
      marginLeft:"2% !important",
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
    
    const [members,setMembers] = useState([]);
    const membersCollectionRef = collection(db, "members");
    const q = query(membersCollectionRef,where("IsDeleted","==",0))
    const [tenderValues,setTenderValues] = useState({
      CompanyName:"",
      TenderNo:"",
      TenderAmount:"",
      FinalcialYear:"",
      Rate:"",
      percengate:"",
      ReceiptNo:""
    })

    useEffect(()=>{
      const getMembers = async () =>{
          const data = await getDocs(q);
          console.log(data)
          setMembers(data.docs.map((doc)=>({
            ...doc.data(),
            id:doc.id,
          })));            
      }
      getMembers()
      
      // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  const changeAddHandler = e =>{
    e.preventDefault();
    setTenderValues({
      ...tenderValues,
      [e.target.name]:e.target.value
    })
  }

  const tenderCollectionRef = collection(db, "tenders")
  const createTenders = () =>{
    /*
    addDoc(tenderCollectionRef,{
      CompanyName:
    })*/
    console.log(tenderValues)
  }

    
 const classes = useStyles();
  return (
    
    <div >
      <Dialog
        open={addOpen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"   
        PaperProps={{ sx: { width: "70vw", height: "30vw" } }}     
      >
        <DialogTitle id="alert-dialog-title" className={classes.dialogBox}>
          {"Add New Members"}
        </DialogTitle>
        <DialogContent className={classes.dialogBox}>

          <Autocomplete
            className={classes.companyName}
            disablePortal
            id="combo-box-demo"
            options={members}
            getOptionLabel={option => option.CompanyName}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField 
              {...params} 
              label="CompanyName" 
              name="CompanyName"
              value={tenderValues.CompanyName}
              onChange={changeAddHandler}
              />}
          />
          
          
          <TextField 
            id="outlined-basic" 
            label="Tender No." 
            variant="outlined" 
            size="small" 
            className={classes.textField} 
            name="TenderNo"
            value={tenderValues.TenderNo} 
            onChange={changeAddHandler}
            required
          />

          <TextField 
            id="outlined-basic" 
            label="Tender Amount" 
            variant="outlined" 
            size="small" 
            className={classes.textField} 
            name="TenderAmount"
            value={tenderValues.TenderAmount} 
            onChange={changeAddHandler}
            required
          />

          <TextField 
            id="outlined-basic" 
            label="Finalcial Year" 
            variant="outlined" 
            size="small" 
            className={classes.textField} 
            name="FinalcialYear"
            value={tenderValues.FinalcialYear} 
            onChange={changeAddHandler}
            required
          />

          <TextField 
            id="outlined-basic" 
            label="Rate" 
            variant="outlined" 
            size="small" 
            className={classes.textField} 
            name="Rate"
            value={tenderValues.Rate} 
            onChange={changeAddHandler}
           required
          />

          <TextField 
            id="outlined-basic" 
            label="Receipt No." 
            variant="outlined" 
            size="small" 
            className={classes.textField} 
            name="ReceiptNo"
            value={tenderValues.ReciptNo} 
            onChange={changeAddHandler}
            required
          />

        </DialogContent>
        <DialogActions className={classes.dialogBox}>
          <Button onClick={handleClose} className={classes.button}>Cancel</Button>
         <Button autoFocus className={classes.button} onClick={createTenders}>
            Add Data
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default AddTender
