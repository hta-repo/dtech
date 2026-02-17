
import axiosConfig from "../../axiosConfig";

export const getAllCencomUser = async (data) => {
    try {
        let query_str = data.paginate ? data.paginate : '';
        let league = data.league_ID ? data.league_ID : '';
        const response = await axiosConfig.get("cencom/get_all_users" + data.lgAdmin + query_str + league);
        return response.data;
    } catch (error) {
        throw error
    }
};

export const getUserLeagueApprovalList = async (data) => {
    try {
        let query_str = data ? data.paginate : '';
        const response = await axiosConfig.get("cencom/get_all_users_league_approvel" + query_str);
        return response.data;
    } catch (error) {
        throw error
    }
};

export const userLeagueApproval = async (id) => {
    try {
        const response = await axiosConfig.get("cencom/user_league_approvel/" + id);
        return response.data;
    } catch (error) {
        throw error
    }
};

export const ApproveUser = async (formData) => {
    try {
        const response = await axiosConfig.post("cencom/approve_user", formData);
        return response.data;
    } catch (error) {
        throw error
    }
};

export const MakeLeagueAdmin = async (formData) => {
    try {
        const response = await axiosConfig.post("cencom/make_league_admin", formData);
        return response.data;
    } catch (error) {
        throw error
    }
};

export const UpdateMember = async (formData) => {
    try {
        const response = await axiosConfig.post("cencom/update_member", formData);
        return response.data;
    } catch (error) {
        throw error
    }
};

export const UpdatePoints = async (formData) => {
    try {
        const response = await axiosConfig.post("cencom/update_points", formData);
        return response.data;
    } catch (error) {
        throw error
    }
};

export const CreateNewAdmin = async (formData) => {
    try {
        const response = await axiosConfig.post("cencom/create_New_Admin", formData);
        return response.data;
    } catch (error) {
        throw error
    }
};

export const UpdateAdmin = async (data) => {
    try {
        const response = await axiosConfig.post("cencom/edit_Admin", data);
        return response.data;
    } catch (error) {
        throw error
    }
};

export const DeleteAdmin = async (id) => {
    try {
        const response = await axiosConfig.get("cencom/admin_delete/" + id);
        return response.data;
    } catch (error) {
        throw error
    }
};