import { Document, Model, model, Schema } from "mongoose"
import IConfigLesson from "../Interfaces/ConfigLessons";

const ConfigLessonSchema = new Schema<IConfigLesson>
(
    {

        name: {
            type: String,
            required: true,
            // unique: true
        },

        teacherId: {
            type: String,
            required: true,
        },

        // presence: {
        //     type: Object,
        //     required: true,
        // },

        students: {
            type: Array,
            required: true,
        },

        length: {
            type: String,
            required: true
        },

        min_camera: {
            type: String,
            default: "5m",
        },

        min_streaming: {
            type: String,
            default: "5m",
        },

        min_messages: {
            type: String,
            default: "5",
        },

        min_mobile_time: {
            type: String,
            default: "5m",
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