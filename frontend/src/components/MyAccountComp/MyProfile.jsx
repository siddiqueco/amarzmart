import React, { useState, useEffect } from 'react'
import { Form, Button, Row, Col, Table } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import { getUserDetails, updateUserProfile } from '../../actions/userAction'
import { listMyOrders } from '../../actions/orderAction'
import { toast } from 'react-toastify'


const MyProfile = () => {

   const [name, setName] = useState('')
   const [email, setEmail] = useState('')
   const [password, setPassword] = useState('')
   const [confirmPassword, setConfirmPassword] = useState('')
   const [message, setMessage] = useState(null)

   const dispatch = useDispatch()

   const userDetails = useSelector((state) => state.userDetails)
   const { loading, error, user } = userDetails

   const userLogin = useSelector((state) => state.userLogin)
   const { userInfo } = userLogin

   const userUpdateProfile = useSelector((state) => state.userUpdateProfile)
   const { success } = userUpdateProfile

   const orderListMy = useSelector((state) => state.orderListMy)
   const { loading: loadingOrders, error: errorOrders, orders } = orderListMy


   return (
      <div className="col-md-9">
         <div className="user-account-content-tab">
            <div className="card">
               <div className="card-header">
                  <h5 className="mb-0 h6">Basic Info</h5>
               </div>
               <div className="card-body">
                  <form >
                     <input type="hidden" name="_token" value="GS0rjD2kz7v6wPZHBMOooa01GoRWlNstHxKQnTdU" />
                     <div className="form-group row">
                        <label className="col-md-2 col-form-label">Your Name</label>
                        <div className="col-md-10">
                           <input type="text" className="form-control" placeholder="Your Name" name="name" value={name} required="" />
                        </div>
                     </div>

                     <div className="form-group row">
                        <label className="col-md-2 col-form-label">Email</label>
                        <div className="col-md-10">
                           <input type="text" className="form-control" placeholder="Your Phone" name="phone" value={email} readonly="" />
                        </div>
                     </div>
                     {/* profile photo */}
                     {/* <div className="form-group row">
                        <label className="col-md-2 col-form-label">Photo</label>
                        <div className="col-md-10">
                           <div className="input-group" data-toggle="aizuploader" data-type="image">
                              <div className="input-group-prepend">
                                 <div className="input-group-text bg-soft-secondary font-weight-medium">Browse</div>
                              </div>
                              <div className="form-control file-amount">Choose file</div>
                              <input type="hidden" name="photo" value="" className="selected-files" />
                           </div>
                           <div className="file-preview box sm"></div>
                        </div>
                     </div> */}
                     <div className="form-group row">
                        <label className="col-md-2 col-form-label">Password</label>
                        <div className="col-md-10">
                           <input type="password" className="form-control" placeholder="New Password" name="new_password" />
                        </div>
                     </div>
                     <div className="form-group row">
                        <label className="col-md-2 col-form-label">Confirm Password</label>
                        <div className="col-md-10">
                           <input type="password" className="form-control" placeholder="Confirm Password" name="confirm_password" />
                        </div>
                     </div>

                     <div className="form-group mb-0 text-right">
                        <button type="submit" className="btn btn-primary">Update Profile</button>
                     </div>
                  </form>
               </div>
            </div>

         </div>
      </div>
   )
}

export default MyProfile
