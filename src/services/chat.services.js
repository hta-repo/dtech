
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import axiosConfig from "../axiosConfig";

export const GetChat = async (id) => {
    try {
        const response = await axiosConfig.get("get_chat/"+ id);
        return response.data;
    } catch (error) {
        throw error
    }
};

export const SendMessage = async (formData) => {
    try {
        const user = JSON.parse(localStorage.getItem("loggedUser"));
        const response = await axios.post(process.env.REACT_APP_API_URL + "/send_message", formData, {
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

export const fetchUserAllChats = createAsyncThunk(
    "chat/fetchUserAllChats",
    async () => {
        try {
            const user = JSON.parse(localStorage.getItem("loggedUser"));
            const response = await axios.get(process.env.REACT_APP_API_URL + "/get_user_all_chats", {
                headers: {
                    "Content-Type": "application/json",
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
const allChatsUsers = {};

const initialState = user
    ? { allChatsUsers }
    : { allChatsUsers: null };

const chatUserSlice = createSlice({
    name: "chat",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserAllChats.fulfilled, (state, action) => {
                state.allChatsUsers = action.payload.data;
            })
            .addCase(fetchUserAllChats.rejected, (state) => {
                state.allChatsUsers = null;
            });
    },
});

export default chatUserSlice.reducer;
