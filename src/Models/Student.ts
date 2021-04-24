import { Document, Model, model, Schema } from "mongoose"

const StudenSchema = new Schema
(
    {

        discordId: {
            type: String,
            required: true,
        },

        schoolSoftId: {
            type: String,
            required: true,
        },

        fullname: {
            type: String,
            required: true,
        },

    }
);

const Student = model("students", StudenSchema);

export default Student;