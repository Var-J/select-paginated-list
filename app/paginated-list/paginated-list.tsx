import { useState } from "react";

export default function PaginatedList() {
    const [page, setPage] = useState(1);
    const [selected, setSelected] = useState<number[]>([]);
    const [showMenu, setShowMenu] = useState(false);

    const visibleItems = 10;
    const totalPages = Math.ceil(dummyData.length / visibleItems);

    const startIndex = (page - 1) * visibleItems;
    const endIndex = startIndex + visibleItems;
    const currentItems = dummyData.slice(startIndex, endIndex);

    // Toggle single item
    const toggleItem = (id: number) => {
        setSelected((prev) =>
            prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
        );
    };

    // Select options
    const selectAllPages = () => setSelected(dummyData.map((item) => item.id));

    const selectThisPage = () => {
        setSelected((prev) => {
            const idsOnPage = currentItems.map((item) => item.id);
            // Add new ids but avoid duplicates
            const merged = new Set([...prev, ...idsOnPage]);
            return Array.from(merged);
        });
    };

    const selectNone = () => setSelected([]);

    return (
        <div className="max-w-md mx-auto p-4">
            <h1 className="text-xl font-bold mb-4">Paginated List</h1>

            {/* Dropdown */}
            <div className="relative inline-block mb-4">
                <button
                    onClick={() => setShowMenu((s) => !s)}
                    className="px-3 py-1 border rounded"
                >
                    ▼ Select
                </button>

                {showMenu && (
                    <div className="absolute left-0 mt-1 w-44 border rounded bg-black shadow">
                        <button
                            onClick={() => {
                                selectAllPages();
                                setShowMenu(false);
                            }}
                            className="block w-full text-left px-3 py-1 hover:bg-gray-500"
                        >
                            Select all pages
                        </button>
                        <button
                            onClick={() => {
                                selectThisPage();
                                setShowMenu(false);
                            }}
                            className="block w-full text-left px-3 py-1 hover:bg-gray-500"
                        >
                            Select this page
                        </button>
                        <button
                            onClick={() => {
                                selectNone();
                                setShowMenu(false);
                            }}
                            className="block w-full text-left px-3 py-1 hover:bg-gray-500"
                        >
                            Select none
                        </button>
                    </div>
                )}
            </div>

            {/* Items */}
            {currentItems.map((item) => (
                <div key={item.id} className="p-2 border-t flex items-center gap-2">
                    <input
                        type="checkbox"
                        checked={selected.includes(item.id)}
                        onChange={() => toggleItem(item.id)}
                    />
                    <h2>{item.name}</h2>
                </div>
            ))}

            {/* Pagination controls */}
            <div className="flex justify-between items-center mt-4">
                <button
                    onClick={() => setPage((p) => Math.max(p - 1, 1))}
                    disabled={page === 1}
                    className="px-3 py-1 border rounded disabled:opacity-50"
                >
                    Prev
                </button>

                <span>
          Page {page} of {totalPages}
        </span>

                <button
                    onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                    disabled={page === totalPages}
                    className="px-3 py-1 border rounded disabled:opacity-50"
                >
                    Next
                </button>
            </div>

            {/* Debug selected items */}
            <div className="mt-4 text-sm text-gray-600 break-words">
                Selected IDs: {JSON.stringify(selected)}
            </div>
        </div>
    );
}

const dummyData = Array.from({ length: 100 }, (_, i) => ({
    id: i + 1,
    name: `Item ${i + 1}`,
}));
