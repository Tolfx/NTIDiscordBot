import { MessageComponent  } from "discord-buttons";
import AW from "../../Lib/Async";
import log from "../../Lib/Logger";


export default async function ButtonHandler(button: MessageComponent)
{
    const [Button, B_Error] = await AW(button);

    if(B_Error)
        return log.error(`Something went wrong while fetching button`, log.trace());

    if(!Button)
        return;

    // console.log(Button)
}