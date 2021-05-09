import { RunEvent, RunEventSlash } from "./RunEvent";

interface Command
{
    name: string;
    cat: string;
    description: string;
    usage: string;
    run: RunEvent;
    run_slash?: RunEventSlash
}

export default Command