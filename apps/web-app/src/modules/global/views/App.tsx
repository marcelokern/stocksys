import { Outlet } from "react-router-dom";
import Header from "../components/header.component";
import { Toaster } from "../../../components/ui/toaster";

const App = () => {

    return (
        <div className="w-full h-full min-h-screen flex flex-col">
            <Toaster />
            <Header />
            <Outlet />
        </div>
    );

};

export default App;