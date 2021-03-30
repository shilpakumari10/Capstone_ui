const getHeaders = () => {
    return {
        "Content-Type": "application/json",
        "accept": "application/json"
    };
};


const apiCallGet = async (apiUrl, token = null) => {
    try {
        const apiResponse = await fetch(apiUrl, {
            method: 'GET',
            headers: token == null ? getHeaders() : { ...getHeaders(), "X-ACCESS-TOKEN": token },
            mode: 'cors',
        });
        
        if(apiResponse.status === 403){
            return {statusCode : 403};
        }
        
        let status = apiResponse.ok;

        
        let data = await apiResponse.json();
        if (status) {
            let response = {};
            response['data'] =  data;
            response['statusCode'] = 200;
            return response;
        }
        return data;
    } catch (error) {
        console.log(error);
    }
};

const apiCallPost = async (apiUrl, data, token = null) => {
    try {
        const apiResponse = await fetch(apiUrl, {
            method: 'POST',
            headers: token == null ? getHeaders() : { ...getHeaders(), "X-ACCESS-TOKEN": token },
            mode: 'cors',
            body: JSON.stringify(data)
        });
        
        let status = apiResponse.ok;
        let result = await apiResponse.json();

        if (status) {
            let response = {};
            response['data'] =  result;
            response['statusCode'] = 200;
            return response;
        }
        return result;
        console.log(apiResponse.statusText);
    } catch (error) {
        console.log(error);
    }
};

const apiCallPut = async (apiUrl, data, token = null) => {
    try {
        const apiResponse = await fetch(apiUrl, {
            method: 'PUT',
            headers: token == null ? getHeaders() : { ...getHeaders(), "X-ACCESS-TOKEN": token },
            mode: 'cors',
            body: JSON.stringify(data)
        });
        let status = apiResponse.ok;
        let result = await apiResponse.json();

        if (status) {
            let response = {};
            response['data'] =  result;
            response['statusCode'] = 200;
            return response;
        }
        return result;
        console.log(apiResponse.statusText);
    } catch (error) {
        console.log(error);
    }
};

const apiCallDelete = async (apiUrl, data, token = null) => {
    try {
        const apiResponse = await fetch(apiUrl, {
            method: 'DELETE',
            headers: token == null ? getHeaders() : { ...getHeaders(), "X-ACCESS-TOKEN": token },
            mode: 'cors',
            body: JSON.stringify(data)
        });

        let status = apiResponse.ok;
        let result = await apiResponse.json();

        if (status) {
            let response = {};
            response['data'] =  result;
            response['statusCode'] = 200;
            return response;
        }
        return result;
        console.log(apiResponse.statusText);
    } catch (error) {
        console.log(error);
    }
};

export default {
    apiCallGet,
    apiCallPost,
    apiCallPut,
    apiCallDelete
};