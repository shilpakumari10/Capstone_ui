import HttpUtils from "../HTTPUtils";
let baseUrl = "http://localhost:8012/hirewheels/v1";
export const confirmBooking = async (data, token) => {
    console.log("Confirm Booking");

    let url = baseUrl + "/bookings";
    let response = await HttpUtils.apiCallPost(url, data, token);
    return response; 
}