import axios from "axios";
const backendURL = import.meta.env.VITE_REACT_APP_API_SERVICE_URL;

// Get all Property list

export const getPropertyList = async (filters) => {
    try {
        // ?city=mumbai
        const query = new URLSearchParams(filters).toString();
        const reqUrl = `${backendURL}/list-properties?${query}`;

        const response = await axios.get(reqUrl);
        return response;
    } catch ( error ) {
        console.log(error);
    }
}

