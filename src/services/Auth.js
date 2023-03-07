import { getUserData, removeUserData } from "./StorageApi"


export const isAuthenticated =( ) =>{
    return getUserData()!=null?true:false;
}

export const logout = () =>{
    removeUserData();
}