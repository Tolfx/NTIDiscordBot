import { Document, Model, model, Types, Schema, Query } from "mongoose"
import { Lesson as ILesson } from "../Interfaces/Lessons";

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

        students: {
            type: Array,
            required: true,
        },

    }
);

const Lesson = model<ILesson>("lesson", LessonSchema);

export default Lesson;