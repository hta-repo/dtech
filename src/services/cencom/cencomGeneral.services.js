
import axiosConfig from "../../axiosConfig";


//  Events
export const getAllCencomPendingEvents = async (data) => {
    try {
        let query_str = data.paginate ? data.paginate : '';
        const response = await axiosConfig.get("cencom/get_all_events" + data.status + query_str);
        return response.data;
    } catch (error) {
        throw error
    }
};

export const getAllCencomApprovedEvents = async (data) => {
    try {
        let query_str = data.paginate ? data.paginate : '';
        const response = await axiosConfig.get("cencom/get_all_events" + data.status + query_str);
        return response.data;
    } catch (error) {
        throw error
    }
};

export const ApprovedEvents = async (formData) => {
    try {
        const response = await axiosConfig.post("cencom/approve_event", formData);
        return response.data;
    } catch (error) {
        throw error
    }
};

//  Meetings
export const GetAllCencomPendingMeetings = async (data) => {
    try {
        let query_str = data.paginate ? data.paginate : '';
        const response = await axiosConfig.get("cencom/get_all_meetings" + data.status + query_str);
        return response.data;
    } catch (error) {
        throw error
    }
};

export const GetAllCencomApprovedMeetings = async (data) => {
    try {
        let query_str = data.paginate ? data.paginate : '';
        const response = await axiosConfig.get("cencom/get_all_meetings" + data.status + query_str);
        return response.data;
    } catch (error) {
        throw error
    }
};

export const ApprovedMeetings = async (formData) => {
    try {
        const response = await axiosConfig.post("cencom/approve_meeting", formData);
        return response.data;
    } catch (error) {
        throw error
    }
};

export const CreateRecurringMeeting = async (formData) => {
    try {
        const response = await axiosConfig.post("cencom/create_meeting", formData);
        return response.data;
    } catch (error) {
        throw error
    }
};

export const getAllTestimonials = async (data) => {
    try {
        let query_str = data.paginate ? data.paginate : '';
        const response = await axiosConfig.get("cencom/get_all_testimonials" + data.approval + query_str);
        return response.data;
    } catch (error) {
        throw error
    }
};

export const ApproveTestimonials = async (formData) => {
    try {
        const response = await axiosConfig.post("cencom/approve_testimonials", formData);
        return response.data;
    } catch (error) {
        throw error
    }
};

export const GetAllComplaints = async (data) => {
    try {
        let query_str = data.paginate ? data.paginate : '';
        const response = await axiosConfig.get("cencom/get_all_complaints" + query_str + data.status);
        return response.data;
    } catch (error) {
        throw error
    }
};

export const GetAllRecurringMeeting = async (id) => {
    try {
        const response = await axiosConfig.get("cencom/get_all_rec_meetings/" + id);
        return response.data;
    } catch (error) {
        throw error
    }
};

export const UpdateRecurringMeeting = async (formData) => {
    try {
        const response = await axiosConfig.post("cencom/update_rec_meeting", formData);
        return response.data;
    } catch (error) {
        throw error
    }
};

export const DeleteRecurringMeeting = async (formData) => {
    try {
        const response = await axiosConfig.post("cencom/del_rec_meeting", formData);
        return response.data;
    } catch (error) {
        throw error
    }
};

export const GetAllCencoms = async (query) => {
    try {
        const response = await axiosConfig.get("cencom/get_all_cencoms" + query);
        return response.data;
    } catch (error) {
        throw error
    }
};

export const GetMemeberCountLeagueList = async () => {
    try {
        const response = await axiosConfig.get("cencom/get_mbr_count_league_wise");
        return response.data;
    } catch (error) {
        throw error
    }
};

export const GetCencomStatsbyLeagueID = async (data) => {
    try {
        const response = await axiosConfig.get("cencom/get_stats_league_wise" + data);
        return response.data;
    } catch (error) {
        throw error
    }
};

export const GetLeadActivity = async () => {
    try {
        const response = await axiosConfig.get("cencom/get_leads_activity");
        return response.data;
    } catch (error) {
        throw error
    }
};

export const GetCBRLeagueWise = async () => {
    try {
        const response = await axiosConfig.get("cencom/get_cbr_total_league_wise");
        return response.data;
    } catch (error) {
        throw error
    }
};

export const ChangeComplainStatus = async (data) => {
    try {
        const response = await axiosConfig.post("cencom/complaints_status", data);
        return response.data;
    } catch (error) {
        throw error
    }
};

export const CreateLeague = async (data) => {
    try {
        const response = await axiosConfig.post("cencom/create_league", data);
        return response.data;
    } catch (error) {
        throw error
    }
};

export const LeagueDetail = async (id) => {
    try {
        const response = await axiosConfig.get("cencom/league_detail/" + id);
        return response.data;
    } catch (error) {
        throw error
    }
};