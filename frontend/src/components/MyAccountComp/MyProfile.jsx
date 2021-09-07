import React, { useState, useEffect } from 'react'
import { Form, Button, Row, Col, Table } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import { getUserDetails, updateUserProfile } from '../../actions/userAction'
import { listMyOrders } from '../../actions/orderAction'
import { toast } from 'react-toastify'
import Title from '../TitleComp/Title'

const MyProfile = ({history}) => {

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



   useEffect(() => {
      if (!userInfo) {
          history.push('/login')
      } else {
          if (!user.name) {
              dispatch(getUserDetails('profile'))
              dispatch(listMyOrders())
          } else {
              setName(user.name)
              setEmail(user.email)
          }
      }
  }, [dispatch, history, userInfo, user])

   const submitHandler = (e) => {
      e.preventDefault()

      if (password !== confirmPassword) {
         // setMessage('Passwords do not match')
         toast.error('Passwords do not match', {
            position: "top-left",
            autoClose: 1500,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,

         });
      } else {
         dispatch(updateUserProfile({ id: user._id, name, email, password }))
         toast.success('Profile updated 🦄', {
            position: "top-left",
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
         });
         setEmail('')
      }
   }







   return (
      <div className="col-md-9">
         <div className="user-account-content-tab">
            <div className="card">
               <div className="card-header">
                  <Title text='Basic Info'/>
               </div>
               <div className="card-body">
                  <form onSubmit={submitHandler}>
                     <input
                        type="hidden"
                        name="_token"
                        value="GS0rjD2kz7v6wPZHBMOooa01GoRWlNstHxKQnTdU"
                     />
                     <div className="form-group row">
                        <label className="col-md-2 col-form-label">Your Name</label>
                        <div className="col-md-10">
                           <input
                              type="text"
                              className="form-control"
                              placeholder="Your Name"
                              name="name" value={name}
                              required=""
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                           />
                        </div>
                     </div>
                     <div className="form-group row">
                        <label className="col-md-2 col-form-label">New Email</label>
                        <div className="col-md-10">
                           <input
                              type="text"
                              className="form-control"
                              placeholder='New email here '
                              name="email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                           />
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
                           <input
                              type="password"
                              className="form-control"
                              placeholder="New Password"
                              name="new_password"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                           />
                        </div>
                     </div>
                     <div className="form-group row">
                        <label className="col-md-2 col-form-label">Confirm Password</label>
                        <div className="col-md-10">
                           <input
                              type="password"
                              className="form-control"
                              placeholder="Confirm Password"
                              name="confirm_password"
                              value={confirmPassword}
                              onChange={(e) => setConfirmPassword(e.target.value)}
                           />
                        </div>
                     </div>

                     <div className="form-group mb-0 text-right">
                        <button type="submit" className="btn btn-primary">
                           Update Profile
                        </button>
                     </div>
                  </form>
               </div>
            </div>

         </div>
      </div>
   )
}

export default MyProfile
