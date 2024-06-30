import { BrowserRouter, Route, Routes } from "react-router-dom";
import AddPage from "./pages/Add/Add";
import App from "./App";
import EditPage from "./pages/Edit/Edit";

const AppRoutes = () => {
    return ( 
        <BrowserRouter>
            <Routes>
                <Route Component={App} path="/"/>
                <Route Component={AddPage} path="/add"/>
                <Route Component={EditPage} path="/edit/:addressPlanet/:id" />
            </Routes>
        </BrowserRouter>
     );
}
 
export default AppRoutes;