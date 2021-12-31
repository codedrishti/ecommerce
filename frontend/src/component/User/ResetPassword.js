import React, { Fragment, useState, useEffect } from "react";
import "./ResetPassword.css";
import Loader from "../layout/Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, resetPassword } from "../../actions/userAction";
import { useAlert } from "react-alert";
import { useNavigate, useParams } from "react-router-dom";
import MetaData from "../layout/MetaData";
import LockIcon from "@mui/icons-material/Lock";
import LockOpenIcon from "@mui/icons-material/LockOpen";


const ResetPassword = () => {

     const dispatch = useDispatch();
     const alert = useAlert();
     const navigate = useNavigate();
     const { token } = useParams();

     const { error, success, loading } = useSelector((state) => state.forgotPassword);

     const [password, setPassword] = useState("");
     const [confirmPassword, setConfirmPassword] = useState("");

     const resetPasswordSubmit = (e) => {
          e.preventDefault();

          const myForm = new FormData();

          myForm.set("password", password);
          myForm.set("confirmPassword", confirmPassword);

          dispatch(resetPassword(token, myForm));
     };

     useEffect(() => {

          if (error) {
               alert.error(error);
               dispatch(clearErrors());
          }

          if (success) {
               alert.success("Password Updated Successfully");

               navigate("/login");

          }
     }, [dispatch, error, alert, success, navigate]);

     return (
          <Fragment>
               {loading ? (
                    <Loader />
               ) : (
                    <Fragment>
                         <MetaData title="Change Password" />

                         <div className="resetPasswordContainer">
                              <div className="resetPasswordBox">
                                   <h2 className="resetPasswordHeading">Change Password</h2>
                                   <form
                                        className="resetPasswordForm"
                                        encType="multipart/form-data"
                                        onSubmit={resetPasswordSubmit}
                                   >
                                        <div className="loginPassword">
                                             <LockOpenIcon />
                                             <input
                                                  type="password"
                                                  placeholder="New Password"
                                                  required
                                                  value={password}
                                                  onChange={(e) => setPassword(e.target.value)}
                                             />
                                        </div>

                                        <div className="loginPassword">
                                             <LockIcon />
                                             <input
                                                  type="password"
                                                  placeholder="Confirm Password"
                                                  required
                                                  value={confirmPassword}
                                                  onChange={(e) => setConfirmPassword(e.target.value)}
                                             />
                                        </div>

                                        <input type="submit" value="Update" className="signUpBtn" />
                                        {/* disabled={loading ? true : false} */}
                                   </form>
                              </div>
                         </div>
                    </Fragment>
               )}
          </Fragment>
     )
}

export default ResetPassword;