import { Request, Response } from "express";

function API_Error(response: Object, status?: number, error_code?: number)
{
    return (res: Response) =>
    {
        let result = {
            status: status ? status : 400,
            type: "error",
            message: response
        };
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('X-Powered-By', 'Tolfx Inc');
        return res.status(status ? status : 400).json(result);
    }
}

function API_Success(response: Object, status?: number)
{
    return (res: Response) =>
    {
        let result = {
            status: status ? status : 200,
            type: "success",
            message: response
        };
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('X-Powered-By', 'Tolfx Inc');
        return res.status(status ? status : 200).json(result);
    }
}

const API_Responses = {
    API_Error,
    API_Success
}

export default API_Responses;