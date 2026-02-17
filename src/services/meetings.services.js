
import axiosConfig from "../axiosConfig";

export const create_meeting = async (formData) => {
    try {
        const response = await axiosConfig.post("create_meeting", formData);
        return response.data;
    } catch (error) {
        throw error
    }
};

export const update_meeting = async (formData) => {
    try {
        const response = await axiosConfig.post("update_meeting", formData);
        return response.data;
    } catch (error) {
        throw error
    }
};

export const get_meeting_detail = async (id) => {
    try {
        const response = await axiosConfig.get("get_meeting_detail/" + id);
        return response.data;
    } catch (error) {
        throw error
    }
};

export const get_upcoming_meetings = async (query) => {
    try {
        let query_str = query ? query : '';
        const response = await axiosConfig.get("get_upcoming_meetings" + query_str);
        return response.data;
    } catch (error) {
        throw error
    }
};

export const get_my_meetings = async (query) => {
    try {
        let query_str = query ? query : '';
        const response = await axiosConfig.get("get_my_meetings" + query_str);
        return response.data;
    } catch (error) {
        throw error
    }
};

export const get_past_meetings = async (query) => {
    try {
        let query_str = query ? query : '';
        const response = await axiosConfig.get("get_past_meetings" + query_str);
        return response.data;
    } catch (error) {
        throw error
    }
};

export const mark_meeting_attendance = async (formData) => {
    try {
        const response = await axiosConfig.post("mark_meeting_attendance", formData);
        return response.data;
    } catch (error) {
        throw error
    }
};

export const SubmitAttendence = async (formData) => {
    try {
        const response = await axiosConfig.post("submit_attendance", formData);
        return response.data;
    } catch (error) {
        throw error
    }
};