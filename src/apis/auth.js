import axios from "axios";
const backendURL = import.meta.env.VITE_REACT_APP_API_SERVICE_URL;

//Handle User Login API

export const userLogin = async ( data ) => {
    try {
        const reqUrl = `${backendURL}/login`;
        const response = await axios.post(reqUrl, data);
        return response;
    } catch ( error ) {
        console.log(error);
        return error?.response;
    } 
}

//Handle User SignUp API

export const userSignUp = async ( data ) => {
    try {
        const reqUrl = `${backendURL}/signup`;
        const response = await axios.post(reqUrl, data);
        return response;
    } catch ( error ) {
        console.log(error);
        return error?.response;
    } 
}