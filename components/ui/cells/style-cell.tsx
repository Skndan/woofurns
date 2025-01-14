import { formatString, toTitleCase } from "@/lib/utils/string-utils";
import { ChevronDown, Circle, Palette, Radio, RectangleHorizontal, Square, Image } from "lucide-react";

const StyleCell = ({ status }: { status: string }) => {


    var ripple = <></>;

    switch (status) {
        case "RECTANGLE":
            ripple = <RectangleHorizontal className={"size-4"} />
            break;

        case "CIRCLE":
            ripple = <Circle className={"size-4"} />
            break;

        case "RADIO":
            ripple = <Radio className={"size-4"} />
            break;

        case "SQUARE":
            ripple = <Square className={"size-4"} />
            break;

        case "DROPDOWN":
            ripple = <ChevronDown className={"size-4"} />
            break;

        case "IMAGE":
            ripple = <Image className={"size-4"}/>
            break;

        case "COLOR":
            ripple = <Palette className={"size-4"} />
            break;

    }

    return <>
        <div className="flex flex-row items-center gap-2">
            {ripple}
            {toTitleCase(formatString(status))}
        </div>

    </>;
};

export default StyleCell;