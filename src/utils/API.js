const baseUrl=`${import.meta.env.VITE_BACKEND_URL}/api`
const API_URLS = {
    SIGNUP: `${baseUrl}/auth/user/signup`,
    LOGIN: `${baseUrl}/auth/user/login`,

    ADD_CAR:`${baseUrl}/cars/create_car`,
    DELETE_CAR:`${baseUrl}/cars/delete_car`,
    UPDATE_CAR:`${baseUrl}/cars/update_car`,
    GET_CAR_BY_ID: '/cars/get_car',
    GET_ALL_CARS: '/cars',

};

export default API_URLS;
