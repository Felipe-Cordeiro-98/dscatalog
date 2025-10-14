import { NavLink, Outlet } from "react-router-dom";

const navLinkStyle = `
    w-full max-w-[270px] h-[50px] flex justify-center items-center text-base font-bold rounded-[100px] 
    lg:justify-start lg:pl-10 lg:border-b lg:border-[#E1E1E1] lg:rounded-none
`;

const navItems = [
    { to: "/admin/products", short: "Produtos", long: "Meus Produtos" },
    { to: "/admin/categories", short: "Categorias", long: "Minhas Categorias" },
    { to: "/admin/users", short: "Usuários", long: "Meus Usuários" },
];

export default function AdminLayout() {
    return (
        <div className="w-full min-h-[calc(100dvh-108px)] lg:flex">
            <div
                className="
                            w-full h-[88px] flex justify-evenly items-center gap-5 px-5 bg-white
                            lg:w-[250px] lg:min-w-[250px] lg:h-[calc(100dvh-108px)] lg:flex-col lg:justify-start lg:gap-0 lg:p-0
                "
            >
                {navItems.map((item) => (
                    <NavLink
                        key={item.to}
                        to={item.to}
                        className={({ isActive }) =>
                            `${navLinkStyle} ${
                                isActive ? "text-[#407BFF] bg-[#407BFF4D]" : "text-[#9E9E9E] bg-[#F2F2F2] lg:bg-white"
                            }`
                        }
                    >
                        <span className="md:hidden">{item.short}</span>
                        <span className="hidden md:block">{item.long}</span>
                    </NavLink>
                ))}
            </div>

            <div className="w-full min-h-full">
                <Outlet />
            </div>
        </div>
    );
}
