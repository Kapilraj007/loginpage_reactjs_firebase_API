import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import Navbar from '../Componenets/Navbar';
import { LoginApi } from '../services/Api';
import { isAuthenticated } from '../services/Auth';
import { storeUserData } from '../services/StorageApi';
import './LoginPage.css';

export default function LoginPage(){

    const initialStateError ={
        email:{required:false},
        password:{required:false},
        custom_error:null
    }
    const [errors,setErrors]=useState(initialStateError);

    const [loading,setloading]=useState(false);
   
    const [initialinput,setinput]=useState({
    email:"",
    password:""
   })
   
    const handlesubmit = (event)=>{
        event.preventDefault();
        let errors = initialStateError;
        let haserror=false;
        if(initialinput.email===""){
            errors.email.required=true;
            haserror=true;
        }
        if(initialinput.password===""){
            errors.password.required=true;
            haserror=true;
        }
        
        if(haserror===false){
            setloading(true)
            LoginApi(initialinput).then((response)=>{
                storeUserData(response.data.idToken);
            
            }).catch((err)=>{
                if(err.code==="ERR_BAD_REQUEST"){
                    setErrors({...errors,custom_error:"Invalid Credenials."})
                }
                

            }).finally(()=>{
                setloading(false)
            })
        }
        setErrors({...errors});//error filled data
    }
    const handleinput =(event)=>{
        setinput({...initialinput,[event.target.name]:event.target.value})
    }
    if(isAuthenticated()){
        return < Navigate to="/dashboard"/>
    }
    return (
        <div>
            <Navbar/>
        <section className="login-block">
            <div className="container">
                <div className="row ">
                    <div className="col login-sec">
                        <h2 className="text-center">Login Now</h2>
                        <form onSubmit={handlesubmit} className="login-form" action="">
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1" className="text-uppercase">Email</label>
                            <input type="email" onChange={handleinput} className="form-control" name="email"  id="" placeholder="email"  />
                            { errors.email.required?
                            (<span className="text-danger" >
                                Email is required.
                            </span>):null
                            }
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputPassword1" className="text-uppercase">Password</label>
                            <input  className="form-control" onChange={handleinput} type="password"  name="password" placeholder="password" id="" />
                            {errors.password.required?
                            (<span className="text-danger" >
                                Password is required.
                            </span>):null
                            }
                        </div>
                        <div className="form-group">
                            {loading?
                            (<div  className="text-center">
                                <div className="spinner-border text-primary " role="status">
                                <span className="sr-only">Loading...</span>
                                </div>
                            </div>):null
}
                            <span className="text-danger" >
                            {errors.custom_error?
                            (<p>{errors.custom_error}</p>):null
                            }
                            </span>
                            <input  type="submit" disabled={loading} className="btn btn-login float-right"  value="Login"/>
                        </div>
                        <div className="clearfix"></div>
                        <div className="form-group">
                        Create new account ? Please <Link to="/register">Register</Link>
                        </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
        </div>

    )

    
}