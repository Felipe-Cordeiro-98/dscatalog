export default function Pagination({ currentPage, totalPages, onPageChange, firstPage, lastPage }) {
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

    return (
        <div className="flex items-center gap-2">
            <button
                className={`${firstPage ? "text-[#E1E1E1]" : "text-[#407BFF]"}  text-2xl font-bold cursor-pointer`}
                aria-label="Página anterior"
                disabled={currentPage === 1}
                onClick={() => onPageChange(currentPage - 1)}
            >
                &lt;
            </button>

            {pages.map((n) => (
                <button
                    key={n}
                    onClick={() => onPageChange(n)}
                    className={`w-10 h-10 font-bold rounded-4xl cursor-pointer hover:opacity-85
            ${n === currentPage ? "bg-[#407BFF] text-white" : "bg-gray-200 text-[#407BFF]"}`}
                >
                    {n}
                </button>
            ))}
            <button
                className={`${lastPage ? "text-[#E1E1E1]" : "text-[#407BFF]"} text-2xl font-bold cursor-pointer`}
                aria-label="Próxima página"
                disabled={currentPage === totalPages}
                onClick={() => onPageChange(currentPage + 1)}
            >
                &gt;
            </button>
        </div>
    );
}
