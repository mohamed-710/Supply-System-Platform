import { SUCCESS, FAILURE, ERROR } from '../utils/HttpStatus.js';
const errorHandler=(error, req, res, next) => {
    res.status(error.statusCode||500).json
    ({
        status: error.statusText||ERROR, 
        message: error.message,
        code:error.statusCode||500,
        data:null
    });
  
};
export default errorHandler;