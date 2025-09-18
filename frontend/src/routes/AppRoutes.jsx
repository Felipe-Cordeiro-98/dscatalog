import { Routes, Route } from "react-router-dom";
import LayoutPages from "../Layouts/LayoutPages";
import Home from "../pages/Home";
import Catalog from "../pages/Catalog";

export default function AppRoutes() {
    return (
        <Routes>
            <Route element={<LayoutPages />}>
                <Route path="/" element={<Home />} />
                <Route path="/catalog" element={<Catalog />} />
            </Route>
        </Routes>
    );
}
