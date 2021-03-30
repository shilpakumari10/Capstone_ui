
import HttpUtils from "../HTTPUtils";
const dummyLoginData = {
    "userId": 1,
    "firstName": "Upgrad",
    "lastName": "Admin",
    "email": "upgrad@gmail.com",
    "password": null,
    "mobileNo": "7091384337",
    "walletMoney": 10000,
    "roleName": "Admin",
    "jwtToken": "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cGdyYWRAZ21haWwuY29tIiwiaWF0IjoxNTk2MzU2NDI0LCJleHAiOjE1OTYzNTcwMjR9.pZUDC6JgTEFizqmPv11RSTOpfUSA4_rJI6B_KF56DG4"
};

const dummySignUp = {
    "timestamp": "2020-08-02 08:11:21",
    "message": "User Successfully Signed Up",
    "statusCode": 200
};

let baseUrl = "http://localhost:8012/hirewheels/v1/users";

const loginService = async (email, password) => {
    let url = baseUrl + "/access-token";
    let data = {
        email: email,
        password: password
    };
    let response = await HttpUtils.apiCallPost(url,data);
    if(response !== undefined && response.statusCode === 200){
        localStorage.setItem("hirewheels-user",JSON.stringify(response['data']));
        return response;
    }

    if(response == undefined){
        return {statusCode : 500};
    }

    return response;
};

const signUpService = async (signUpRequest) => {
    let url = baseUrl;
    let response = await HttpUtils.apiCallPost(url,signUpRequest);

    if(response == undefined){
        return {statusCode : 500};
    }
    
    return response;
};

export { loginService, signUpService };