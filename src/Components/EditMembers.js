import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase-config';
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

const EditMembers = ({editOpen,setEditOpen,addCheck,setAddCheck,id,members,handleEditSnackbar}) => {
    const handleClose = () => {
        setEditOpen(false);
      };
      
      //for input field
      const [memberValues,setMemberValues] = useState([])

      //for previous stored data
      const [fetchmemberdata,setFetchmemberdata] = useState({
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

      //edit handlers

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
            MobileNumber1:"",
            MobileNumber2:"",
            MobileNumber3:"",
        })
        handleClose()
      }

      //call to firebase
      const editMember = async (e) =>{
        let mobile = false;
        const newFields = {
          ProprietorName:{
            ProprietorName1:fetchmemberdata.ProprietorName.ProprietorName1,
            ProprietorName2:memberValues.ProprietorName2,
            ProprietorName3:memberValues.ProprietorName3,
          },            
          Address:memberValues.Address,
          MobileNumber:{
            MobileNumber1:memberValues.MobileNumber1,
            MobileNumber2:memberValues.MobileNumber2,
            MobileNumber3:memberValues.MobileNumber3,
          }            
        }
        const memberDoc = doc(db,"members",id[0]);

        if((newFields.ProprietorName.ProprietorName2 === undefined || 
          newFields.ProprietorName.ProprietorName2 === "") &&(
          newFields.ProprietorName.ProprietorName3 === undefined ||
          newFields.ProprietorName.ProprietorName3 === "")){
            await updateDoc(memberDoc,{ProprietorName:{
              ProprietorName1:fetchmemberdata.ProprietorName.ProprietorName1,
              ProprietorName2:fetchmemberdata.ProprietorName.ProprietorName2,
              ProprietorName3:fetchmemberdata.ProprietorName.ProprietorName3
            }})
        }

        else if ((newFields.ProprietorName.ProprietorName2 !== undefined || 
          newFields.ProprietorName.ProprietorName2 !== "") &&(
          newFields.ProprietorName.ProprietorName3 === undefined ||
          newFields.ProprietorName.ProprietorName3 === "")) {
            await updateDoc(memberDoc,{ProprietorName:{
              ProprietorName1:fetchmemberdata.ProprietorName.ProprietorName1,
              ProprietorName2:newFields.ProprietorName.ProprietorName2,
              ProprietorName3:fetchmemberdata.ProprietorName.ProprietorName3
            }})
          }
        
        else{
          await updateDoc(memberDoc,{ProprietorName:{
            ProprietorName1:fetchmemberdata.ProprietorName.ProprietorName1,
            ProprietorName2:fetchmemberdata.ProprietorName.ProprietorName2,
            ProprietorName3:newFields.ProprietorName.ProprietorName3
          }})
        }

        if((newFields.MobileNumber.MobileNumber1 === undefined || 
          newFields.MobileNumber.MobileNumber1 === "") &&(
          newFields.MobileNumber.MobileNumber2 === undefined ||
          newFields.MobileNumber.MobileNumber2 === "") && (
          newFields.MobileNumber.MobileNumber3 === undefined ||
          newFields.MobileNumber.MobileNumber3 === ""
          ) && mobile === false){
            await updateDoc(memberDoc,{
              MobileNumber:{
                MobileNumber1:fetchmemberdata.MobileNumber.MobileNumber1,
                MobileNumber2:fetchmemberdata.MobileNumber.MobileNumber2,
                MobileNumber3:fetchmemberdata.MobileNumber.MobileNumber3,
              }   
            })
            mobile=true;            
            //console.log("1")
          }

          else if((newFields.MobileNumber.MobileNumber1 !== undefined || 
            newFields.MobileNumber.MobileNumber1 !== "") &&(
            newFields.MobileNumber.MobileNumber2 === undefined ||
            newFields.MobileNumber.MobileNumber2 === "") && (
            newFields.MobileNumber.MobileNumber3 === undefined ||
            newFields.MobileNumber.MobileNumber3 === ""
            ) && mobile === false){
              await updateDoc(memberDoc,{
                MobileNumber:{
                  MobileNumber1:newFields.MobileNumber.MobileNumber1,
                  MobileNumber2:fetchmemberdata.MobileNumber.MobileNumber2,
                  MobileNumber3:fetchmemberdata.MobileNumber.MobileNumber3,
                }   
              })
              mobile=true;            
              //console.log("2")
            }

            else if((newFields.MobileNumber.MobileNumber1 === undefined || 
              newFields.MobileNumber.MobileNumber1 === "") &&(
              newFields.MobileNumber.MobileNumber2 !== undefined ||
              newFields.MobileNumber.MobileNumber2 !== "") && (
              newFields.MobileNumber.MobileNumber3 === undefined ||
              newFields.MobileNumber.MobileNumber3 === ""
              ) && mobile === false){
                await updateDoc(memberDoc,{
                  MobileNumber:{
                    MobileNumber1:fetchmemberdata.MobileNumber.MobileNumber1,
                    MobileNumber2:newFields.MobileNumber.MobileNumber2,
                    MobileNumber3:fetchmemberdata.MobileNumber.MobileNumber3,
                  }   
                })
                mobile=true;            
                //console.log("3")
              }

          else if((newFields.MobileNumber.MobileNumber1 === undefined || 
              newFields.MobileNumber.MobileNumber1 === "") &&(
              newFields.MobileNumber.MobileNumber2 !== undefined ||
              newFields.MobileNumber.MobileNumber2 !== "") && (
              newFields.MobileNumber.MobileNumber3 === undefined ||
              newFields.MobileNumber.MobileNumber3 === ""
              ) && mobile === false){
                await updateDoc(memberDoc,{
                  MobileNumber:{
                    MobileNumber1:fetchmemberdata.MobileNumber.MobileNumber1,
                    MobileNumber2:newFields.MobileNumber.MobileNumber2,
                    MobileNumber3:fetchmemberdata.MobileNumber.MobileNumber3,
                  }   
                })
                mobile=true;            
                //console.log("3")
              }

          else if((newFields.MobileNumber.MobileNumber1 === undefined || 
              newFields.MobileNumber.MobileNumber1 === "") &&(
              newFields.MobileNumber.MobileNumber2 !== undefined ||
              newFields.MobileNumber.MobileNumber2 !== "") && (
              newFields.MobileNumber.MobileNumber3 === undefined ||
              newFields.MobileNumber.MobileNumber3 === ""
              ) && mobile === false){
                await updateDoc(memberDoc,{
                  MobileNumber:{
                    MobileNumber1:fetchmemberdata.MobileNumber.MobileNumber1,
                    MobileNumber2:newFields.MobileNumber.MobileNumber2,
                    MobileNumber3:fetchmemberdata.MobileNumber.MobileNumber3,
                  }   
                })
                mobile=true;            
                //console.log("3")
              }
              else if((newFields.MobileNumber.MobileNumber1 === undefined || 
                newFields.MobileNumber.MobileNumber1 === "") &&(
                newFields.MobileNumber.MobileNumber2 === undefined ||
                newFields.MobileNumber.MobileNumber2 === "") && (
                newFields.MobileNumber.MobileNumber3 !== undefined ||
                newFields.MobileNumber.MobileNumber3 !== ""
                ) && mobile === false){
                  await updateDoc(memberDoc,{
                    MobileNumber:{
                      MobileNumber1:fetchmemberdata.MobileNumber.MobileNumber1,
                      MobileNumber2:fetchmemberdata.MobileNumber.MobileNumber2,
                      MobileNumber3:newFields.MobileNumber.MobileNumber3,
                    }   
                  })
                  mobile=true;            
                  //console.log("4")
                }


                else if((newFields.MobileNumber.MobileNumber1 !== undefined || 
                  newFields.MobileNumber.MobileNumber1 !== "") &&(
                  newFields.MobileNumber.MobileNumber2 !== undefined ||
                  newFields.MobileNumber.MobileNumber2 !== "") && (
                  newFields.MobileNumber.MobileNumber3 === undefined ||
                  newFields.MobileNumber.MobileNumber3 === ""
                  ) && mobile === false){
                    await updateDoc(memberDoc,{
                      MobileNumber:{
                        MobileNumber1:newFields.MobileNumber.MobileNumber1,
                        MobileNumber2:newFields.MobileNumber.MobileNumber2,
                        MobileNumber3:fetchmemberdata.MobileNumber.MobileNumber3,
                      }   
                    })
                    mobile=true;            
                    //console.log("5")
                  }

                  else if((newFields.MobileNumber.MobileNumber1 === undefined || 
                    newFields.MobileNumber.MobileNumber1 === "") &&(
                    newFields.MobileNumber.MobileNumber2 !== undefined ||
                    newFields.MobileNumber.MobileNumber2 !== "") && (
                    newFields.MobileNumber.MobileNumber3 !== undefined ||
                    newFields.MobileNumber.MobileNumber3 !== ""
                    ) && mobile === false){
                      await updateDoc(memberDoc,{
                        MobileNumber:{
                          MobileNumber1:fetchmemberdata.MobileNumber.MobileNumber1,
                          MobileNumber2:newFields.MobileNumber.MobileNumber2,
                          MobileNumber3:newFields.MobileNumber.MobileNumber3,
                        }   
                      })
                      mobile=true;            
                      //console.log("6")
                    }

                    else if((newFields.MobileNumber.MobileNumber1 !== undefined || 
                      newFields.MobileNumber.MobileNumber1 !== "") &&(
                      newFields.MobileNumber.MobileNumber2 === undefined ||
                      newFields.MobileNumber.MobileNumber2 === "") && (
                      newFields.MobileNumber.MobileNumber3 !== undefined ||
                      newFields.MobileNumber.MobileNumber3 !== ""
                      ) && mobile === false){
                        await updateDoc(memberDoc,{
                          MobileNumber:{
                            MobileNumber1:newFields.MobileNumber.MobileNumber1,
                            MobileNumber2:fetchmemberdata.MobileNumber.MobileNumber2,
                            MobileNumber3:newFields.MobileNumber.MobileNumber3,
                          }   
                        })
                        mobile=true;            
                        //console.log("7")
                      }

                      else if((newFields.MobileNumber.MobileNumber1 !== undefined || 
                        newFields.MobileNumber.MobileNumber1 !== "") &&(
                        newFields.MobileNumber.MobileNumber2 !== undefined ||
                        newFields.MobileNumber.MobileNumber2 !== "") && (
                        newFields.MobileNumber.MobileNumber3 !== undefined ||
                        newFields.MobileNumber.MobileNumber3 !== ""
                        ) && mobile === false){
                          await updateDoc(memberDoc,{
                            MobileNumber:{
                              MobileNumber1:newFields.MobileNumber.MobileNumber1,
                              MobileNumber2:newFields.MobileNumber.MobileNumber2,
                              MobileNumber3:newFields.MobileNumber.MobileNumber3,
                            }   
                          })
                          mobile=true;            
                          //console.log("8")
                        }
          
          if(newFields.Address==="" || newFields.Address=== undefined){
            await updateDoc(memberDoc,{Address:fetchmemberdata.Address})
          }

          else if(newFields.Address!=="" || newFields.Address!== undefined){
            await updateDoc(memberDoc,{Address:newFields.Address})
          }
                  
        setAddCheck(addCheck+1);
        handleAClose();
        handleEditSnackbar()
    }

    //fetching data
    useEffect(()=>{
      const getMembers = async () =>{
         for(let i=0;i<members.length;i++){
          if(members[i].id === id[0]){
            setFetchmemberdata(members[i])
          }
         }
      }
      getMembers()
      //console.log(fetchmemberdata)
      // eslint-disable-next-line react-hooks/exhaustive-deps
  })

          
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
        <Typography>Company Name :- {fetchmemberdata.CompanyName}</Typography>
        <Typography>Proprietor Name 1 :- {fetchmemberdata.ProprietorName.ProprietorName1}</Typography>

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
            name="MobileNumber1"
            value={memberValues.MobileNumber1} 
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