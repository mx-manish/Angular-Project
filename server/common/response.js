/**
 * 
 * @param { number } code Response Code
 * @param { string } message - Message of response.
 * @param { data } data - Data to be send
 * @param { Response } res - Response Object
 */
function sendResponse(code, message, data, res) {
    const respData = {
        code,
        message,
        data
    }
    res.send(respData);
};

module.exports.sendResponse = sendResponse;