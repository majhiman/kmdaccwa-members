import React, { useState } from 'react'
import Header from './Header'
import Members from './Members'
import { Navigate} from 'react-router-dom';
import CustomSnackbar from './CustomSnackbar';

const Admin = ({authorised,setCheckLogin}) => {

  //====== Snack Bar ===================
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState();
  const [snackbarMessage, setSnackbarMessage] = useState();

  const handlesnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

   //============ Adding Data Snackbar ===========
   const handleAddSnackbar = () => {
     setSnackbarOpen(true);
     setSnackbarSeverity("success");
     setSnackbarMessage("Data Added Successfully !");
   }

  //=========== Edit Snackbar ===================
  const handleEditSnackbar = () => {
    setSnackbarOpen(true);
    setSnackbarSeverity("success");
    setSnackbarMessage("Data Edited Successfully !");
  }

  //=========== Deleting Snackbar ===================
  const handleDeleteSnackbar = () => {
    setSnackbarOpen(true);
    setSnackbarSeverity("success");
    setSnackbarMessage("Data Deleted Successfully !");
  }

  //============ Warning Snackbar ===============
  const handleWarningSnackbar = () => {
    setSnackbarOpen(true);
    setSnackbarSeverity("warning");
    setSnackbarMessage("Action Not allowed !");
  }

  //============== Refresh =====================
  const handleSRefresh = () => { 
    setSnackbarOpen(true);
    setSnackbarSeverity("info");
    setSnackbarMessage("Data Refreshed !");
  }

  if(!authorised){
    return <Navigate  to="/"/>;
  }
  else{
    return (
      <div>
          <Header setCheckLogin={setCheckLogin}/>
          <Members 
            handleAddSnackbar={handleAddSnackbar} 
            handleEditSnackbar={handleEditSnackbar}
            handleDeleteSnackbar={handleDeleteSnackbar}
            handleWarningSnackbar={handleWarningSnackbar}
            handleSRefresh={handleSRefresh}
          />
          <CustomSnackbar
            snackbarOpen={snackbarOpen} 
            handlesnackbarClose={handlesnackbarClose}
            snackbarSeverity={snackbarSeverity}
            snackbarMessage={snackbarMessage}
          />
      </div>
    )
  }
}

export default Admin