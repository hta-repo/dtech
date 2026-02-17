
import axiosConfig from "../axiosConfig";

export const StatsforLeagueAdmin = async (data) => {
    try {
        const response = await axiosConfig.get("get_stats_for_lg_admin" + data);
        return response.data;
    } catch (error) {
        throw error
    }
};