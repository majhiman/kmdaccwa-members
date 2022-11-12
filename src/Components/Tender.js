import React from 'react'
import { makeStyles } from '@mui/styles';
import Header from './Header'
import { Navigate} from 'react-router-dom';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import ReplayIcon from '@mui/icons-material/Replay';
import { useNavigate } from "react-router-dom";
import { DataGrid, GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid';
import Back from '../Assets/Back.jpeg';
import AddTender from './AddTender';
import DeleteTender from './DeleteTender';

const useStyles = makeStyles(theme => ({
  buttongroup:{
    marginLeft:"1%",
    marginTop:"1%"
  },
  button:{
    backgroundColor:"#06283D !important",
    color:"#DFF6FF",
  },  
  Back:{
    backgroundImage:`url(${Back})`,
    backgroundRepeat:"no-repeat center center fixed",
    height:"100%",
    width:"100%",
    backgroundSize:"cover",
  },
  buttonRight:{
    backgroundColor:"#06283D !important",
    color:"#ff745c !important",
    float:"right",
    marginRight:"1% !important",
    marginTop:"1% !important",
    //textDecoration:"italic !important",
    fontWeight:"700 !important"
  },
  mainDivStyle:{
    marginTop:"1%"
  }
}));





const Tender = ({authorised,setCheckLogin,members}) => {
  //=================Add Dialog ==================
  const [addOpen, setAddOpen] = React.useState(false);
  const handleClickOpen = () => {
    setAddOpen(true);
  };

  //=================Delete Dialog ==================
  const [deleteOpen, setDeleteOpen] = React.useState(false);
  const handleDClickOpen = () => {
   // if(id.length>0)
      setDeleteOpen(true);
   
      //handleWarningSnackbar();
  };

  //=================Delete Dialog ==================
  const [editOpen, setEditOpen] = React.useState(false);
  const handleEClickOpen = () => {
    //if(id.length>0 && id.length<=1)
      setEditOpen(true);
    
  
      //handleWarningSnackbar()
  };
  const navigate = useNavigate();
    const handleMember = () =>{
      navigate("/admin")
    }
    const classes = useStyles();
    if(!authorised){
        return <Navigate  to="/"/>;
    }


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


    const memberstemp=[]
    const columns = [
      {
        headerName: 'Sl No', 
        filterable: false,
        width: 90,
        height:200,
        renderCell: (index) => index.api.getRowIndex(index.row.id) + 1,
      },
      { field: 'CompanyName', headerName: 'Company Name', width: 300,height:200,align: "left" },
      { 
        field: 'TenderNo',
        headerName: 'Tender No',
        
        height:200,
        width: 250,
        align: "left",
      },
      {
        field: 'TenderAmount',
        headerName: 'Tender Amount',
        
        height:200,
        width: 200,
        align: "left",
      },
      { 
        field: 'Rate',
        headerName: 'Rate', 
        height:200,
        width: 130,
        align: "left"
      },
      { field: '0.50%', headerName: '0.50%', height:200,width: 200,align: "left" },  
      {
        field: 'ReceiptNo',
        headerName: 'Receipt No',
        width: 300,
        height:200,
        editable: true,
        fontSize:"40vw"
      }
    ];
    console.log(members)

    

  return (
    <div className={classes.Back}>
        <Header setCheckLogin={setCheckLogin}/>
        <ButtonGroup variant="contained" className={classes.buttongroup}>
          <Button className={classes.button}>Add</Button>
          <AddTender
          addOpen={addOpen} 
          setAddOpen={setAddOpen} 
          //addCheck={addCheck} 
          //setAddCheck={setAddCheck} 
          //handleAddSnackbar={handleAddSnackbar}
        />
          <Button className={classes.button}>Update</Button>
          <Button className={classes.button}>Delete</Button>
          <Button className={classes.button}><ReplayIcon/></Button>
        </ButtonGroup>

        <Button className={classes.buttonRight} onClick={handleMember}>Members Details</Button>

        <DataGrid
        className={classes.mainDivStyle}
        rowHeight={80}
        columns={columns} 
        rows={memberstemp}
        getRowId={(r) => r.id}
        rowsPerPageOptions={[7,10,25,50,100]}
        autoHeight
        checkboxSelection
        //onSelectionModelChange={
          //itm => console.log(itm)
          //itm => handleSl_no(itm)           
        //}
        components={{ Toolbar: CustomToolbar }}
        style={{color:"#06283D",height: '100%', width: '100%',whiteSpace: 'pre-line'}}
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
            '.MuiDataGrid-main': { color: '#06283D',fontSize:'30px',width:'100%'},
            '.MuiDataGrid-columnHeaders':{fontSize:'20px'},
            '.MuiDataGrid-cellContent':{fontSize:'20px'}
          }
        }}
      />
    </div>
  )
}

export default Tender