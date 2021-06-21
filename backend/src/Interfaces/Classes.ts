import { Document} from "mongoose"
import { Student } from "./Lessons";

export interface IClasses extends Document
{
    name: String,
    students: Array<Student>,
}