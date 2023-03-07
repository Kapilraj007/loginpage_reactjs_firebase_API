import axios from "axios"
import { getUserData } from "./StorageApi";

axios.defaults.baseURL = "https://identitytoolkit.googleapis.com/v1/";
const API_KEY ="AIzaSyCrdiP9oiQTwvVvHWtGjFTaelWYql-0GMQ";

const Register_url = `accounts:signUp?key=${API_KEY}`;

const Login_Url = `accounts:signInWithPassword?key=${API_KEY}`;

const UserDetails_url=`accounts:lookup?key=${API_KEY}`;
export const RegisterApi = (initialinput) =>{
    let data = {displayName:initialinput.name,email:initialinput.email,password:initialinput.password}
    return axios.post(Register_url,data)
}

export const LoginApi = (initialinput) =>{
    let data = {email:initialinput.email,password:initialinput.password}
    return axios.post(Login_Url,data)
}

export const UserDetailsApi = () =>{
    let data = {idToken:getUserData()}
    return axios.post(UserDetails_url,data)
}