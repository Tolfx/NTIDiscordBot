import { Document, Model, model, Types, Schema, Query } from "mongoose"
import { IClasses } from "../Interfaces/Classes";

const ClassesSchema = new Schema<IClasses>
(
    {

        name: {
            type: String,
            required: true,
        },

        students: {
            type: Array,
            required: true,
        },

    }
);

const Classes = model<IClasses>("classes", ClassesSchema);

export default Classes;