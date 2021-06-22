import { model, Schema } from "mongoose"
import { ILesson } from "../Interfaces/Lessons";

const LessonSchema = new Schema
(
    {

        teacherId: {
            type: String,
            required: true,
        },

        mainChannel: {
            type: String,
            required: true,
        },

        subChannels: {
            type: Array,
            default: []
        },

        issuedAt: {
            type: Date,
            defualt: Date.now,
        },

        endsAt: {
            type: Date,
            required: true,
        },

        ended: {
            type: Boolean,
        },

        break: {
            type: Boolean,
        },

        breaks: {
            type: Array,
        },

        students: {
            type: Array,
            required: true,
        },

    }
);

const Lesson = model<ILesson>("lesson", LessonSchema);

export default Lesson;