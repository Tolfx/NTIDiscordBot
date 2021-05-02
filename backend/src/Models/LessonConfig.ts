import { Document, Model, model, Schema } from "mongoose"
import IConfigLesson from "../Interfaces/ConfigLessons";

const ConfigLessonSchema = new Schema
(
    {

        name: {
            type: String,
            required: true,
            unique: true
        },

        teacherId: {
            type: String,
            required: true,
        },

        presence: {
            type: Object,
            required: true,
        },

        students: {
            type: Array,
            required: true,
        },

        length: {
            type: Number,
            required: true
        },

        min_camera: {
            type: Number,
            required: true,
        },

        min_streaming: {
            type: Number,
            required: true,
        },

        min_messages: {
            type: Number,
            required: true,
        },

        min_mobile_time: {
            type: Number,
            required: false,
        },

        hall: {
            type: String,
            required: false,
        },

        logChannel: {
            type: String,
            required: false,
        }

    }
);

const ConfigLesson = model<IConfigLesson>("lessonconfig", ConfigLessonSchema);

export default ConfigLesson;