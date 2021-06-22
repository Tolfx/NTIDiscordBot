import { Response } from "express";

function API_Error(response: Object, status?: number)
{
    return (res: Response) =>
    {
        let result = {
            status: status ? status : 400,
            type: "error",
            message: response
        };
        return res.status(status ?? 400).json(result);
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
        return res.status(status ?? 200).json(result);
    }
}

const API_Responses = {
    API_Error,
    API_Success
}

export default API_Responses;