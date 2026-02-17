
import axiosConfig from "../axiosConfig";
import axios from "axios";

export const CreateEvent = async (formData) => {
    try {
        const user = JSON.parse(localStorage.getItem("loggedUser"));
        const response = await axios.post(process.env.REACT_APP_API_URL + "/create_event", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
                "Accept": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Authorization": "Bearer " + user.token,
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const UpdateEvent = async (formData) => {
    try {
        const user = JSON.parse(localStorage.getItem("loggedUser"));
        const response = await axios.post(process.env.REACT_APP_API_URL + "/update_event", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
                "Accept": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Authorization": "Bearer " + user.token,
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const GetMyEvents = async (query) => {
    try {
        let query_str = query ? query : '';
        const response = await axiosConfig.get("get_my_events" + query_str);
        return response.data;
    } catch (error) {
        throw error
    }
};

export const GetUpcomingEvents = async (query) => {
    try {
        let query_str = query ? query : '';
        const response = await axiosConfig.get("get_upcoming_events" + query_str);
        return response.data;
    } catch (error) {
        throw error
    }
};

export const GetPastEvents = async (query) => {
    try {
        let query_str = query ? query : '';
        const response = await axiosConfig.get("get_past_events" + query_str);
        return response.data;
    } catch (error) {
        throw error
    }
};

export const GetEventDetail = async (id) => {
    try {
        const response = await axiosConfig.get("get_event_detail/" + id);
        return response.data;
    } catch (error) {
        throw error
    }
};

export const RegisterForEvents = async (formData) => {
    try {
        const response = await axiosConfig.post("register_for_event", formData);
        return response.data;
    } catch (error) {
        throw error
    }
};
