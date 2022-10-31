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
import EditeMembers from './EditeMembers';

const useStyles = makeStyles(theme => ({
  buttongroup:{
    marginLeft:"1%",
    marginTop:"1%"
  },
  button:{
    backgroundColor:"#06283D !important",
    color:"#DFF6FF"
  },  
  text:{
    color:"#06283D",
    fontFamily:"Times New Roman"
  },
  mainDivStyle:{
    marginTop:"1%"
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
const columns = [
  {
    headerName: 'Sl No', 
    filterable: false,
    width: 10,
    renderCell: (index) => index.api.getRowIndex(index.row.id) + 1,
  },
  { field: 'CompanyName', headerName: 'Company Name', width: 150,align: "left" },
  { field: 'ProprietorName1', headerName: 'Proprietor Name 1', width: 130,align: "left" },
  { field: 'MobileNumber', headerName: 'Mobile Number 1', width: 130,align: "left" },
  { field: 'Address', headerName: 'Address', width: 700,align: "left" },  
  {
    field: 'PhotoURL',
    headerName: 'Photo',
    width: 100,
    editable: true,
    renderCell: (params) => <img src={params.value} alt="avt" height="80" width="100"/>, // renderCell will render the component
  },  
  { field: 'ProprietorName2', headerName: 'Proprietor Name 2', width: 130,align: "left" },
  { field: 'ProprietorName3', headerName: 'Proprietor Name 3', width: 130,align: "left" },  
  { field: 'MobileNumber2', headerName: 'Mobile Number 2', width: 130,align: "left" },
  { field: 'MobileNumber3', headerName: 'Mobile Number 3', width: 130,align: "left" },
];

const Members = ({
  handleAddSnackbar,
  handleEditSnackbar,
  handleDeleteSnackbar,
  handleWarningSnackbar,
  handleSRefresh
}) => {
    const [members,setMembers] = useState([]);
    const membersCollectionRef = collection(db, "members");
    const q = query(membersCollectionRef,where("IsDeleted","==",0))
    const [addCheck,setAddCheck] = useState(0)
    const [refresh,setRefresh] = useState(0)

    //====handleSl_no=========
    const [id,setId] = useState([])
    const handleSl_no = (dataGridSl_no) =>{
      setId(dataGridSl_no)
    }
////
    //==========Refresh=====
    const handleRefresh = () =>{
      handleSRefresh()
      setRefresh(refresh+1)
    }
    useEffect(()=>{
        const getMembers = async () =>{
            const data = await getDocs(q);
            setMembers(data.docs.map((doc)=>({
              ...doc.data(),
              id:doc.id
            })));
        }

        getMembers()
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
    const [editeOpen, setEditeOpen] = React.useState(false);
    const handleEClickOpen = () => {
      if(id.length>0 && id.length<=1)
        setEditeOpen(true);
      
      else 
        handleWarningSnackbar()
    };



 
    
  return (
    <div >
      <ButtonGroup variant="contained" className={classes.buttongroup}>
        <Button className={classes.button} onClick={handleClickOpen}>Add</Button>
        <AddMembers 
          addOpen={addOpen} 
          setAddOpen={setAddOpen} 
          addCheck={addCheck} 
          setAddCheck={setAddCheck} 
          handleAddSnackbar={handleAddSnackbar}
        />

        <Button className={classes.button} onClick={handleEClickOpen}>Edite</Button>
        <EditeMembers 
          editeOpen={editeOpen} 
          setEditeOpen={setEditeOpen} 
          addCheck={addCheck} 
          setAddCheck={setAddCheck} 
          id={id}
          handleEditSnackbar={handleEditSnackbar}
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

      
      
      <DataGrid
        className={classes.mainDivStyle}
        rowHeight={80}
        columns={columns} 
        rows={members}
        getRowId={(r) => r.id}
        rowsPerPageOptions={[7,50,100]}
        autoHeight
        checkboxSelection
        onSelectionModelChange={
          //itm => console.log(itm)
          itm => handleSl_no(itm)           
        }
        components={{ Toolbar: CustomToolbar }}
        style={{color:"#06283D",height: '100%', width: '100%'}}
        sx={{
          ".MuiTablePagination-displayedRows":{
            color:"#06283D"
          },
          ".MuiTablePagination-toolbar":{
            color:"#06283D"
          },
          ".MuiTablePagination-actions":{
            color:"#06283D"
          },
          ".css-12wnr2w-MuiButtonBase-root-MuiCheckbox-root":{
            color:"#06283D"
          },
          ".css-12wnr2w-MuiButtonBase-root-MuiCheckbox-root.Mui-checked":{
            color:"#06283D"
          },
          ".MuiSvgIcon-root":{
            color:"#06283D"
          },
          '@media print': {
            '.MuiDataGrid-main': { color: '#06283D',fontSize:'20px' },
          }
        }}
      />
    
    </div>
  )
}

export default Members