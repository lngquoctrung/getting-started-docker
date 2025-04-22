class ResponseHelper {
    success(status, message, data = null) {
        const response = {
            success: true,
            status: status,
            message: message,
            timestamp: Date.now(),
        }
        if (data) {
            response.data = data;
        }
        return response;
    }

    error(status, errorType, message, errorDetails = null) {
        const response = {
            success: false,
            status: status,
            errorType: errorType,
            message: message,
            timestamp: Date.now(),
        }

        if (errorDetails) {
            response.errorDetails = errorDetails;
        }
        return response;
    }
}

module.exports = new ResponseHelper();