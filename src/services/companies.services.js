
import axiosConfig from "../axiosConfig";
import axios from "axios";

export const GetLeagueCompanies = async (query) => {
    try {
        let query_str = query ? query : '';
        const response = await axiosConfig.get("get_lg_companies" + query_str);
        return response.data;
    } catch (error) {
        throw error
    }
};

export const GetCompanyEvents = async (data) => {
    try {
        let query_str = data.paginate ? data.paginate : '';
        const response = await axiosConfig.get("get_company_events/" + data.id + query_str);
        return response.data;
    } catch (error) {
        throw error
    }
};

export const GetLeagueMembers = async (query) => {
    try {
        let query_str = query ? query : '';
        const response = await axiosConfig.get("get_lg_members" + query_str);
        return response.data;
    } catch (error) {
        throw error
    }
};

export const GetLeagueMembersForGuest = async (meetingID) => {
    try {
        const response = await axiosConfig.get("get_lg_members_for_meeting" + meetingID);
        return response.data;
    } catch (error) {
        throw error
    }
};

export const GetCompanyDetail = async (id) => {
    try {
        const response = await axiosConfig.get("get_company_detail/" + id);
        return response.data;
    } catch (error) {
        throw error
    }
};

export const GetMemebersByLeagID = async (id) => {
    try {
        const response = await axiosConfig.get("get_members_by_lg_id/" + id);
        return response.data;
    } catch (error) {
        throw error
    }
};

export const GetMemebersByCampID = async (id) => {
    try {
        const response = await axiosConfig.get("get_members_by_cmp_id/" + id);
        return response.data;
    } catch (error) {
        throw error
    }
};

export const GetCompanyTestimonials = async (data) => {
    try {
        let query_str = data.paginate ? data.paginate : '';
        const response = await axiosConfig.get("get_company_testimonials/" + data.id + query_str);
        return response.data;
    } catch (error) {
        throw error
    }
};

export const AddCompTestimonials = async (formData) => {
    try {
        const response = await axiosConfig.post("add_testimonial", formData);
        return response.data;
    } catch (error) {
        throw error
    }
};

export const CreateComplaint = async (formData) => {
    try {
        const response = await axiosConfig.post("create_complaint", formData);
        return response.data;
    } catch (error) {
        throw error
    }
};

export const UploadCompanyDetail = async (formData) => {
    try {
        const user = JSON.parse(localStorage.getItem("loggedUser"));
        const response = await axios.post(process.env.REACT_APP_API_URL + "/update_company_detail", formData, {
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
