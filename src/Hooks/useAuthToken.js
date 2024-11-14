import { useCookies } from 'react-cookie';

const useAuthToken = () => {
    const [cookies] = useCookies(['car_management_user_token']);
    const token = cookies.car_management_user_token.token;
    return token;
};

export default useAuthToken;
