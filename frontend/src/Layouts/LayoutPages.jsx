import { Outlet } from "react-router-dom";
import Header from "../components/Header";

export default function LayoutPages() {
    return (
        <>
            <Header />
            <main className="w-full h-[calc(100dvh-60px)] p-5">
                <Outlet />
            </main>
        </>
    );
}
