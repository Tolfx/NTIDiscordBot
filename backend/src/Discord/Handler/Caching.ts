import EventListener from "../../Lib/EventListener";
import Lesson from "../../Models/Lesson";

export default function reCache()
{
    Lesson.find({
        ended: false
    }).then(e => {
        e.forEach(e => {
            EventListener.emit("newLesson", e)
        });
    })
}