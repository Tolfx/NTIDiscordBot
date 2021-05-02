import { Document, Model, model, Schema } from "mongoose"

interface StudenI extends Document {
    discordId: string;
    schoolSoftId: string;
    fullname: string;
}

const StudenSchema = new Schema
(
    {

        discordId: {
            type: String,
            required: true,
        },

        schoolSoftId: {
            type: String,
        },

        fullname: {
            type: String,
        },

    }
);

const Student = model<StudenI>("students", StudenSchema);

export default Student;