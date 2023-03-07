import {useState} from 'react';
import { RegisterApi } from '../services/Api';
import { isAuthenticated } from '../services/Auth';
import { storeUserData } from '../services/StorageApi';
import './RegisterPage.css';
import { Link, Navigate } from 'react-router-dom';
import Navbar from '../Componenets/Navbar';

export default function RegisterPage() {
   const initialStateError={
      name:{required:false},
      password:{required:false},
      email:{required:false},
      custom_error:null
   }
   const [errors,setErrors] = useState(initialStateError);//hook function
   const [loading,setloading]=useState(false);

   const [initialinput,setinput]=useState({
      email:"",
      password:"",
      name:""
   })

   const handlesubmit = (event)=>{
      event.preventDefault(); //to avoid loading full page during form submission
      let errors = initialStateError;
      let haserror = false;
      if(initialinput.name === ""){
         errors.name.required=true;
         haserror=true;
      }
      if(initialinput.email === ""){
         errors.email.required=true;
         haserror=true;
      }
      if(initialinput.password === ""){
         errors.password.required=true;
         haserror=true;
      }
      if(haserror===false){
          
         setloading(true)
         //sending register api request
         RegisterApi(initialinput).then((response)=>{
            storeUserData(response.data.idToken);
           
         }).catch((err)=>{ //error handleing
         if(err.response.data.error.message==="EMAIL_EXISTS"){
            setErrors({...errors,custom_error:"Already Email has been registered!"})
         }else if(String(err.response.data.error.message).includes('WEAK_PASSWORD')){
            setErrors({...errors,custom_error:"Password should be at least 6 characters"})
         }
         }).finally(()=>{
            setloading(false)
         })
        
      }
      setErrors({...errors});
   }
  
   const handleinput=(event)=>{//the function is trigred by happening event in form-input
      setinput({...initialinput,[event.target.name]:event.target.value})//to get empty value in input-form during reload page 

   }
   if(isAuthenticated()){  //ture or false
      //redirect user to dasboard
      return <Navigate to="/dashboard"/>
   }

   return(
      <div>
         <Navbar/>
    <section className="register-block">
    <div className="container">
       <div className="row ">
          <div className="col register-sec">
             <h2 className="text-center">Register Now</h2>
             <form onSubmit={handlesubmit} className="register-form" action="" >
              <div className="form-group">
                <label htmlFor="exampleInputEmail1" className="text-uppercase">Name</label>
  
                <input type="text" className="form-control" onChange={handleinput} name="name" id=""  />
                { errors.name.required?
                (<span className="text-danger" >
                    Name is required.
                </span>):null
                }
             </div>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1" className="text-uppercase">Email</label>
  
                <input type="text"  className="form-control" onChange={handleinput} name="email" id=""  />
                {errors.email.required?
                (<span className="text-danger" >
                    Email is required.
                </span>):null
}
             </div>
             <div className="form-group">
                <label htmlFor="exampleInputPassword1" className="text-uppercase">Password</label>
                <input  className="form-control" onChange={handleinput} type="password"  name="password" id="" />
                {errors.password.required?
                (<span className="text-danger" >
                    Password is required.
                </span>):null
}
             </div>
             <div className="form-group">
  
          
                
                <span className="text-danger" >
                {  errors.custom_error?
             (<p>{errors.custom_error}</p>):null
                }
             </span>
           {loading ?
               ( <div  className="text-center">
                  <div className="spinner-border text-primary " role="status">
                   
                    <span className="sr-only">Loading...</span>
                  </div>
                </div>):null
}
                <input type="submit" className="btn btn-login float-right" disabled={loading} value="Register"/>
             </div>
             <div className="clearfix"></div>
             <div className="form-group">
               Already have account ? Please <Link to="/login">Login</Link>
             </div>
  
  
             </form>
  
  
          </div>
  
       </div>
  
  
    </div>
  
    </section>
    </div>
   )
}