import React,{ useState,useEffect } from 'react'
import { db } from '../firebase-config';
import {collection, getDocs, where, query} from "firebase/firestore"
import { makeStyles } from '@mui/styles';
import Header from './Header'
import { Navigate} from 'react-router-dom';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import ReplayIcon from '@mui/icons-material/Replay';
import { useNavigate } from "react-router-dom";
import { DataGrid, GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid';
import AddTender from './AddTender';

const useStyles = makeStyles(theme => ({
  headertext:{
    marginLeft:"1%",
  },
  buttongroup:{
    marginLeft:"1%",
    marginTop:"1%"
  },
  button:{
    backgroundColor:"#06283D !important",
    color:"#DFF6FF",
  },  
  buttonRight:{
    backgroundColor:"#06283D !important",
    color:"#DFF6FF !important",
    float:"right",
    marginRight:"1% !important",
    marginTop:"1% !important",
    textDecoration:"none !important"
  },
  mainDivStyle:{
    marginTop:"1%"
  }
}));



const Tender = ({authorised,setCheckLogin}) => {

  const [checkTender,setCheckTender] = useState(0);
  const [tenders,setTenders] = useState([]);
  const tenderCollectionRef = collection(db, "tenders");
  const q = query(tenderCollectionRef,where("IsDeleted","==",0))

  useEffect(()=>{
    const getTenders = async () =>{
        const data = await getDocs(q);
        //console.log(data)
        setTenders(data.docs.map((doc)=>({
          ...doc.data(),
          id:doc.id,
        })));            
    }
    getTenders()
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[checkTender])

  //=================Add Dialog ==================
  const [addOpen, setAddOpen] = React.useState(false);
  const handleClickOpen = () => {
    setAddOpen(true);
  };
    const handleMember = () =>{
      navigate("/admin")
    }
    //========= navigating to  admin page ======
  const navigate = useNavigate();
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
        width: 250,
        align: "left",
      },
      { 
        field: 'FinalcialYear',
        headerName: 'Finalcial Year', 
        height:200,
        width: 250,
        align: "left",
      },
      { 
        field: 'Rate',
        headerName: 'Rate', 
        height:200,
        width: 200,
        align: "left"
      },
      { field: 'Percentage', headerName: '0.50%', height:200,width: 400,align: "left" },  
      {
        field: 'ReceiptNo',
        headerName: 'Receipt No',
        width: 100,
        height:200,
        editable: true,
        fontSize:"40vw"
      }
    ];

    

  return (
    <div>
        <Header setCheckLogin={setCheckLogin}/>
        <h4 className={classes.headertext}>Tender Details</h4>
        <ButtonGroup variant="contained" className={classes.buttongroup}>
          <Button className={classes.button} onClick={handleClickOpen}>Add</Button>
          <AddTender
          addOpen={addOpen} 
          setAddOpen={setAddOpen}
          checkTender={checkTender}
          setCheckTender={setCheckTender}
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
        rows={tenders}
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