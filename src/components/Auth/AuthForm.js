import { useContext, useState } from "react";
import AuthContext from "../../store/auth-context";

import classes from "./AuthForm.module.css";

const AuthForm = () => {
  const authCtx=useContext(AuthContext) 
  const [isLogin, setIsLogin] = useState(true);
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };
  const emailHandler = (event) => {
    setUserEmail(event.target.value);
  };
  const passwordHandler = (event) => {
    setUserPassword(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const userDetails = {
      email: userEmail,
      password: userPassword,
    };
    let url
    if (isLogin) {
 url='https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDL_W5VAq668IdRTWwQD9rgV5yKL-F10TY'
    } else {
      url="https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDL_W5VAq668IdRTWwQD9rgV5yKL-F10TY"
      };
      fetch(
        url,
           {
             method: "POST",
             body: JSON.stringify({
               email: userDetails.email,
               password: userDetails.password,
               returnSecureToken: true,
             }),
             headers: {
               "Content-Type": "application/json",
             },
           }
         ).then((response) =>{
           if (response.ok) {
             return response.json()
           }
           else{
             return response.json().then((data)=>{
               let errorMessage='Authentication failed'
               throw new Error(errorMessage);
             })
           }
          
         }).then((data)=>{
         authCtx.login(data.idToken)


         }).catch(error=>{
          alert(error.message)
         })
  
    
    console.log(userDetails);
  };
  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" required onChange={emailHandler} />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input
            type="password"
            id="password"
            required
            onChange={passwordHandler}
          />
        </div>
        <div className={classes.actions}>
          <button>{isLogin ? "Login" : "Create Account"}</button>
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
