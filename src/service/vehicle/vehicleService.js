import HttpUtils from "../HTTPUtils";

let dummyResponse = {
    "timestamp": "2020-08-02 08:23:38",
    "message": "Vehicle Added Successfully",
    "statusCode": 200
};

let dummyVehicles = [
    {
        "vehicleId": 22,
        "vehicleModel": "Audi",
        "vehicleNumber": "JH06AN5799",
        "vehicleSubCategoryId": 1,
        "color": "Blue",
        "fuelTypeId": 1,
        "locationId": 1,
        "carImageUrl": "https://imgd.aeplcdn.com/600x337/cw/ec/33136/BMW-M5-Exterior-172905.jpg?wm=0s=85",
        "availability_status": 1,
        "pricePerDay": 300
    },
    {
        "vehicleId": 23,
        "vehicleModel": "Audi",
        "vehicleNumber": "JH06AN5799",
        "vehicleSubCategoryId": 1,
        "color": "Blue",
        "fuelTypeId": 1,
        "locationId": 1,
        "carImageUrl": "https://imgd.aeplcdn.com/600x337/cw/ec/33136/BMW-M5-Exterior-172905.jpg?wm=0s=85",
        "availability_status": 1,
        "pricePerDay": 300
    },
    {
        "vehicleId": 24,
        "vehicleModel": "Audi",
        "vehicleNumber": "JH06AN5799",
        "vehicleSubCategoryId": 1,
        "color": "Blue",
        "fuelTypeId": 1,
        "locationId": 1,
        "carImageUrl": "https://imgd.aeplcdn.com/600x337/cw/ec/33136/BMW-M5-Exterior-172905.jpg?wm=0s=85",
        "availability_status": 1,
        "pricePerDay": 300
    }
];

let baseUrl = "http://localhost:8012/hirewheels/v1";

const submitRequest = async (data, token) => {
    let url = baseUrl + "/vehicles";
    let response = await HttpUtils.apiCallPost(url, data, token);
    return response;
};

const fetchVehicleByUserId = async (userId, jwtToken) => {
    let url = baseUrl + "/users/" + userId + "/vehicles";
    let response = HttpUtils.apiCallGet(url,jwtToken);
    return dummyVehicles;
}

const fetchVehicles = async (categoryName, pickUpDate, dropDate, locationId, token) => {
    let url = baseUrl + "/vehicles" + "?categoryName=" + categoryName + "&pickUpDate=" + pickUpDate + "&dropDate=" + dropDate + "&locationId=" + locationId;
    let response = await HttpUtils.apiCallGet(url, token);
    
    if(response === undefined)
    {
        return {statusCode : 500};
    }

    return response;
}

const fetchAllVehicles = async (token) => {
    let url = baseUrl + "/vehicles/all";
    let response = await HttpUtils.apiCallGet(url, token);

    if(response === undefined)
    {
        return {statusCode : 500};
    }

    return response;
}

const updateVehicleAvailability = async (vehicleId,data,token) => {
    let url = baseUrl + "/vehicles/" + vehicleId;
    let response = await HttpUtils.apiCallPut(url,data,token);

    if(response === undefined)
    {
        return {statusCode : 500};
    }

    return response; 
}

const editVehicleData = async () => {
    let url = baseUrl + "/vehicles/all";
    let response = await HttpUtils.apiCallGet(url, token);

    if(response === undefined)
    {
        return {statusCode : 500};
    }

    let vehicleData = {
        vehicleModel : response['vehicleModel'],
        vehicleNumber : response['vehicleNumber']
    };

    return vehicleData;
} 

export { submitRequest, fetchVehicleByUserId,fetchVehicles,updateVehicleAvailability,fetchAllVehicles };
