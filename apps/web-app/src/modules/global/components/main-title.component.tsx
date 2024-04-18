import { ChevronRight } from "lucide-react";
import { MainTitleComponentPropsType } from "../types/global.types";

const MainTitle = ({ title, buttons }: MainTitleComponentPropsType) => {

    return (

        <div className="flex flex-row items-center mb-4 py-2">
            <div className="flex flex-row flex-1 justify-start">
                {title.map((x, i) => (
                    <>
                        <h1 className="text-4xl font-light flex flex-row items-center">{x}</h1>
                        {i !== title.length - 1 && (<ChevronRight className="mt-3 mx-2 text-primary" />)}
                    </>
                ))}
            </div>
            {buttons && buttons.map(x => x)}
        </div>

    );

};

export default MainTitle;