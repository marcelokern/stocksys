import { MainContainerPropsType } from "../types/global.types";

const MainContainer = ({ children }: MainContainerPropsType) => {

    return (

        <main className="flex-grow flex flex-col gap-4 p-8">
            {children}
        </main>

    );

};

export default MainContainer;