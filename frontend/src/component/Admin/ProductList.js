import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import "./ProductList.css";
import { useSelector, useDispatch } from "react-redux";
import { getAdminProduct, deleteProduct, clearErrors } from "../../actions/productAction";
import { Link, useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from "@mui/material";
import MetaData from "../layout/MetaData";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Sidebar from "./Sidebar";
import { DELETE_PRODUCT_RESET } from "../../constants/productConstacts";

const ProductList = () => {
     const dispatch = useDispatch();
     const alert = useAlert();
     const navigate = useNavigate();

     const { products, error } = useSelector((state) => state.products);

     const { error: deleteError, isDeleted } = useSelector((state) => state.product);

     const deleteProductHandler = (id) => {
          dispatch(deleteProduct(id));
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
               alert.success("Product Deleted Successfully.");
               dispatch({type: DELETE_PRODUCT_RESET});
               navigate("/admin/dashboard");
          }

          dispatch(getAdminProduct());
     }, [dispatch, alert, error, deleteError, isDeleted, navigate]);

     const columns = [
          { field: "id", headerName: "Product ID", minWidth: 200, flex: 0.5 },
          { field: "name", headerName: "Name", minWidth: 200, flex: 0.5 },
          { field: "stock", headerName: "Stock", type: "number", minWidth: 100, flex: 0.3 },
          { field: "price", headerName: "Price", type: "number", minWidth: 100, flex: 0.3 },
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
                              <Link to={`/admin/product/${params.getValue(params.id, "id")}`}>
                                   <EditIcon />
                              </Link>
                              <Button onClick={() => deleteProductHandler(params.getValue(params.id, "id"))}>
                                   <DeleteIcon />
                              </Button>
                         </Fragment>
                    );
               },
          },
     ];

     const rows = [];

     products &&
          products.forEach((item) => {
               rows.push({
                    id: item._id,
                    stock: item.stock,
                    price: item.price,
                    name: item.name,
               });
          });

     return (
          <Fragment>
               <MetaData title={`All Product - Admin`} />
               <div className="dashboard">
                    <Sidebar />
                    <div className="productListContainer">
                         <h1 className="productListHeading">ALL PRODUCTS</h1>

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

export default ProductList;
