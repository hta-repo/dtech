
import axiosConfig from "../axiosConfig";

const register = async (data) => {
    try {
        const response = await axiosConfig.post("register", data);
        return response.data;
    } catch (error) {
        throw error
    }
};

const GuestRegister = async (data) => {
    try {
        const response = await axiosConfig.post("guest_register", data);
        return response.data;
    } catch (error) {
        throw error
    }
};

const verify_otp = async (value) => {
    try {
        const response = await axiosConfig.post("verify_otp", value);
        return response.data;
    } catch (error) {
        throw error
    }
};

const guest_verify_otp = async (value) => {
    try {
        const response = await axiosConfig.post("guest_verify_otp", value);
        if (response.data.status) {
            localStorage.setItem("loggedUser", JSON.stringify(response.data.data));
        }
        return response.data;
    } catch (error) {
        throw error
    }
};

const login = async (data) => {
    try {
        const response = await axiosConfig.post("login", data);
        if (response.data.status) {
            localStorage.setItem("loggedUser", JSON.stringify(response.data.data));
        }
        return response.data;
    } catch (error) {
        throw error
    }
};
const guestLogin = async (data) => {
    try {
        const response = await axiosConfig.post("guest_login", data);
        if (response.data.status) {
            localStorage.setItem("loggedUser", JSON.stringify(response.data.data));
        }
        return response.data;
    } catch (error) {
        throw error
    }
};

const forget_password = async (value) => {
    try {
        const response = await axiosConfig.post("forget_password", value);
        return response.data;
    } catch (error) {
        throw error
    }
};

const reset_password = async (data) => {
    try {
        const response = await axiosConfig.post("reset_password", data);
        return response.data;
    } catch (error) {
        throw error
    }
};

const social_login = async (data) => {
    try {
        const response = await axiosConfig.post("social_login", data);
        return response.data;
    } catch (error) {
        throw error
    }
};

const resend_otp = async (data) => {
    try {
        const response = await axiosConfig.post("resend_otp", data);
        return response.data;
    } catch (error) {
        throw error
    }
};

const authService = {
    register,
    GuestRegister,
    verify_otp,
    guest_verify_otp,
    login,
    guestLogin,
    forget_password,
    reset_password,
    social_login,
    resend_otp,
};

export default authService;
