import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import "./ProductList.css";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from "@mui/material";
import MetaData from "../layout/MetaData";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Sidebar from "./Sidebar";
import { getAllUsers, clearErrors, deleteUser } from "../../actions/userAction";
import { DELETE_USER_RESET } from "../../constants/userConstant";

const UsersList = () => {
     const dispatch = useDispatch();
     const alert = useAlert();
     const navigate = useNavigate();

     const { users, error } = useSelector((state) => state.allUsers);

     const { error: deleteError, isDeleted, message } = useSelector((state) => state.profile);

     const deleteUserHandler = (id) => {
          dispatch(deleteUser(id));
     };

     useEffect(() => {
          if (error) {
               alert.error(error);
               dispatch(clearErrors());
          }

          if (deleteError) {
               alert.error(deleteError);
               dispatch(clearErrors());
          }

          if (isDeleted) {
               alert.success(message);
               dispatch({ type: DELETE_USER_RESET });
          }

          dispatch(getAllUsers());
     }, [dispatch, alert, error, deleteError, isDeleted, navigate, message]);

     const columns = [
          { field: "id", headerName: "User ID", minWidth: 200, flex: 0.5 },
          { field: "email", headerName: "Email", minWidth: 200, flex: 0.5 },
          { field: "name", headerName: "Name", minWidth: 200, flex: 0.5 },
          {
               field: "role",
               headerName: "Role",
               minWidth: 100,
               flex: 0.3,
               cellClassName: (params) => {
                    return params.getValue(params.id, "role") === "admin" ? "greenColor" : "redColor";
               },
          },
          {
               field: "actions",
               headerName: "Actions",
               type: "number",
               minWidth: 150,
               flex: 0.3,
               sortable: false,
               renderCell: (params) => {
                    return (
                         <Fragment>
                              <Link to={`/admin/user/${params.getValue(params.id, "id")}`}>
                                   <EditIcon />
                              </Link>
                              <Button onClick={() => deleteUserHandler(params.getValue(params.id, "id"))}>
                                   <DeleteIcon />
                              </Button>
                         </Fragment>
                    );
               },
          },
     ];

     const rows = [];

     users &&
          users.forEach((item) => {
               rows.push({
                    id: item._id,
                    role: item.role,
                    name: item.name,
                    email: item.email,
               });
          });

     return (
          <Fragment>
               <MetaData title={`All Users - Admin`} />
               <div className="dashboard">
                    <Sidebar />
                    <div className="productListContainer">
                         <h1 className="productListHeading">ALL USERS</h1>

                         <DataGrid
                              rows={rows}
                              columns={columns}
                              pageSize={10}
                              disableSelectionOnClick
                              className="productListTable"
                              autoHeight
                         />
                    </div>
               </div>
          </Fragment>
     );
};

export default UsersList;
