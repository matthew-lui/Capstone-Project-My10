import React, { useState } from "react";
import {useNavigate} from 'react-router-dom'

function SignUp({onSignUp}) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [profile_pic, setProfilePic] = useState("");
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
// console.log(errors)

let navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    setErrors([]);
    setIsLoading(true);
    fetch("/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
        password_confirmation: passwordConfirmation,
        profile_pic: profile_pic,
      }),
    }).then((r) => {
      setIsLoading(false);
      if (r.ok) {
        r.json().then((user) => onSignUp(user),
        navigate('/'));
      } else {
        r.json().then((err) => {
          console.log(err)
          setErrors(err.error) 
          
        });
        
      
      }
    });
  }

  return (
    <div>
    <div className="signup-form-container">
    <form className="signup-form" onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label>
        <input
          className="input-field"
          type="text"
          id="username"
          autoComplete="off"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
  
      
        <label htmlFor="password">Password</label>
        <input
          className="input-field"
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
        />
  

        <label htmlFor="password_confirmation">Password Confirmation</label>
        <input
          className="input-field"
          type="password"
          id="password_confirmation"
          value={passwordConfirmation}
          onChange={(e) => setPasswordConfirmation(e.target.value)}
          autoComplete="current-password"
        />
    
        <label htmlFor="profile_pic">Profile Picture URL</label>
        <input
          className="input-field"
          type="text"
          id="profile_pic"
          value={profile_pic}
          onChange={(e) => setProfilePic(e.target.value)}
        />
    

        <button className="btn btn-primary" type="submit">{isLoading ? "Loading..." : "Sign Up"}</button>

        {errors.map((err) => (
          <div key={err}>{err}</div>
        ))}

    </form>
    </div>
    </div>
  );
}

export default SignUp;