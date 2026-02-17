
import axiosConfig from "../axiosConfig";

const getAllDestinations = () => {
    return axiosConfig.get("/get_all_designations");
};

const getAllLeagues = (query) => {
    let query_str = query ? query.paginate : '';
    return axiosConfig.get("cencom/league_list" + query_str);
};

const UpdateLeague = (data) => {
    return axiosConfig.post("cencom/update_league", data);
};

// const getAllLeagues = () => {
//     return axiosConfig.get("/get_all_leagues");
// };

const getAllCompanies = () => {
    return axiosConfig.get("/get_all_companies");
};

const getAllBusinessCategories = (query) => {
    let query_str = query.paginate ? query.paginate : '';
    let status = query.status ? query.status : '';
    return axiosConfig.get("/get_all_business_categories" + query_str + status);
};

const getAllBusinessSubCategories = (data) => {
    return axiosConfig.post("/get_all_sub_subsub_categories", data);
};

const getCompaniesByLeagueID = (id) => {
    return axiosConfig.get("/get_companies_by_league_id/" + id);
};

const CheckCmpName = (data) => {
    return axiosConfig.post("/check_cmp_name", data);
};

const getAllOfficeTypes = () => {
    return axiosConfig.get("/get_all_office_types");
};

const getAllLicenseTypes = () => {
    return axiosConfig.get("/get_all_license_types");
};

const getLeaderBoard = (data) => {
    let query_str = data.paginate ? data.paginate : '';
    let league_id = data.leagueID ? data.leagueID : '';
    return axiosConfig.get("/get_leaderboard" + query_str + league_id);
};

const getPoints = (data) => {
    let query_str = data.paginate ? data.paginate : '';
    let id = data.user_id ? data.user_id : '';
    return axiosConfig.get("/get_points" + query_str + id);
};

const GeneralService = {
    getAllDestinations,
    getAllLeagues,
    getAllCompanies,
    getCompaniesByLeagueID,
    getAllOfficeTypes,
    getAllLicenseTypes,
    getLeaderBoard,
    getPoints,
    getAllBusinessCategories,
    getAllBusinessSubCategories,
    CheckCmpName,
    UpdateLeague,
};

export default GeneralService;