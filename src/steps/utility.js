import {getCarDetails} from "../service/CarDetails/carDetailService";
import {fetchVehicles} from "../service/vehicle/vehicleService";
import {confirmBooking} from "../service/confirmBooking/confirmBookingService";

export const step2Next = async (step,token) => {
    let {pickUpDate, location, dropOffDate} = step;
    let response = await fetchVehicles("CAR",pickUpDate,dropOffDate,location,token);
    if(response['statusCode'] == 200){
        return response['data'];
    }
    return [];
}

export const step4Confirm = async (step, carDetails,userId,token) => {
    let {pickUpDate, location, dropOffDate} = step;
    let {carData, selectedVehicleIndex} = carDetails;
    console.log("Car details :" + carDetails);
    let data = {
        "userId": userId,
        "vehicleId": carData[selectedVehicleIndex].vehicleId,
        "pickupDate": pickUpDate,
        "dropoffDate": dropOffDate,
        "bookingDate": getTodaysDate(),
        "locationId": location,
        "amount": getBookingAmount(pickUpDate,dropOffDate,carData[selectedVehicleIndex].pricePerDay)
    };
    const response = await confirmBooking(data,token);
    return response;
}

export const getTodaysDate = () => {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = yyyy + '-' + mm + '-' + dd;
    return today;
}

export const getBookingDuration = (pickUpDate, dropOffDate) => {
    return Math.ceil((new Date(dropOffDate) - new Date(pickUpDate)) / (1000 * 3600 * 24)) + 1;
}

export const getBookingAmount = (pickUpDate, dropOffDate, pricePerDay) => {
    return getBookingDuration(pickUpDate, dropOffDate) * pricePerDay;
}