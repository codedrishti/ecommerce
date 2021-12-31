import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import "./ProductList.css";
import { useSelector, useDispatch } from "react-redux";
import { getAllOrders, deleteOrder, clearErrors } from "../../actions/orderAction";
import { Link, useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from "@mui/material";
import MetaData from "../layout/MetaData";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Sidebar from "./Sidebar";
import { DELETE_ORDER_RESET } from "../../constants/orderConstants";

const OrderList = () => {
     const dispatch = useDispatch();
     const alert = useAlert();
     const navigate = useNavigate();

     const { orders, error } = useSelector((state) => state.allOrders);

     const { error: deleteError, isDeleted } = useSelector((state) => state.order);

     const deleteOrderHandler = (id) => {
          dispatch(deleteOrder(id));
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
               alert.success("Order Deleted Successfully.");
               dispatch({type: DELETE_ORDER_RESET});
               navigate("/admin/orders");
          }

          dispatch(getAllOrders());
     }, [dispatch, alert, error, deleteError, isDeleted, navigate]);

     const columns = [
          {field: "id", headerName: "Order ID", minWidth: 250, flex: 0.5},
          {field: "status", headerName: "Status", minWidth: 100, flex: 0.3, 
               cellClassName: (params) => {
                    return(
                         params.getValue(params.id, "status") === "Delivered"
                         ? "greenColor"
                         : "redColor"
                    );
               }
          },
          {field: "itemsQty", headerName: "Items Qty", type: "number", minWidth: 150, flex: 0.4},
          {field: "amount", headerName: "Amount", type: "number", minWidth: 270, flex: 0.5},
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
                              <Link to={`/admin/order/${params.getValue(params.id, "id")}`}>
                                   <EditIcon />
                              </Link>
                              <Button onClick={() => deleteOrderHandler(params.getValue(params.id, "id"))}>
                                   <DeleteIcon />
                              </Button>
                         </Fragment>
                    );
               },
          },
     ];

     const rows = [];

     orders &&
          orders.forEach((item) => {
               rows.push({
                    id: item._id,
                    itemsQty: item.orderItems.length,
                    amount: item.totalPrice,
                    status: item.orderStatus,
               });
          });

     return (
          <Fragment>
               <MetaData title={`All Orders - Admin`} />
               <div className="dashboard">
                    <Sidebar />
                    <div className="productListContainer">
                         <h1 className="productListHeading">ALL ORDERS</h1>

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

export default OrderList;
