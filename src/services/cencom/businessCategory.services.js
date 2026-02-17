import axiosConfig from "../../axiosConfig";

export const AddBusinessCategory = async (data) => {
    try {
        const response = await axiosConfig.post("cencom/add_business_category", data);
        return response.data;
    } catch (error) {
        throw error
    }
};

export const UpdateBusinessCategory = async (data) => {
    try {
        const response = await axiosConfig.post("cencom/update_business_category", data);
        return response.data;
    } catch (error) {
        throw error
    }
};

export const UpdateBusinessSubCategory = async (data) => {
    try {
        const response = await axiosConfig.post("cencom/update_business_sub_category", data);
        return response.data;
    } catch (error) {
        throw error
    }
};

export const DeleteBusinessCategory = async (data) => {
    try {
        const response = await axiosConfig.post("cencom/del_business_category", data);
        return response.data;
    } catch (error) {
        throw error
    }
};

export const AddBusinessSubCategory = async (data) => {
    try {
        const response = await axiosConfig.post("cencom/add_business_sub_category", data);
        return response.data;
    } catch (error) {
        throw error
    }
};

export const AllBussinessSubCategories = async (data) => {
    try {
        let query_str = data.paginate ? data.paginate : '';
        const response = await axiosConfig.get("get_all_business_sub_categories/"+ data.id + query_str);
        return response.data;
    } catch (error) {
        throw error
    }
};