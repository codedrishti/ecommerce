import React from 'react';
import ErrorIcon from "@mui/icons-material/Error";
import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const NotFound = () => {
     return (
          <div className='orderSuccess'>
               <ErrorIcon />

               <Typography>Page Not Found!</Typography>
               <Link to="/">Go To Home</Link>
          </div>
     )
}

export default NotFound;
