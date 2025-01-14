import { formatString, toTitleCase } from "@/lib/utils/string-utils"; 

const StatusCell = ({ status }: { status: string }) => {


    var ripple = <></>;
 
    switch (status) { 
        case "INITIATED":
        case "FLAT":
            ripple = <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-200 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-400"></span>
            </span>
            break;
        case "RUNNING":
        case "PUBLIC":
        case "PERCENT":
            case "available":
            ripple = <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-200 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-400"></span>
            </span>
            break;
        case "REJECTED":
        case "PRIVATE":
        case "STOPPED":
            ripple = <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-200 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-400"></span>
            </span>
            break;
        case "DECEASED":
        case "TERMINATED":
            ripple = <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-stone-200 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-stone-400"></span>
            </span>
            break;
        case "NOTICE":
        case "PENDING":
        case "STOPPING":
        case "SHUTTING_DOWN":
            ripple = <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-200 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-400"></span>
            </span>
            break;
    }

    return <>
        <div className="flex flex-row items-center gap-2">
            {ripple}
            {toTitleCase(formatString(status))}
        </div>

    </>;
};

export default StatusCell;