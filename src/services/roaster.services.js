
import axiosConfig from "../axiosConfig";

export const get_lg_roster = async (query) => {
    try {
        let query_str = query ? query : '';
        const response = await axiosConfig.get("get_lg_roster" + query_str);
        return response.data;
    } catch (error) {
        throw error
    }
};

export const get_roster_testimonials = async (query) => {
    try {
        let query_str = query ? query : '';
        const response = await axiosConfig.get("get_roster_testimonials" + query_str);
        return response.data;
    } catch (error) {
        throw error
    }
};