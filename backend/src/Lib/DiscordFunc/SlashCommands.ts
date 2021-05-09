const Start_Lesson_Command = {
    "name": "start_lesson",
    "description": "Starts a lesson",
    "options": [
        {
            "type": 3,
            "name": "time",
            "description": "How long is the lesson?",
            "default": false,
            "required": true
        }
    ]
}

const End_Lesson_Command = {
    "name": "end_lesson",
    "description": "Ends an active lesson",
}

const Absence_Command =
{
    "name": "absence",
    "description": "Shows absence of mentioned user",
    "options": [
      {
        "type": 6,
        "name": "user",
        "description": "The user who you want to check absence on",
        "default": false,
        "required": true
      }
    ]
}

const SlashCommandsArray = [End_Lesson_Command, Start_Lesson_Command, Absence_Command]

export default SlashCommandsArray;