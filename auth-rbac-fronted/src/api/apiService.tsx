import axios from "axios";

const API_URL="http://localhost:8080/api";

export const userRegister=async(data:any)=>{
    try {
        const response = await axios.post(
            API_URL+"/register",
            data);
            return response;
    }catch(error){
         throw error;
    }
}

export const userLogin=async(data:any)=>{
    try {
        const response=await axios.post(
            API_URL+"/login",
            data
        )
        return response;
    } catch (error) {
        throw error;
    }
}