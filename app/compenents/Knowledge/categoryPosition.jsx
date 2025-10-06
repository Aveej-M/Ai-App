import { useState } from "react";

const CategoryList = ({ categoryData, setCategoryData, setOpenUpdateCategoryPosition, sds }) => {

    const [tempData, setTempData] = useState([...categoryData]); // temp drag state
    const [draggedIndex, setDraggedIndex] = useState(null);

    const handleDragStart = (index) => {
        setDraggedIndex(index);
    };

    const handleDragOver = (e, index) => {
        e.preventDefault();
    };

    const handleDrop = (index) => {
        if (draggedIndex === null || draggedIndex === index) return;

        const newData = [...tempData];
        const [movedItem] = newData.splice(draggedIndex, 1);
        newData.splice(index, 0, movedItem);

        setTempData(newData); // only update tempData
        setDraggedIndex(null);
    };

    const handleUpdate = () => {
        setCategoryData(tempData); // commit the changes
        sds(tempData)
        setOpenUpdateCategoryPosition(false);
    };

    const handleCancel = () => {
        setTempData([...categoryData]); // revert changes
    };

    return (
        <div className="p-6 text-gray-400 text-sm">
            {tempData.map((cat, index) => (
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
                    <div>{cat.category}</div>
                </div>
            ))}

            <div className="flex px-5 justify-end items-center bottom-0 right-0 w-120 gap-[20] absolute h-15 border-t border-t-gray-400">
                <button
                    className="h-[40px] w-[90] text-sm shadow rounded-3xl border border-gray-400 hover:border-green-500 hover:bg-green-100 text-gray-500 hover:text-green-500"
                    onClick={() => { setOpenUpdateCategoryPosition(false); handleCancel() }}
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

export default CategoryList;
