
import axiosConfig from "../axiosConfig";

export const GetNotifications = async (query) => {
    try {
        let query_str = query.paginate ? query.paginate : '';
        const response = await axiosConfig.get("get_notifications" + query.status + query_str);
        return response.data;
    } catch (error) {
        throw error
    }
};

