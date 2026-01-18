import AxiosService from './../Services/AxiosService';
export default async function initializeApplication(): Promise<number> {
    const axios = new AxiosService();
    const result = await axios.axiosInstance.get('config.json');
    window.$config = result.data;
    const p = Promise.resolve(1);
    return p;
}
