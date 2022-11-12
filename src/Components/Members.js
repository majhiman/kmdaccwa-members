import React, { useState,useEffect } from 'react'
import { db } from '../firebase-config';
import {collection, getDocs, where, query} from "firebase/firestore"
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { makeStyles } from '@mui/styles';
import { DataGrid, GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid';
import AddMembers from './AddMembers';
import ReplayIcon from '@mui/icons-material/Replay';
import DeleteMembers from './DeleteMembers';
import EditMembers from './EditMembers';
import { Typography } from '@mui/material';
import Abstract from "../Assets/Abstract.jpg";
import { useNavigate, /* other hooks */ } from 'react-router-dom'; 



const useStyles = makeStyles(theme => ({
  buttongroup:{
    marginLeft:"1%",
    marginTop:"1%"
  },
  button:{
    backgroundColor:"#213d44 !important",
    color:"#f17561 !important",
    fontWeight: 'bold !important' ,

  },  
  buttonRight:{
    backgroundColor:"#06283D !important",
    color:"#DFF6FF !important",
    float:"right",
    marginRight:"1% !important",
    marginTop:"1% !important",
    textDecoration:"bold, italic !important"
  },
  Abstract:{
    backgroundImage:`url(${Abstract})`,
    backgroundRepeat:"no-repeat center center fixed",
    height:"100%",
    width:"100%",
    backgroundSize:"cover",
  },

  text:{
    color:"#000000",
    fontFamily: 'Times-Bold',  
  },
  mainDivStyle:{
    marginTop:"1%",
  }
}));

//==================================
function CustomToolbar() {
  return (

    <GridToolbarContainer>
      <GridToolbarExport
       printOptions={{
        hideFooter: true,
        hideToolbar: true,
      }} />
    </GridToolbarContainer>
  );
}



const Members = ({
  handleAddSnackbar,
  handleEditSnackbar,
  handleDeleteSnackbar,
  handleWarningSnackbar,
  handleSRefresh,
}) => {

    const [members,setMembers] = useState([]);
    const membersCollectionRef = collection(db, "members");
    const q = query(membersCollectionRef,where("IsDeleted","==",0))
    const [addCheck,setAddCheck] = useState(0)
    const [refresh,setRefresh] = useState(0)
        
    const columns = [
      {
        headerName: 'Sl No', 
        filterable: false,
        width: 100,
        height:200,
        renderCell: (index) => index.api.getRowIndex(index.row.id) + 1,
      },
      { field: 'CompanyName', headerName: 'Company Name', width: 300,height:200,align: "left" },
      { 
        field: 'ProprietorName',
        headerName: 'Proprietor Name', 
        height:200,
        width: 250,
        align: "left",
        renderCell:(params) =>(
          <div>
            <Typography>{params.value.ProprietorName1}</Typography>
            <Typography>{params.value.ProprietorName2}</Typography>
            <Typography>{params.value.ProprietorName3}</Typography>
          </div>          
        )
      },
      { 
        field: 'MobileNumber',
        headerName: 'Mobile Number ', 
        height:200,
        width: 200,
        align: "left",
        renderCell:(params) =>(
          <div>
            <Typography>{params.value.MobileNumber1}</Typography>
            <Typography>{params.value.MobileNumber2}</Typography>
            <Typography>{params.value.MobileNumber3}</Typography>
          </div>          
        )
      },
      { field: 'Address', headerName: 'Address', height:200,width: 400,align: "left" },  
      {
        field: 'PhotoURL',
        headerName: 'Photo',
        width:"150",
        height:"200",
        editable: true,
        fontSize:"40vw",
        renderCell: (params) => <img src={params.value} alt="avt" height="120" width="100"/>, // renderCell will render the component
      }
    ];
    
    //====handleSl_no=========
    const [id,setId] = useState([])
    const handleSl_no = (dataGridSl_no) =>{
      setId(dataGridSl_no)
    }

    //==========Refresh=====
    const handleRefresh = () =>{
      handleSRefresh()
      setRefresh(refresh+1)
    }

    const navigate = useNavigate();
    const handleTender = () =>{
      navigate("/tender");
    }
    
    useEffect(()=>{
        const getMembers = async () =>{
            const data = await getDocs(q);
            setMembers(data.docs.map((doc)=>({
              ...doc.data(),
              id:doc.id,
            })));            
        }
        getMembers()
        //console.log(members)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[addCheck,refresh])

    const classes = useStyles();

    //=================Add Dialog ==================
    const [addOpen, setAddOpen] = React.useState(false);
    const handleClickOpen = () => {
      setAddOpen(true);
    };

    //=================Delete Dialog ==================
    const [deleteOpen, setDeleteOpen] = React.useState(false);
    const handleDClickOpen = () => {
      if(id.length>0)
        setDeleteOpen(true);
      else
        handleWarningSnackbar();
    };

    //=================Delete Dialog ==================
    const [editOpen, setEditOpen] = React.useState(false);
    const handleEClickOpen = () => {
      if(id.length>0 && id.length<=1)
        setEditOpen(true);
      
      else 
        handleWarningSnackbar()
    };



 
    
  return (
    <div className={classes.Abstract} >
       <span className="bold"></span>
      <ButtonGroup variant="contained" className={classes.buttongroup}>
        <Button className={classes.button} onClick={handleClickOpen}>Add</Button>
        <AddMembers 
          addOpen={addOpen} 
          setAddOpen={setAddOpen} 
          addCheck={addCheck} 
          setAddCheck={setAddCheck} 
          handleAddSnackbar={handleAddSnackbar}
        />

        <Button className={classes.button} onClick={handleEClickOpen}>Update</Button>
        <EditMembers 
          editOpen={editOpen} 
          setEditOpen={setEditOpen} 
          addCheck={addCheck} 
          setAddCheck={setAddCheck} 
          id={id}
          handleEditSnackbar={handleEditSnackbar}
          members={members}
        />

        <Button className={classes.button} onClick={handleDClickOpen}>Delete</Button>
        <DeleteMembers 
          deleteOpen={deleteOpen} 
          setDeleteOpen={setDeleteOpen} 
          addCheck={addCheck} 
          setAddCheck={setAddCheck} 
          id={id}
          handleDeleteSnackbar={handleDeleteSnackbar}
        />

        <Button className={classes.button} onClick={handleRefresh}><ReplayIcon/></Button>

        
      </ButtonGroup>

      <Button className={classes.buttonRight} onClick={handleTender}>Tender Details</Button>
      
      
      <DataGrid
        className={classes.mainDivStyle}
        rowHeight={100}
        columns={columns} 
        rows={members}
        getRowId={(r) => r.id}
        rowsPerPageOptions={[7,10,25,50,100]}
        autoHeight
        checkboxSelection
        onSelectionModelChange={
          //itm => console.log(itm)
          itm => handleSl_no(itm)           
        }
        components={{ Toolbar: CustomToolbar }}
        style={{color:"#1a2e35",height: '100%', width: '100%',whiteSpace: 'pre-line'}}
        sx={{
          ".MuiTablePagination-displayedRows":{
            color:"#1a2e35",
          },
          ".MuiTablePagination-toolbar":{
            color:"#1a2e35",
            
          },
          ".MuiTablePagination-actions":{
            color:"#1a2e35",
           
          },
          ".css-12wnr2w-MuiButtonBase-root-MuiCheckbox-root":{
            color:"#1a2e35",
            
          },
          ".css-12wnr2w-MuiButtonBase-root-MuiCheckbox-root.Mui-checked":{
            color:"#1a2e35",
            
          },
          ".MuiSvgIcon-root":{
            color:"#1a2e35",
            
          },
          '@media print': {
            '.MuiDataGrid-main': { color: '#06283D',fontSize:'30px',width:'100%'},
            '.MuiDataGrid-columnHeaders':{fontSize:'20px'},
            '.MuiDataGrid-cellContent':{fontSize:'15px'}
          }
        }}
      />
    
    </div>
  )
}

export default Members