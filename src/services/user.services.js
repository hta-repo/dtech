
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import axiosConfig from "../axiosConfig";

export const logout = (formData) => {
    return axiosConfig.post("/logout", formData);
};

export const UploadProfilePic = async (formData) => {
    try {
        const user = JSON.parse(localStorage.getItem("loggedUser"));
        const response = await axios.post(process.env.REACT_APP_API_URL + "/upload_profile_pic", formData, {
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

export const DeleteProfilePic = async () => {
    try {
        const response = await axiosConfig.delete("delete_profile_pic");
        return response.data;
    } catch (error) {
        throw error
    }
};

export const DeleteAccount = async () => {
    try {
        const response = await axiosConfig.delete("delete_account");
        return response.data;
    } catch (error) {
        throw error
    }
};

export const ChangePassword = async (data) => {
    try {
        const response = await axiosConfig.post("change_password", data);
        return response.data;
    } catch (error) {
        throw error
    }
};

export const UpdateLeagueInfo = async (data) => {
    try {
        const user = JSON.parse(localStorage.getItem("loggedUser"));
        const response = await axios.post(process.env.REACT_APP_API_URL + "/update_league_info", data, {
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

export const UpdateNotificationSettings = async (data) => {
    try {
        const response = await axiosConfig.post("update_notification_settings", data);
        return response.data;
    } catch (error) {
        throw error
    }
};

export const UserLeagueChange = async (id) => {
    try {
        const response = await axiosConfig.get("change_league_request/"+ id);
        return response.data;
    } catch (error) {
        throw error
    }
};

export const fetchUserDetail = createAsyncThunk(
    "auth/fetchUserDetail",
    async () => {
        try {
            const user = JSON.parse(localStorage.getItem("loggedUser"));
            const response = await axios.get(process.env.REACT_APP_API_URL + "/get_user_detail", {
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
    }
);

const user = JSON.parse(localStorage.getItem("loggedUser"));
const loggedUserInfo = {};

const initialState = user
    ? { isLoggedIn: true, loggedUserInfo }
    : { isLoggedIn: false, loggedUserInfo: null };

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserDetail.fulfilled, (state, action) => {
                state.isLoggedIn = true;
                state.loggedUserInfo = action.payload.data;
            })
            .addCase(fetchUserDetail.rejected, (state) => {
                state.isLoggedIn = false;
                state.loggedUserInfo = null;
            });
    },
});

export default authSlice.reducer;
