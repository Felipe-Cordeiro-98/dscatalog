import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function PublicLayout() {
    return (
        <>
            <Header />

            <main className="w-full min-h-[calc(100dvh-108px)] p-5 relative">
                <Outlet />
            </main>
            
            <Footer />
        </>
    );
}
