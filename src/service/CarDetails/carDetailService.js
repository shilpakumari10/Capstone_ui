const dummyCarDetails = [{
    "vehicleId": 22,
    "vehicleModel": "Audi",
    "vehicleOwnerId": 11,
    "vehicleOwnerName": "as",
    "vehicleNumber": 3,
    "vehicleSubCategoryId": 1,
    "color": "Blue",
    "fuelType": "sdf",
    "locationId": 1,
    "carImageUrl": "https://images.financialexpress.com/2016/12/Audi-Q3-exterior.jpg",
    "pricePerDay": 200,
    "activityId": 12,
    "requestStatusId": 1
  },
  {
    "vehicleId": 22,
    "vehicleModel": "BMW",
    "vehicleOwnerId": 11,
    "vehicleOwnerName": "as",
    "vehicleNumber": 3,
    "vehicleSubCategoryId": 1,
    "color": "Blue",
    "fuelType": "sdf",
    "locationId": 1,
    "carImageUrl": "https://imgd.aeplcdn.com/600x337/cw/ec/33136/BMW-M5-Exterior-172905.jpg?wm=0s=85",
    "pricePerDay": 200,
    "activityId": 12,
    "requestStatusId": 1
  }];

  const dummyBikeDetails = [{
    "vehicleId": 22,
    "vehicleModel": "KTM",
    "vehicleOwnerId": 11,
    "vehicleOwnerName": "as",
    "vehicleNumber": 3,
    "vehicleSubCategoryId": 4,
    "color": "Blue",
    "fuelType": "sdf",
    "locationId": 1,
    "carImageUrl": "https://imgd.aeplcdn.com/600x600/bw/models/ktm-250-duke-bs-vi20200805125938.jpg",
    "pricePerDay": 200,
    "activityId": 12,
    "requestStatusId": 1
  },
  {
    "vehicleId": 22,
    "vehicleModel": "BMW",
    "vehicleOwnerId": 11,
    "vehicleOwnerName": "as",
    "vehicleNumber": 3,
    "vehicleSubCategoryId": 5,
    "color": "Blue",
    "fuelType": "sdf",
    "locationId": 1,
    "carImageUrl": "https://media.zigcdn.com/media/model/2020/Feb/s-100-rr_360x240.jpg",
    "pricePerDay": 200,
    "activityId": 12,
    "requestStatusId": 1
  }];

export const getCarDetails = async (stepData, category = "CAR") => {
    console.log("inside detail api call - ");
    console.log(category);
    return category === "CAR" ? dummyCarDetails : dummyBikeDetails;
}