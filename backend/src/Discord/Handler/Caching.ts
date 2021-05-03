import EventListener from "../../Lib/EventListener";
import log from "../../Lib/Logger";
import Lesson from "../../Models/Lesson";

export default function reCache()
{
    Lesson.find({
        ended: false
    }).then(e => {
        e.forEach(e => {
            log.warning(`Caching an active lesson which issued at: ${e.issuedAt}`);
            EventListener.emit("newLesson", e)
        });
    })
}