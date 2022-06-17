import { useState } from 'react';
import classes from './ProfileForm.module.css';

const ProfileForm = () => {
  const [changePassword,setchangePassword]=useState('')
  const changedPassword=(event)=>{
    setchangePassword(event.target.value)
  }
  const submitHandler = (event) => {
    event.preventDefault();
    const userDetails = {
      password: changePassword,
    };
    console.log(userDetails);
  }
  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control} >
        <label htmlFor='new-password'>New Password</label>
        <input type='password' id='new-password' onChange={changedPassword} />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
