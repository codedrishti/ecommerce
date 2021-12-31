import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

const ProtectedRoute = () => {
     const { loading, isAuthenticated } = useSelector((state) => state.user);

     return (
          <Fragment>
               {!loading && (
                    
                    isAuthenticated === true ? <Outlet/> : <Navigate to="/login" />
                    
               )}
          </Fragment>
     );
};

export default ProtectedRoute;
