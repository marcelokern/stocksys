import { ChevronUp, Sliders } from "lucide-react";
import { Card } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { FilterContainerComponentPropsType } from "../types/global.types";

const FilterContainer = ({ title, children }: FilterContainerComponentPropsType) => {

    return (

        <Card className="flex flex-col items-start gap-3 p-6 border-b-8">
            <div className="w-full flex flex-row items-center">
                <Sliders className="w-4 h-4 mr-2  text-primary" />
                <h2 className="flex-grow font-semibold">{title}</h2>
                <Button variant={'ghost'}><ChevronUp className="w-4 h-4" /></Button>
            </div>
            <div className="w-full flex flex-row gap-3 items-center">
                {children}
            </div>
        </Card>

    );

};

export default FilterContainer;