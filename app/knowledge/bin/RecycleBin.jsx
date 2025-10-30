'use client'
import Link from 'next/link';
import { useState } from 'react';

const RecycleBin = ({ dataCategory }) => {
    const [categoryData, setCategoryData] = useState(dataCategory);
    const [openCategories, setOpenCategories] = useState([0, 1, 2]);
    const [openFolders, setOpenFolders] = useState([]);
    const [notification, setNotification] = useState({ message: '', visibility: false, type: '' });
    const [deleteArticle, setDeleteArticle] = useState(false);
    const [animateOut, setAnimateOut] = useState(false);

    const [selectedArticle, setSelectedArticle] = useState({
        categoryIndex: null,
        folderIndex: null,
        articleIndex: null,
        generalArticleIndex: null,
    });

    const saveDataToServer = async (data) => {
        try {
            const res = await fetch('/api/knowledge/Edit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            if (!res.ok) throw new Error('Failed to save');
        } catch (err) {
            console.error(err);
            setNotification({ message: 'Save failed', visibility: true, type: 'error' });
            setTimeout(() => setNotification((prev) => ({ ...prev, visibility: false })), 3000);
        }
    };

    const toggleCategory = (idx) => {
        setOpenCategories((prev) =>
            prev.includes(idx)
                ? prev.filter((i) => i !== idx)
                : [...prev, idx]
        );
    };

    const toggleFolder = (catIdx, fldIdx) => {
        const key = `${catIdx}-${fldIdx}`;
        setOpenFolders((prev) =>
            prev.includes(key)
                ? prev.filter((k) => k !== key)
                : [...prev, key]
        );
    };

    const handleRestore = () => {
        const { categoryIndex, folderIndex, articleIndex, generalArticleIndex } = selectedArticle;
        if (categoryIndex === null) return;

        const updatedData = [...categoryData];

        if (folderIndex !== null && articleIndex !== null) {
            updatedData[categoryIndex].folder[folderIndex].article[articleIndex].artDel = false;
        } else if (generalArticleIndex !== null) {
            updatedData[categoryIndex].generalArticle[generalArticleIndex].artDel = false;
        }

        setCategoryData(updatedData);
        saveDataToServer(updatedData);

        setSelectedArticle({ categoryIndex: null, folderIndex: null, articleIndex: null, generalArticleIndex: null });

        setNotification({ message: 'Article restored successfully', visibility: true, type: 'success' });
        setTimeout(() => setNotification((prev) => ({ ...prev, visibility: false })), 3000);
    };

    const handleDelete = () => {
        const { categoryIndex, folderIndex, articleIndex, generalArticleIndex } = selectedArticle;
        if (categoryIndex === null) return;

        setCategoryData(prev => {
            const updated = prev.map((category, cIndex) => {
                if (cIndex !== categoryIndex) return category;

                if (folderIndex !== null && articleIndex !== null) {
                    return {
                        ...category,
                        folder: category.folder.map((folder, fIndex) => {
                            if (fIndex !== folderIndex) return folder;
                            return {
                                ...folder,
                                article: folder.article.filter((_, aIndex) => aIndex !== articleIndex),
                            };
                        }),
                    };
                }

                if (generalArticleIndex !== null) {
                    return {
                        ...category,
                        generalArticle: category.generalArticle.filter((_, index) => index !== generalArticleIndex),
                    };
                }

                return category;
            });

            saveDataToServer(updated);
            return updated;
        });

        setSelectedArticle({ categoryIndex: null, folderIndex: null, articleIndex: null, generalArticleIndex: null });
        setDeleteArticle(false);
        setNotification({ message: 'Article deleted successfully', visibility: true, type: 'success' });
        setTimeout(() => setNotification((prev) => ({ ...prev, visibility: false })), 3000);
    };

    const cancelDeleteModel = () => {
        setAnimateOut(true);

        setTimeout(() => {
            if (deleteArticle) {
                setDeleteArticle(false);
            }

            setAnimateOut(false);
        }, 400); // match duration of popupOut
    };

    const deletedItems = categoryData.some(({ folder = [], generalArticle = [] }) =>
        generalArticle.some(a => a.artDel) ||
        folder.some(fld => fld.article?.some(art => art.artDel))
    );

    return (
        <div className="w-full h-screen bg-gray-50 text-gray-800 flex flex-col pt-16.5">
            {(deleteArticle) && (
                <div className="h-full w-full bg-black/80 absolute top-0 left-0 z-50 flex justify-center">
                    <div className={`bg-white w-[500px] h-fit mt-30 rounded p-5 ${animateOut ? "popup-out" : "popup-in"}`}>
                        <div className="flex items-center gap-3 mb-2">
                            <i className="fa-solid fa-circle-exclamation text-2xl text-yellow-500"></i>

                            <h1>Do you want to proceed?</h1>
                        </div>
                        <div className="ml-9">

                            <p>Once deleted , it cannot be recovered.</p>

                        </div>
                        <div className="flex justify-end w-full gap-[20] mt-5">
                            <button
                                className="h-[30px] w-[90] text-sm shadow rounded-3xl border border-gray-400 hover:border-green-500 hover:bg-green-100 text-gray-500 hover:text-green-500 transition-all"
                                onClick={() => cancelDeleteModel()}
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                className="h-[30px] w-[90] text-sm border border-gray-300 rounded-3xl bg-green-500 hover:bg-green-600 font-bold text-white shadow transition-all"
                                onClick={handleDelete}
                            >
                                Delete
                            </button>
                        </div>

                    </div>
                </div>
            )}
            {/* HEADER */}
            <div className="sticky top-0 z-10 h-20 bg-white border-b border-gray-200 flex justify-between items-center px-5 shadow-sm">
                <div className="flex items-center gap-2">
                    <Link href="/knowledge" className="w-8 text-center">
                        <i className="fa-solid fa-arrow-left bg-gray-200 p-1 rounded-2xl hover:p-2 transition-all duration-300"></i>
                    </Link>
                    <h1>Recycle Bin</h1>
                </div>

                <div className="flex gap-3">
                    <button
                        className="h-10 border bg-red-500 hover:bg-red-600 px-4 text-white text-sm rounded-3xl"
                        onClick={() => setDeleteArticle(true)}
                    >
                        Delete Article
                    </button>
                    <button
                        className="h-10 border bg-green-500 hover:bg-green-600 px-4 text-sm rounded-3xl text-white"
                        onClick={handleRestore}
                    >
                        Restore Article
                    </button>
                </div>
            </div>

            {deletedItems ? (
                <div className="flex-1 flex flex-row gap-2 relative">
                    {/* LEFT PANEL */}
                    <div className="w-[350px] min-w-[350px] relative bg-gray-200 flex flex-col h-auto">
                        <div className="flex-1 absolute w-full overflow-y-auto p-5 h-full">
                            {categoryData.map(({ category, folder = [], generalArticle = [] }, catIdx) => {
                                // check if any deleted item exists
                                const hasDeleted =
                                    generalArticle.some((a) => a.artDel) ||
                                    folder.some((fld) => fld.article?.some((art) => art.artDel));

                                if (!hasDeleted) return null;

                                return (
                                    <div key={catIdx} className="border-b border-b-gray-300 mb-2">
                                        {/* Category Header */}
                                        <div
                                            className="w-full group cursor-pointer mb-2"
                                            onClick={() => toggleCategory(catIdx)}
                                        >
                                            <div className="flex justify-between items-center">
                                                <p className="font-bold">{category}</p>
                                                <i
                                                    className={`fa-solid fa-angle-right transition-transform duration-300 ${openCategories.includes(catIdx)
                                                        ? 'rotate-90'
                                                        : 'rotate-0'
                                                        }`}
                                                ></i>
                                            </div>
                                        </div>

                                        {/* Category Content */}
                                        {openCategories.includes(catIdx) && (
                                            <>
                                                {/* Deleted Folders */}
                                                {folder.map((fld, fldIdx) => {
                                                    const deletedArticles = fld.article?.filter((a) => a.artDel) || [];
                                                    if (deletedArticles.length === 0) return null;

                                                    const folderKey = `${catIdx}-${fldIdx}`;

                                                    return (
                                                        <div key={fldIdx} className="ml-4">
                                                            <div
                                                                className="flex items-center justify-between cursor-pointer hover:bg-gray-200 px-2 py-1 rounded"
                                                                onClick={() => toggleFolder(catIdx, fldIdx)}
                                                            >
                                                                <span className="font-medium">{fld.folderName}</span>
                                                                <i
                                                                    className={`fa-solid fa-angle-right transition-transform duration-300 ${openFolders.includes(folderKey)
                                                                        ? 'rotate-90'
                                                                        : 'rotate-0'
                                                                        }`}
                                                                ></i>
                                                            </div>

                                                            {/* Deleted Articles inside Folder */}
                                                            {openFolders.includes(folderKey) &&
                                                                fld.article.map((art, artIdx) => {
                                                                    if (!art.artDel) return null;
                                                                    return (
                                                                        <div
                                                                            key={artIdx}
                                                                            className={`ml-5 px-3 py-1 mb-1 rounded cursor-pointer hover:bg-gray-300 ${selectedArticle.categoryIndex === catIdx &&
                                                                                selectedArticle.folderIndex === fldIdx &&
                                                                                selectedArticle.articleIndex === artIdx
                                                                                ? 'bg-gray-300'
                                                                                : ''
                                                                                }`}
                                                                            onClick={() =>
                                                                                setSelectedArticle({
                                                                                    categoryIndex: catIdx,
                                                                                    folderIndex: fldIdx,
                                                                                    articleIndex: artIdx,
                                                                                    generalArticleIndex: null,
                                                                                })
                                                                            }
                                                                        >
                                                                            {art.title}
                                                                        </div>
                                                                    );
                                                                })}
                                                        </div>
                                                    );
                                                })}

                                                {/* Deleted General Articles */}
                                                {generalArticle.map((article, genIdx) => {
                                                    if (!article.artDel) return null;
                                                    return (
                                                        <div
                                                            key={genIdx}
                                                            className={`ml-4 px-3 py-1 mb-1 rounded cursor-pointer hover:bg-gray-300 ${selectedArticle.categoryIndex === catIdx &&
                                                                selectedArticle.generalArticleIndex === genIdx
                                                                ? 'bg-gray-300'
                                                                : ''
                                                                }`}
                                                            onClick={() =>
                                                                setSelectedArticle({
                                                                    categoryIndex: catIdx,
                                                                    folderIndex: null,
                                                                    articleIndex: null,
                                                                    generalArticleIndex: genIdx,
                                                                })
                                                            }
                                                        >
                                                            {article.artTitle}
                                                        </div>
                                                    );
                                                })}
                                            </>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* RIGHT PANEL */}
                    <div className="h-full w-full p-2 bg-gray-300 overflow-y-auto flex justify-center items-center text-gray-600">
                        {selectedArticle.categoryIndex === null ? (
                            <p>Select a deleted article to restore or delete permanently.</p>
                        ) : (
                            <p>Selected article ready for action.</p>
                        )}
                    </div>
                </div>
            ) : (
                <div className='h-screen w-full flex items-center justify-center flex-col text-gray-400'>
                    <i className="fa-regular fa-folder-open text-5xl"></i>
                    <p>No Data</p>
                </div>
            )}

            {/* Notification */}
            {notification.visibility && (
                <div
                    className={`fixed bottom-4 right-4 px-4 py-2 rounded shadow-md text-sm transition-opacity duration-300 ${notification.type === 'success'
                        ? 'bg-green-100 text-green-500 border border-green-400'
                        : 'bg-red-100 border border-red-500 text-red-500'
                        }`}
                >
                    {notification.message}
                </div>
            )}
        </div>
    );
};

export default RecycleBin;
