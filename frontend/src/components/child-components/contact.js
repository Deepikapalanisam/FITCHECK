import React, { useState } from 'react';
import logo from '../../images/logo.png';
import axios from 'axios';
import { MdReportProblem, MdEmail, MdOutlineMailLock } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";

const Contact = () => {
  const [resetPasswordEmail, setResetPasswordEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [updateEmailData, setUpdateEmailData] = useState({
    oldEmail: '',
    newEmail: '',
    password: ''
  });
  const [activeModal, setActiveModal] = useState(null);

  const handleMailUs = () => {
    window.location.href = 'mailto:todharanishsl.22it@kongu.edu';
  };

  const handleResetPassword = async () => {
    if (newPassword !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    try {
      const response = await axios.post('/api/reset-password', {
        email: resetPasswordEmail,
        newPassword: newPassword
      });
      alert(response.data.message);
      setActiveModal(null);
    } catch (error) {
      alert(error.response?.data?.message || 'Password reset failed');
    }
  };

  const handleUpdateEmail = async () => {
    try {
      const response = await axios.post('/api/update-email', updateEmailData);
      alert(response.data.message);
      setActiveModal(null);
    } catch (error) {
      alert(error.response?.data?.message || 'Email update failed');
    }
  };

  const renderResetPasswordModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg">
        <h2 className="text-2xl mb-4">Reset Password</h2>
        <input
          type="email"
          placeholder="Enter your email"
          className="w-full border p-2 mb-4"
          value={resetPasswordEmail}
          onChange={(e) => setResetPasswordEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="New Password"
          className="w-full border p-2 mb-4"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          className="w-full border p-2 mb-4"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <div className="flex justify-between">
          <button 
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={handleResetPassword}
          >
            Reset Password
          </button>
          <button 
            className="bg-gray-300 px-4 py-2 rounded"
            onClick={() => setActiveModal(null)}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );

  const renderUpdateEmailModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg">
        <h2 className="text-2xl mb-4">Update Email</h2>
        <input
          type="email"
          placeholder="Old Email"
          className="w-full border p-2 mb-4"
          value={updateEmailData.oldEmail}
          onChange={(e) => setUpdateEmailData({...updateEmailData, oldEmail: e.target.value})}
        />
        <input
          type="email"
          placeholder="New Email"
          className="w-full border p-2 mb-4"
          value={updateEmailData.newEmail}
          onChange={(e) => setUpdateEmailData({...updateEmailData, newEmail: e.target.value})}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full border p-2 mb-4"
          value={updateEmailData.password}
          onChange={(e) => setUpdateEmailData({...updateEmailData, password: e.target.value})}
        />
        <div className="flex justify-between">
          <button 
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={handleUpdateEmail}
          >
            Update Email
          </button>
          <button 
            className="bg-gray-300 px-4 py-2 rounded"
            onClick={() => setActiveModal(null)}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {activeModal === 'resetPassword' && renderResetPasswordModal()}
      {activeModal === 'updateEmail' && renderUpdateEmailModal()}
      
      <div className='w-full h-full pb-10'>
        <div className='bg-black w-full h-16 flex justify-center items-center'>
          <img src={logo} alt='loading' className="h-10" />
          <h1 className='text-white text-2xl'>| Help Center</h1>
        </div>
        <div className='w-full flex flex-col p-10 space-y-2'>
          <h1 className='text-3xl font-bold pb-3'>Contact us</h1>
          <h1>Tell us more and we'll find the best solution for you</h1>
          <input 
            className='border-2 w-1/2 border-gray-500 py-2 px-8 outline-none hover:border-gray-700'
            type='text' 
            placeholder='Describe your issue' 
          />
        </div>
        <div className='w-full flex flex-col px-10 space-y-2'>
          <h1 className='text-xl font-bold pb-3'>Quick Links</h1>
          <div className='px-16 space-y-6'>
            <hr className='border-gray-700' />
            <h1 
              className='font-bold flex items-center gap-3 cursor-pointer hover:text-custom-red'
              onClick={handleMailUs}
            >
              <MdEmail className='text-xl' />Mail us
            </h1>
            <hr className='border-gray-700' />
            <h1 
              className='font-bold flex items-center gap-3 cursor-pointer hover:text-custom-red'
              onClick={() => setActiveModal('resetPassword')}
            >
              <RiLockPasswordFill className='text-xl' />Reset Password
            </h1>
            <hr className='border-gray-700' />
            <h1 
              className='font-bold flex items-center gap-3 cursor-pointer hover:text-custom-red'
              onClick={() => setActiveModal('updateEmail')}
            >
              <MdOutlineMailLock className='text-xl' />Update email
            </h1>
            <hr className='border-gray-700' />
          </div>
        </div>
        <div className='w-full flex flex-col py-10 px-10 space-y-2'>
          <h1 className='text-xl text-blue-700 font-bold pb-3'>Your Feedback Improves Our Product</h1>
          <input 
            className='border-2 border-gray-400 hover:border-gray-600 outline-none p-5'
            type='text' 
            placeholder='Enter your Suggestions' 
          />
          <div className='flex items-center justify-center'>
            <button className='bg-sky-700 w-36 h-12 rounded-lg hover:text-white hover:scale-105 hover:bg-blue-950 transition-all duration-150'>
              Send Feedback
            </button>
          </div>
        </div>
        <div className='flex justify-center items-center space-x-5'>
          <h1 className='text-5xl hover:scale-110 cursor-pointer'>😞</h1>
          <h1 className='text-5xl hover:scale-110 cursor-pointer'>☹️</h1>
          <h1 className='text-5xl hover:scale-110 cursor-pointer'>😌</h1>
          <h1 className='text-5xl hover:scale-110 cursor-pointer'>🤗</h1>
          <h1 className='text-5xl hover:scale-110 cursor-pointer'>🤩</h1>
        </div>
      </div>
    </>
  );
};

export default Contact;