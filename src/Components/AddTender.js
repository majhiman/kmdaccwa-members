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
      marginTop:"5% !important"
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
  

const AddTender = ({addOpen,setAddOpen,checkTender,setCheckTender}) => {

    const handleClose = () => {
        setAddOpen(false);
      };  
    
    const [members,setMembers] = useState([]);
    const membersCollectionRef = collection(db, "members");
    const q = query(membersCollectionRef,where("IsDeleted","==",0))
    const [companyName, setCompanyName] = useState();
    const [vrate, setVRate] = useState();
    const [tenderValues,setTenderValues] = useState({
      TenderNo:"",
      TenderAmount:"",
      FinalcialYear:"",
      ReceiptNo:""
    })

    useEffect(()=>{
      const getMembers = async () =>{
          const data = await getDocs(q);
          //console.log(data)
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

  const handelAClose = () =>{
    setTenderValues({
      TenderNo:"",
      TenderAmount:"",
      FinalcialYear:"",
      ReceiptNo:""
    })
    handleClose();
  }
  const tenderCollectionRef = collection(db, "tenders")
  const createTenders = () =>{
    
    addDoc(tenderCollectionRef,{
      CompanyName:companyName,
      TenderNo:tenderValues.TenderNo,
      Rate:vrate,
      Percentage:(tenderValues.TenderAmount)*0.005,
      ReceiptNo:tenderValues.ReceiptNo,
      TenderAmount:tenderValues.TenderAmount,
      FinalcialYear:tenderValues.FinalcialYear,
      IsDeleted:0
    })
    
    handelAClose();
    setCheckTender(checkTender+1)
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
            sx={{ width: 230}}
            renderInput={(params) => <TextField 
              {...params} 
              label="Company Name"               
              />}
            onChange={(event, value) => setCompanyName(value.CompanyName)}
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
            label="Receipt No." 
            variant="outlined" 
            size="small" 
            className={classes.textField} 
            name="ReceiptNo"
            value={tenderValues.ReceiptNo} 
            onChange={changeAddHandler}
            required
          />

          <Autocomplete
            className={classes.companyName}
            disablePortal
            id="combo-box-demo"
            options={rate}
            getOptionLabel={option => option.Rate}
            sx={{ width: 230}}
            renderInput={(params) => <TextField 
              {...params} 
              label="Rate"               
              />}
            onChange={(event, value) => setVRate(value.Rate)}
          />

        </DialogContent>
        <DialogActions className={classes.dialogBox}>
          <Button onClick={handelAClose} className={classes.button}>Cancel</Button>
         <Button autoFocus className={classes.button} onClick={createTenders}>
            Add Data
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default AddTender

const rate = [
  {Rate:"At Per", id:1},
  {Rate:"Above", id:2},
  {Rate:"Less", id:3}
]