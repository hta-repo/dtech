
import axiosConfig from "../axiosConfig";

export const CreateLead = async (formData) => {
    try {
        const response = await axiosConfig.post("create_lead", formData);
        return response.data;
    } catch (error) {
        throw error
    }
};

export const GetLeads = async (data) => {
    try {
        let query_str = data.paginate ? data.paginate : '';
        const response = await axiosConfig.get("get_leads" + data.type + query_str);
        return response.data;
    } catch (error) {
        throw error
    }
};
