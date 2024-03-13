const { default: axios } = require("axios");

const API_KEY = process.env.NEXT_PUBLIC_STRAPI_API_KEY;

const axiosClient = axios.create({
  baseURL: "https://doctor-appointment-booking-admin.onrender.com/api",
  headers: {
    Authorization: `Bearer ${API_KEY}`,
  }, 
});

const getCategory = () => axiosClient.get("catogories?populate=*");

const getDoctorList = () => axiosClient.get("doctors?populate=*");

const getDoctorByCategory = () =>
  axiosClient.get(
    "/doctors?filters[categories][name][$in]=" + category + "&populate=*"
  );
const getDoctorById = (id) => axiosClient.get("/doctors/" + id + "?populate=*");

const bookAppointment=(data) => axiosClient.post('/appointments', data);

const sendEmail= (data)=> axios.post('/api/sendEmail', data);

const getUserBookinngList= (userEmail)=>axiosClient.get("/appointments?[filters][email] [$eq]=" + userEmail + "&populate[doctor] [populate] [image] [populate] [0]=url&populate=*")


export default {
  getCategory,
  getDoctorList,
  getDoctorByCategory,
  getDoctorById,
  bookAppointment,
  sendEmail,
  getUserBookinngList 
};
