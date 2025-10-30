import { useState } from "react";

const ArticleList = ({ categoryData, setCategoryData, catIdx, fldIdx, setOpenUpdateArticlePosition, sds }) => {
    // Get the articles of the selected folder
    const initialArticles = categoryData[catIdx].folder[fldIdx].article;

    const [tempArticles, setTempArticles] = useState([...initialArticles]); // temp drag state
    const [draggedIndex, setDraggedIndex] = useState(null);

    const handleDragStart = (index) => {
        setDraggedIndex(index);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleDrop = (index) => {
        if (draggedIndex === null || draggedIndex === index) return;

        const newData = [...tempArticles];
        const [movedItem] = newData.splice(draggedIndex, 1);
        newData.splice(index, 0, movedItem);

        setTempArticles(newData); // only update temp state
        setDraggedIndex(null);
    };

    const handleUpdate = () => {
        setCategoryData((prev) => {
            const updated = prev.map((cat, cIndex) => {
                if (cIndex === catIdx) {
                    return {
                        ...cat,
                        folder: cat.folder.map((fld, fIndex) => {
                            if (fIndex === fldIdx) {
                                return { ...fld, article: tempArticles };
                            }
                            return fld;
                        }),
                    };
                }
                return cat;
            })
            sds(updated);
            return updated;
        });

        setOpenUpdateArticlePosition(false); // close modal
    };

    const handleCancel = () => {
        setTempArticles([...initialArticles]); // revert
        setOpenUpdateArticlePosition(false);
    };

    return (
        <div className="p-6 text-gray-400 text-sm">
            {tempArticles.map((art, index) => (
                <div
                    key={index}
                    draggable
                    onDragStart={() => handleDragStart(index)}
                    onDragOver={(e) => handleDragOver(e, index)}
                    onDrop={() => handleDrop(index)}
                    className="border border-gray-400 rounded p-2 mb-2 flex items-center gap-3 cursor-grab bg-white"
                >
                    <div className="flex gap-0.5">
                        <i className="fa-solid fa-ellipsis-vertical"></i>
                        <i className="fa-solid fa-ellipsis-vertical"></i>
                    </div>
                    <div>{art.title}</div>
                </div>
            ))}

            <div className="flex px-5 justify-end items-center bottom-0 right-0 w-120 gap-[20] absolute h-15 border-t border-t-gray-400">
                <button
                    className="h-[40px] w-[90] text-sm shadow rounded-3xl border border-gray-400 hover:border-green-500 hover:bg-green-100 text-gray-500 hover:text-green-500"
                    onClick={() => { setOpenUpdateArticlePosition(false); handleCancel() }}
                >
                    Cancel
                </button>
                <button
                    type="button"
                    className="h-[40px] w-[140] text-sm border border-gray-300 rounded-3xl bg-green-500 hover:bg-green-600 font-bold text-white shadow"
                    onClick={handleUpdate}
                >
                    Update Position
                </button>
            </div>
        </div>
    );
};

export default ArticleList;
