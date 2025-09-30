'use client'
import { useState } from "react";
import CategoryList from "../compenents/Knowledge/categoryPosition";
import ArticleList from "../compenents/Knowledge/articlePosition";
import FolderList from "../compenents/Knowledge/folderPosition";
import GeneralArticleList from "../compenents/Knowledge/generalArticlePosition";
import Select from 'react-select';
import { customStyles } from '../data/selectStyle';

const dataCategory = [
    {
        category: 'General', visibility: "all", folder: [
            {
                folderName: 'General', visibility: "agents",
                article: [
                    { title: 'title 1', context: 'Start writing your article here' },
                    { title: 'title 2', context: 'Start writing your article here' },
                    { title: 'title 3', context: 'Start writing your article here' },
                    { title: 'title 4', context: 'Start writing your article here' },
                ],
            },
            {
                folderName: 'Geene', visibility: "agents",
                article: [
                    { title: 'title 1', context: 'Start writing your article here' },
                ]
            }
        ],

        generalArticle: [
            { artTitle: 'Title 1', artContext: "" },
            { artTitle: 'Title 2', artContext: "" },
        ]
    },
    {
        category: 'FAQs', visibility: "all", folder: [
            {
                folderName: 'Getting Started ', visibility: "agents",
                article: [
                    { title: 'title 1', context: 'Start writing your article here' },
                    { title: 'title 2', context: 'Start writing your article here' },
                    { title: 'title 3', context: 'Start writing your article here' },
                    { title: 'title 4', context: 'Start writing your article here' },
                ],
            },
        ],
        generalArticle: [
            { artTitle: 'Title 1', artContext: "" },
        ]
    },
    {
        category: 'General', visibility: "all", folder: [
            {
                folderName: 'FAQs', visibility: "agents",
                article: [
                    { title: 'title 1', context: 'Start writing your article here' },
                    { title: 'title 2', context: 'Start writing your article here' },
                    { title: 'title 3', context: 'Start writing your article here' },
                    { title: 'title 4', context: 'Start writing your article here' },
                ],
            },
        ],
        generalArticle: [
            { artTitle: 'Title 1', artContext: "" },
        ]
    },
]
const visibleCategory = [
    { label: "All Users", value: "all" },
    { label: "Logged in Users", value: "loggedIn" },
]

const visibleFolder = [
    { label: "All Agents", value: 'agents' },
    { label: "All Users", value: "all" },
    { label: "Bot", value: "bot" },
    { label: "Logged in Users", value: "loggedIn" },
]

const Knowledge = () => {
    const [categoryData, setCategoryData] = useState(dataCategory);
    const [openCategories, setOpenCategories] = useState([0, 1, 2]);
    const [openFolders, setOpenFolders] = useState([]);
    const [selectedArticle, setSelectedArticle] = useState({ categoryIndex: 0, folderIndex: null, articleIndex: null, generalArticleIndex: null });
    const [newCategory, setNewCategory] = useState('');
    const [openCreateCategory, setOpenCreateCategory] = useState(false);
    const [addOuterArticle, setAddOuterArticle] = useState(false);
    const [addNewFolder, setAddNewFolder] = useState(false);
    const [newArticleName, setNewArticleName] = useState('');
    const [newFolderName, setNewFolderName] = useState('')
    const [editingCategoryIndex, setEditingCategoryIndex] = useState(null);
    const [animateOut, setAnimateOut] = useState(false);
    const [notification, setNotification] = useState({ message: '', visibility: true, type: '' });
    const hasError = false;

    // Variables of Edit Category
    const [editCategory, setEditCategory] = useState(false);
    const [newCategoryName, setNewCategoryName] = useState('');
    const [openUpdateCategoryPosition, setOpenUpdateCategoryPosition] = useState(false);
    const [visibilityCategory, setVisibilityCategory] = useState('all');
    const [deleteCategory, setDeleteCategory] = useState(false);

    // Variables of Edit Folders
    const [editFolder, setEditFolder] = useState(false);
    const [updateFolderName, setUpdateFolderName] = useState('');
    const [openUpdateFolderPosition, setOpenUpdateFolderPosition] = useState(false);
    const [visibilityFolder, setVisibilityFolder] = useState("agents");
    const [deleteFolder, setDeleteFolder] = useState(false);

    // variables of Edit Articles
    const [editArticle, setEditArticle] = useState(false);
    const [updateArticleName, setUpdateArticleName] = useState("");
    const [openUpdateArticlePosition, setOpenUpdateArticlePosition] = useState(false);
    const [deleteArticle, setDeleteArticle] = useState(false);

    // variable of Edit General Article
    const [editGeneralArticle, setEditGeneralArticle] = useState(false);
    const [updateGeneralArticleName, setUpdateGeneralArticle] = useState("");
    const [openUpdateGeneralArticlePosition, setOpenUpdateGeneralArticlePosition] = useState(false)
    const [deleteGeneralArticle, setDeleteGeneralArticle] = useState(false);



    const toggleCategory = (idx) => {
        setOpenCategories((prev) =>
            prev.includes(idx)
                ? prev.filter((i) => i !== idx) // close it
                : [...prev, idx] // open it
        );

    };

    const toggleFolder = (catIdx, fldIdx) => {
        const key = `${catIdx}-${fldIdx}`;
        setOpenFolders(prev => {
            const next = prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key];
            return next;
        });
    };

    const handleAddCategory = () => {
        if (!newCategory.trim()) return;

        setCategoryData((prev) => [
            {
                category: newCategory.trim(),
                visibility: "all",
                folder: [],
                generalArticle: []
            },
            ...prev,
        ]);

        setNewCategory('');
        setOpenCreateCategory(false);
    }

    const handleAddNewFolder = (catIdx) => {
        if (!newFolderName.trim()) return; // prevent empty names

        setCategoryData((prev) =>
            prev.map((category, index) => {
                if (index === catIdx) {
                    return {
                        ...category,
                        folder: [
                            ...(category.folder ?? []), // keep existing folders
                            {
                                folderName: newFolderName.trim(),
                                visibility: "agents",
                                article: [], // initialize empty article list
                            },
                        ],
                    };
                }
                return category;
            })
        );

        setNewFolderName(""); // reset input
        setAddNewFolder(false);
    };

    const handleAddGeneralArticle = (catIdx) => {
        if (!newArticleName.trim()) return; // prevent empty article names

        setCategoryData((prev) =>
            prev.map((gen, index) => {
                if (index === catIdx) {
                    return {
                        ...gen,
                        generalArticle: [
                            ...(gen.generalArticle ?? []), // ✅ safe fallback if undefined
                            {
                                artTitle: newArticleName.trim(),
                                artContext: "",
                            },
                        ],
                    };
                }
                return gen; // ✅ keep other categories unchanged
            })
        );

        setNewArticleName('');
        setAddOuterArticle(false);
        setEditingCategoryIndex(null);
    };


    const handleAddArticle = (catIdx, fIdx) => {
        setCategoryData((prev) =>
            prev.map((cat, index) => {
                if (index === catIdx) {
                    return {
                        ...cat,
                        folder: cat.folder.map((fld, folderIndex) => {
                            if (folderIndex === fIdx) {
                                return {
                                    ...fld,
                                    article: [
                                        ...fld.article,
                                        {
                                            title: `Untitled Article ${fld.article.length + 1}`,
                                            context: "",
                                        },
                                    ],
                                };
                            }
                            return fld;
                        }),
                    };
                }
                return cat;
            })
        );
    };

    // Edit Category Name
    const handleEditCategoryName = (catIdx, newCategoryName) => {
        if (!newCategoryName.trim()) return;

        setCategoryData((prev) =>
            prev.map((category, index) => {
                if (index === catIdx) {
                    return {
                        ...category,
                        category: newCategoryName.trim(),
                        visibility: visibilityCategory,
                    };
                }
                return category;
            }))
        setEditCategory(false)
    };

    const handleEditFolderName = (catIdx, fldIdx, updateFolderName) => {
        if (!updateFolderName.trim()) return;

        setCategoryData((prev) =>
            prev.map((category, cIndex) => {
                if (cIndex === catIdx) {
                    return {
                        ...category,
                        folder: category.folder.map((folder, fIndex) => {
                            if (fIndex === fldIdx) {
                                return {
                                    ...folder,
                                    folderName: updateFolderName.trim(),
                                    visibility: visibilityFolder,
                                };
                            }
                            return folder;
                        }),
                    };
                }
                return category;
            }))
        setEditFolder(false)
        setEditingCategoryIndex(null);
    }

    const handleEditArticleName = (catIdx, fldIdx, artIdx, updateArticleName) => {
        if (!updateArticleName.trim()) return;

        setCategoryData((prev) =>
            prev.map((category, cIndex) => {
                if (cIndex === catIdx) {
                    return {
                        ...category,
                        folder: category.folder.map((folder, fIndex) => {
                            if (fIndex === fldIdx) {
                                return {
                                    ...folder,
                                    article: folder.article.map((article, aIndex) => {
                                        if (aIndex === artIdx) {
                                            return {
                                                ...article,
                                                title: updateArticleName.trim()
                                            }
                                        }
                                        return article;
                                    })
                                }
                            }
                            return folder;
                        })
                    }
                }
                return category;
            })
        )
        setEditArticle(false);
        setEditingCategoryIndex(null);
    }

    const handleEditGeneralArtilceName = (catIdx, genIdx, updateGeneralArticleName) => {
        if (!updateGeneralArticleName.trim()) return;

        setCategoryData((prev) =>
            prev.map((category, cIndex) => {
                if (cIndex === catIdx) {
                    return {
                        ...category,
                        generalArticle: category.generalArticle.map((title, tIndex) => {
                            if (tIndex === genIdx) {
                                return {
                                    ...title,
                                    artTitle: updateGeneralArticleName.trim(),
                                }
                            }
                            return title;
                        }),
                    };
                }
                return category;
            }))
        setEditGeneralArticle(false)
        setEditingCategoryIndex(null);
    }

    const handleCloseCategory = () => {
        setNewCategory("");
        setOpenCreateCategory(false);
        setEditCategory(false);
    }

    const handleDeleteCategory = (catIdx) => {
        setCategoryData(prev => {
            const updated = prev.filter((_, cIndex) => cIndex !== catIdx);
            return updated;
        });
        setDeleteCategory(false);
        setEditingCategoryIndex(null);
        setNotification({
            message: 'Category moved to trash sucessfully',
            visibility: true,
            type: 'success',
        });
        setTimeout(() => {
            setNotification((prev) => ({ ...prev, visibility: false }));
        }, 3000);
    };

    const handleDeleteFolder = (catIdx, fldIdx) => {
        setCategoryData(prev =>
            prev.map((category, cIndex) => {
                if (cIndex !== catIdx) return category;

                return {
                    ...category,
                    folder: category.folder.filter((_, fIndex) => fIndex !== fldIdx)
                }
            })
        )
        setDeleteFolder(false);
        setEditingCategoryIndex(null);
        setNotification({
            message: 'Folder moved to trash sucessfully',
            visibility: true,
            type: 'success',
        });
        setTimeout(() => {
            setNotification((prev) => ({ ...prev, visibility: false }));
        }, 3000);
    }
    const handleDeleteArticle = (catIdx, fldIdx, artIdx) => {
        setCategoryData(prev =>
            prev.map((category, cIndex) => {
                if (cIndex !== catIdx) return category;

                return {
                    ...category,
                    folder: category.folder.map((folder, fIndex) => {
                        if (fIndex !== fldIdx) return folder;

                        return {
                            ...folder,
                            article: folder.article.filter((_, aIndex) => aIndex !== artIdx),
                        };
                    }),
                };
            })
        );
        setDeleteArticle(false);
        setEditingCategoryIndex(null);
        setNotification({
            message: 'Article moved to trash sucessfully',
            visibility: true,
            type: 'success',
        });
        setTimeout(() => {
            setNotification((prev) => ({ ...prev, visibility: false }));
        }, 3000);
    };

    const handleDeleteGeneralArticle = (catIdx, genIdx) => {
        setCategoryData(prev =>
            prev.map((category, cIndex) => {
                if (cIndex !== catIdx) return category;

                return {
                    ...category,
                    generalArticle: category.generalArticle.filter(
                        (_, index) => index !== genIdx
                    ),
                };
            })
        );
        setDeleteGeneralArticle(false);
        setEditingCategoryIndex(null);
        setNotification({
            message: 'Article moved to trash sucessfully',
            visibility: true,
            type: 'success',
        });
        setTimeout(() => {
            setNotification((prev) => ({ ...prev, visibility: false }));
        }, 3000);
    }

    let inputValue = "";
    let inputSetter = () => { };

    if (editCategory) {
        inputValue = newCategoryName;
        inputSetter = setNewCategoryName;
    } else if (editFolder) {
        inputValue = updateFolderName;
        inputSetter = setUpdateFolderName;
    } else if (editArticle) {
        inputValue = updateArticleName;
        inputSetter = setUpdateArticleName;
    } else if (editGeneralArticle) {
        inputValue = updateGeneralArticleName;
        inputSetter = setUpdateGeneralArticle;
    }

    const cancelDeleteModel = () => {
        setAnimateOut(true);

        setTimeout(() => {
            if (deleteArticle) {
                setDeleteArticle(false);
            } else if (deleteCategory) {
                setDeleteCategory(false);
            } else if (deleteFolder) {
                setDeleteFolder(false);
            } else if (deleteGeneralArticle) {
                setDeleteGeneralArticle(false);
            }

            setAnimateOut(false);
        }, 400); // match duration of popupOut
    };

    const handleDelete = () => {
        setAnimateOut(true);

        setTimeout(() => {
            if (deleteGeneralArticle) {
                handleDeleteGeneralArticle(editingCategoryIndex.catIdx, editingCategoryIndex.genIdx);
            } else if (deleteArticle) {
                handleDeleteArticle(editingCategoryIndex.catIdx, editingCategoryIndex.fldIdx, editingCategoryIndex.artIdx);
            } else if (deleteFolder) {
                handleDeleteFolder(editingCategoryIndex.catIdx, editingCategoryIndex.fldIdx);
            } else if (deleteCategory) {
                handleDeleteCategory(editingCategoryIndex.catIdx);
            }

            // finally close modal
            cancelDeleteModel();
            setAnimateOut(false);
        }, 400);
    };




    return (
        <div className="w-full h-screen bg-gray-50 text-gray-800 flex flex-col pt-16.5">
            {(addOuterArticle || addNewFolder) && (
                <div className="h-full w-full bg-black/80 absolute top-0 left-0 z-50 flex justify-center">
                    <div className={`bg-white w-[500px] h-fit mt-30 rounded p-5 ${animateOut ? "popup-out" : "popup-in"}`}>
                        <div className="justify-items">
                            <h1>{addOuterArticle ? "Edit Article" : "Add New Folder"}</h1>
                            <div
                                className="h-6 w-6 flex-items hover:bg-gray-400 rounded cursor-pointer"
                                onClick={() => {
                                    setAddOuterArticle(false);
                                    setAddNewFolder(false);
                                }}
                            >
                                <i className="fa-solid fa-xmark"></i>
                            </div>
                        </div>

                        {/* Example form fields */}
                        <label htmlFor="">
                            {addOuterArticle ? "Article Name" : "Folder Name"}{" "}
                            <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            className="form-input border-l-3! border-l-green-500!"
                            value={addOuterArticle ? newArticleName : newFolderName}
                            onChange={(e) => addOuterArticle
                                ? setNewArticleName(e.target.value)
                                : setNewFolderName(e.target.value)
                            }
                        />

                        <div className="flex justify-end w-full gap-[20] mt-5">
                            <button
                                className="h-[30px] w-[90] text-sm shadow rounded-3xl border border-gray-400 hover:border-green-500 hover:bg-green-100 text-gray-500 hover:text-green-500"
                                onClick={() => addOuterArticle
                                    ? setAddOuterArticle(false)
                                    : setAddNewFolder(false)
                                }
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() =>
                                    addOuterArticle
                                        ? handleAddGeneralArticle(editingCategoryIndex)
                                        : handleAddNewFolder(editingCategoryIndex)
                                }
                                type="button"
                                className="h-[30px] w-[90] text-sm border border-gray-300 rounded-3xl bg-green-500 hover:bg-green-600 font-bold text-white shadow"
                            >
                                {addOuterArticle ? "Update" : "Create"}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {(editCategory || editFolder || editArticle || editGeneralArticle) && (
                <div className="h-full w-full bg-black/80 absolute top-0 left-0 z-50 flex justify-center">
                    <div className={`bg-white w-[500px] h-fit mt-30 rounded p-5 ${animateOut ? "popup-out" : "popup-in"}`}>
                        <div className="justify-items mb-2">
                            <h1>{editCategory ? 'Edit Category' : (editFolder ? 'Edit Folder' : 'Edit Article')}</h1>
                            <div
                                className="h-6 w-6 flex-items hover:bg-gray-400 rounded cursor-pointer transition"
                                onClick={() => { editCategory ? setEditCategory(false) : (editFolder ? setEditFolder(false) : (editArticle ? setEditArticle(false) : setEditGeneralArticle(false))) }}
                            >
                                <i className="fa-solid fa-xmark"></i>
                            </div>
                        </div>

                        <label htmlFor="">
                            {editCategory ? 'Category Name' : (editFolder ? 'Folder Name' : 'Edit Article')}
                            <span className="text-red-500"> *</span>
                        </label>
                        <input
                            type="text"
                            className="form-input border-l-3! border-l-green-500!"
                            value={inputValue}
                            onChange={(e) => inputSetter(e.target.value)}
                        />

                        {editCategory && (
                            <div className="mt-3">
                                <label htmlFor="visible-to">Visible To <span className="text-red-500"> *</span></label>
                                <Select
                                    instanceId="visible-to"
                                    options={visibleCategory}
                                    value={visibleCategory.find(option => option.value === visibilityCategory)}
                                    onChange={(e) => setVisibilityCategory(e.value)}
                                    styles={customStyles}
                                >
                                </Select>
                            </div>
                        )}
                        {editFolder && (
                            <div className="mt-3">
                                <label htmlFor="visible-to">Visible To <span className="text-red-500"> *</span></label>
                                <Select
                                    instanceId="visible-to"
                                    options={visibleFolder}
                                    value={visibleFolder.find(option => option.value === visibilityFolder)}
                                    onChange={(e) => setVisibilityFolder(e.value)}
                                    styles={customStyles}
                                >
                                </Select>
                            </div>
                        )}

                        <div className="flex justify-end w-full gap-[20] mt-5">
                            <button
                                className="h-[30px] w-[90] text-sm shadow rounded-3xl border border-gray-400 hover:border-green-500 hover:bg-green-100 text-gray-500 hover:text-green-500 transition-all"
                                onClick={() => { editCategory ? setEditCategory(false) : (editFolder ? setEditFolder(false) : (editArticle ? setEditArticle(false) : setEditGeneralArticle(false))) }}
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                className="h-[30px] w-[90] text-sm border border-gray-300 rounded-3xl bg-green-500 hover:bg-green-600 font-bold text-white shadow transition-all"
                                onClick={() => {
                                    editCategory ? handleEditCategoryName(editingCategoryIndex, newCategoryName) :
                                        (editFolder ? handleEditFolderName(editingCategoryIndex.catIdx, editingCategoryIndex.fldIdx, updateFolderName) :
                                            (editArticle ? handleEditArticleName(editingCategoryIndex.catIdx, editingCategoryIndex.fldIdx, editingCategoryIndex.artIdx, updateArticleName) :
                                                handleEditGeneralArtilceName(editingCategoryIndex.catIdx, editingCategoryIndex.genIdx, updateGeneralArticleName)
                                            )
                                        )
                                }
                                }
                            >
                                Update
                            </button>
                        </div>

                    </div>
                </div>
            )}

            {(openUpdateCategoryPosition || openUpdateArticlePosition || openUpdateFolderPosition || openUpdateGeneralArticlePosition) && (
                <div className="h-full w-full bg-black/80 absolute top-0 left-0 z-50 flex justify-center">
                    <div
                        className={`w-120 h-full absolute right-0 bg-white transition-transform duration-300 ease-in-out transform `}
                    >
                        <div className='p-5 bg-linear-90 from-green-500 to-green-200 justify-items'>
                            <h1>{openUpdateCategoryPosition ? 'Category' : 'Article'} Position Update</h1>
                            <div
                                onClick={() => {
                                    openUpdateCategoryPosition ? setOpenUpdateCategoryPosition(false) :
                                        (openUpdateArticlePosition ? setOpenUpdateArticlePosition(false) :
                                            (openUpdateFolderPosition ? setOpenUpdateFolderPosition(false) :
                                                setOpenUpdateGeneralArticlePosition(false)))
                                }}
                                className='cursor-pointer h-6 w-6 pb-1 flex-items hover:bg-white rounded transition'><span className="text-2xl">x</span></div>
                        </div>

                        {openUpdateCategoryPosition ? <CategoryList
                            categoryData={categoryData}
                            setCategoryData={setCategoryData}
                            setOpenUpdateCategoryPosition={setOpenUpdateCategoryPosition}
                        /> : (openUpdateArticlePosition ? <ArticleList
                            categoryData={categoryData}
                            setCategoryData={setCategoryData}
                            setOpenUpdateArticlePosition={setOpenUpdateArticlePosition}
                            catIdx={editingCategoryIndex.catIdx}
                            fldIdx={editingCategoryIndex.fldIdx}
                        /> : (openUpdateFolderPosition ? <FolderList
                            categoryData={categoryData}
                            setCategoryData={setCategoryData}
                            setOpenUpdateFolderPosition={setOpenUpdateFolderPosition}
                            catIdx={editingCategoryIndex.catIdx}
                        /> : <GeneralArticleList
                            categoryData={categoryData}
                            setCategoryData={setCategoryData}
                            setOpenUpdateGeneralArticlePosition={setOpenUpdateGeneralArticlePosition}
                            catIdx={editingCategoryIndex.catIdx}
                        />))}
                    </div>
                </div>
            )}

            {(deleteGeneralArticle || deleteArticle || deleteFolder || deleteCategory) && (
                <div className="h-full w-full bg-black/80 absolute top-0 left-0 z-50 flex justify-center">
                    <div className={`bg-white w-[500px] h-fit mt-30 rounded p-5 ${animateOut ? "popup-out" : "popup-in"}`}>
                        <div className="flex items-center gap-3 mb-2">
                            <i className="fa-solid fa-circle-exclamation text-2xl text-yellow-500"></i>
                            {deleteFolder ?
                                <h1>Are you sure want to delete this folder</h1> :
                                <h1>Do you want to proceed?</h1>}
                        </div>
                        <div className="ml-9">
                            {deleteFolder ?
                                <p>Once deleted , it cannot be recovered.</p> :
                                <p>This article will be moved to trash.</p>}
                        </div>
                        <div className="flex justify-end w-full gap-[20] mt-5">
                            <button
                                className="h-[30px] w-[90] text-sm shadow rounded-3xl border border-gray-400 hover:border-green-500 hover:bg-green-100 text-gray-500 hover:text-green-500 transition-all"
                                // onClick={() => { deleteGeneralArticle ? setDeleteGeneralArticle(false) : (deleteArticle ? setDeleteArticle(false) : (setDeleteFolder(false))) }}
                                onClick={() => cancelDeleteModel()}
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                className="h-[30px] w-[90] text-sm border border-gray-300 rounded-3xl bg-green-500 hover:bg-green-600 font-bold text-white shadow transition-all"
                                // onClick={() => {
                                //     deleteGeneralArticle ? handleDeleteGeneralArticle(editingCategoryIndex.catIdx, editingCategoryIndex.genIdx) :
                                //         (deleteArticle ? handleDeleteArticle(editingCategoryIndex.catIdx, editingCategoryIndex.fldIdx, editingCategoryIndex.artIdx) :
                                //             (handleDeleteFolder(editingCategoryIndex.catIdx, editingCategoryIndex.fldIdx)));
                                //     deleteModel()
                                // }}
                                onClick={handleDelete}
                            >
                                Delete
                            </button>
                        </div>

                    </div>
                </div>
            )}

            {/* Top Bar */}
            <div className="sticky top-0 z-10 h-16 bg-white border-b border-gray-200 flex justify-between items-center px-5 shadow-sm">
                <div className="flex items-center gap-4">
                    <i className="fa-regular fa-star text-green-500 text-lg"></i>
                    <h1>Knowledge Base</h1>
                </div>

                <div className=" flex gap-3">
                    <div className="flex-items h-10 w-10 border border-gray-400 bg-gray-100 hover:bg-gray-300 cursor-pointer rounded-3xl group">
                        <i className="fa-solid fa-clock-rotate-left"></i>
                        <span className="w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-b-[10px] border-b-black absolute -bottom-2 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity"></span>
                        <div className="bg-black px-2 py-1 rounded absolute -bottom-8 text-gray-50 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity text-sm">Versions</div>
                    </div>
                    <div className="flex-items h-10 w-10 border border-gray-400 bg-gray-100 hover:bg-gray-300 cursor-pointer rounded-3xl group">
                        <i className="fa-solid fa-arrow-pointer"></i>
                        <span className="w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-b-[10px] border-b-black absolute -bottom-2 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity"></span>
                        <div className="bg-black px-2 py-1 rounded absolute -bottom-8 text-gray-50 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity text-sm">Rearrange</div>
                    </div>
                    <div className="flex-items h-10 w-10 border border-gray-400 bg-gray-100 hover:bg-gray-300 cursor-pointer rounded-3xl group">
                        <i className="fa-solid fa-box-open"></i>
                        <span className="w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-b-[10px] border-b-black absolute -bottom-2 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity"></span>
                        <div className="bg-black px-2 py-1 rounded absolute -bottom-8 text-gray-50 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity text-sm">Recycle Bin</div>
                    </div>
                    <button className="h-10 border hover:bg-gray-200 px-4 text-gray-400 text-sm rounded-3xl">Save as Draft</button>
                    <button className="h-10 border bg-green-500 hover:bg-green-600 px-4 text-sm rounded-3xl  text-white">Save & Publish</button>
                </div>
            </div>

            <div className="flex-1 flex flex-row gap-2 relative">
                <div className="w-[350px] min-w-[350px] relative bg-gray-200 flex flex-col h-auto">
                    <div className="flex-1 absolute w-full overflow-y-auto p-5 h-full">
                        {categoryData.map(({ category, folder, generalArticle }, catIdx) => (
                            <div key={catIdx} className="border-b border-b-gray-300 mb-2">
                                <div className="justify-items w-full group cursor-pointer mb-2"
                                    onClick={() => toggleCategory(catIdx)}>
                                    <div className="flex-items"
                                    >
                                        <p className="font-bold">{category}</p>
                                        <i
                                            className={`fa-solid fa-angle-right cursor-pointer ${openCategories.includes(catIdx)
                                                ? "rotate-90 duration-500"
                                                : "rotate-0 duration-500"
                                                }`}
                                        ></i>
                                    </div>

                                    {/* Ellipsis only shows when parent row is hovered */}
                                    <div
                                        onClick={(e) => e.stopPropagation()}
                                        className="relative inline-block opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <div className="group/ellipsis cursor-pointer w-2">
                                            <i className="fa-solid fa-ellipsis-vertical"></i>

                                            {/* Dropdown only shows when ellipsis itself is hovered */}
                                            <div className="absolute w-56 bg-white p-3 top-5 -right-2 rounded shadow opacity-0 group-hover/ellipsis:opacity-100 pointer-events-none group-hover/ellipsis:pointer-events-auto z-40 text-sm transition-all duration-300">
                                                <ul className="flex flex-col gap-1">
                                                    <li
                                                        onClick={() => { setAddOuterArticle(true); setEditingCategoryIndex(catIdx); }}
                                                        className="px-2 py-1 rounded flex gap-2 items-center hover:bg-gray-200">
                                                        <i className="fa-solid fa-newspaper"></i>New Article
                                                    </li>
                                                    <li
                                                        onClick={() => { setAddNewFolder(true); setEditingCategoryIndex(catIdx); }}
                                                        className="px-2 py-1 rounded flex gap-2 items-center hover:bg-gray-200">
                                                        <i className="fa-solid fa-folder-open"></i>New Folder
                                                    </li>
                                                    <li
                                                        onClick={() => { setEditCategory(true); setEditingCategoryIndex(catIdx); setNewCategoryName(categoryData[catIdx].category) }}
                                                        className="px-2 py-1 rounded flex gap-2 items-center hover:bg-gray-200">
                                                        <i className="fa-solid fa-pen"></i>Edit
                                                    </li>
                                                    <li
                                                        onClick={() => {
                                                            if (categoryData[catIdx].folder.length === 0 && categoryData[catIdx].generalArticle.length === 0) {
                                                                setDeleteCategory(true);
                                                                setEditingCategoryIndex({ catIdx });
                                                            }
                                                        }}
                                                        className={`px-2 py-1 rounded flex gap-2 items-center hover:bg-gray-200 ${(categoryData[catIdx].folder.length > 0 || categoryData[catIdx].generalArticle.length > 0)
                                                            ? "text-gray-400 cursor-not-allowed"
                                                            : "cursor-pointer"
                                                            }`}
                                                    >
                                                        <i className="fa-solid fa-trash-can"></i> Delete
                                                    </li>

                                                    <li
                                                        onClick={() => {
                                                            if (categoryData.length > 1) {
                                                                setOpenUpdateCategoryPosition(true)
                                                            }
                                                        }}
                                                        className={`px-2 py-1 rounded flex gap-2 items-center hover:bg-gray-200 ${categoryData.length === 1
                                                            ? 'text-gray-400 cursor-not-allowed'
                                                            : "cursor-pointer"
                                                            }`}>
                                                        <i className="fa-solid fa-up-down"></i>Upgrade Category Position
                                                    </li>

                                                    <li
                                                        onClick={() => {
                                                            if (categoryData[catIdx].folder.length > 1) {
                                                                console.log('open')
                                                                setOpenUpdateFolderPosition(true)
                                                                setEditingCategoryIndex({ catIdx });
                                                            }
                                                        }}
                                                        className={`px-2 py-1 rounded flex gap-2 items-center hover:bg-gray-200 ${categoryData[catIdx].folder.length <= 1
                                                            ? "text-gray-400 cursor-not-allowed"
                                                            : "cursor-pointer"
                                                            }`}>
                                                        <i className="fa-solid fa-list-ul"></i>Upgrade Folder Position
                                                    </li>

                                                    <li
                                                        onClick={() => {
                                                            if (categoryData[catIdx].generalArticle.length > 1) {
                                                                setOpenUpdateGeneralArticlePosition(true)
                                                                setEditingCategoryIndex({ catIdx });
                                                            }
                                                        }}
                                                        className={`px-2 py-1 rounded flex gap-2 items-center hover:bg-gray-200 ${categoryData[catIdx].generalArticle.length <= 1
                                                            ? "text-gray-400 cursor-not-allowed"
                                                            : "cursor-pointer"
                                                            }`}>
                                                        <i className="fa-solid fa-list-ul"></i>Upgrade Article Position
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {openCategories.includes(catIdx) && folder.map((fld, fldIdx) => (
                                    < div className="py-1" key={fldIdx}>
                                        <div className="justify-items w-full group hover:bg-green-300 px-3 py-1 rounded mb-1">
                                            <div className="flex-items cursor-pointer"
                                                onClick={() => toggleFolder(catIdx, fldIdx)}
                                            >
                                                <i
                                                    className={`fa-solid fa-angle-right cursor-pointer ${openFolders.includes(`${catIdx}-${fldIdx}`)
                                                        ? "rotate-90 duration-500"
                                                        : "rotate-0 duration-500"
                                                        }`}
                                                ></i>
                                                <p className="font-bold">{fld.folderName}</p>
                                            </div>

                                            {/* Ellipsis only shows when parent row is hovered */}
                                            <div className="relative inline-block opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                <div className="group/ellipsis cursor-pointer w-2">
                                                    <i className="fa-solid fa-ellipsis-vertical"></i>

                                                    {/* Dropdown only shows when ellipsis itself is hovered */}
                                                    <div className="absolute w-54 bg-white p-3 top-5 -right-2 rounded shadow opacity-0 group-hover/ellipsis:opacity-100 pointer-events-none group-hover/ellipsis:pointer-events-auto z-40 text-sm transition-all duration-300">
                                                        <ul className="flex flex-col gap-1">
                                                            <li
                                                                onClick={() => handleAddArticle(catIdx, fldIdx)}
                                                                className="px-2 py-1 rounded flex gap-2 items-center hover:bg-gray-200">
                                                                <i className="fa-solid fa-newspaper"></i>New Article
                                                            </li>
                                                            <li
                                                                onClick={() => {
                                                                    setEditFolder(true);
                                                                    setUpdateFolderName(fld.folderName)
                                                                    setEditingCategoryIndex({ catIdx, fldIdx })
                                                                }}
                                                                className="px-2 py-1 rounded flex gap-2 items-center hover:bg-gray-200">
                                                                <i className="fa-solid fa-pen"></i>Edit
                                                            </li>
                                                            <li
                                                                onClick={() => {
                                                                    if (categoryData[catIdx].folder[fldIdx].article.length === 0) {
                                                                        setDeleteFolder(true)
                                                                        setEditingCategoryIndex({ catIdx, fldIdx })
                                                                    }
                                                                }}
                                                                className={`px-2 py-1 rounded flex gap-2 items-center hover:bg-gray-200 ${categoryData[catIdx].folder[fldIdx].article.length > 0
                                                                    ? 'text-gray-400 cursor-not-allowed'
                                                                    : 'cursor-pointer'
                                                                    }`}>
                                                                <i className="fa-solid fa-trash-can"></i>Delete
                                                            </li>
                                                            <li
                                                                onClick={() => {
                                                                    if (categoryData[catIdx].folder[fldIdx].article.length > 1) {
                                                                        setOpenUpdateArticlePosition(true);
                                                                        setEditingCategoryIndex({ catIdx, fldIdx });
                                                                    }
                                                                }}
                                                                className={`px-2 py-1 rounded flex gap-2 items-center hover:bg-gray-200 ${categoryData[catIdx].folder[fldIdx].article.length <= 1 ? "text-gray-400 cursor-not-allowed" : "cursor-pointer"}`}>
                                                                <i className="fa-solid fa-list-ul"></i>Upgrade Article Position
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {openFolders.includes(`${catIdx}-${fldIdx}`) && (
                                            <>
                                                <div className="ml-4 text-gray-500 border-l border-l-gray-400 flex flex-col gap-2">
                                                    {fld.article.map(({ title }, artIdx) => (
                                                        <div
                                                            key={artIdx}
                                                            className={`justify-items w-full group px-3 py-1 cursor-pointer ${selectedArticle.categoryIndex === catIdx &&
                                                                selectedArticle.folderIndex === fldIdx &&
                                                                selectedArticle.articleIndex === artIdx &&
                                                                selectedArticle.generalArticleIndex === null
                                                                ? "border-l-2 border-l-green-500 text-black font-bold"
                                                                : ""
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
                                                            {title}

                                                            {/* Ellipsis only shows when parent row is hovered */}
                                                            <div className="relative inline-block opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out font-normal text-black">
                                                                <div className="group/ellipsis cursor-pointer w-2">
                                                                    <i className="fa-solid fa-ellipsis-vertical"></i>

                                                                    {/* Dropdown only shows when ellipsis itself is hovered */}
                                                                    <div className="absolute w-fit bg-white p-1 top-5 -right-2 rounded shadow opacity-0 group-hover/ellipsis:opacity-100 pointer-events-none group-hover/ellipsis:pointer-events-auto z-40 text-sm transition-all duration-300">
                                                                        <ul className="flex flex-col gap-1">
                                                                            <li
                                                                                onClick={() => {
                                                                                    setEditArticle(true)
                                                                                    setUpdateArticleName(title)
                                                                                    setEditingCategoryIndex({ catIdx, fldIdx, artIdx })
                                                                                }}
                                                                                className="px-2 py-1 rounded flex gap-2 items-center hover:bg-gray-200">
                                                                                <i className="fa-solid fa-pen"></i>Edit
                                                                            </li>
                                                                            <li
                                                                                onClick={() => {
                                                                                    setDeleteArticle(true)
                                                                                    setEditingCategoryIndex({ catIdx, fldIdx, artIdx })
                                                                                }}
                                                                                className="px-2 py-1 rounded flex gap-2 items-center hover:bg-gray-200">
                                                                                <i className="fa-solid fa-trash-can"></i>Delete
                                                                            </li>
                                                                        </ul>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                        </div>

                                                    ))}
                                                </div>
                                                <div
                                                    className="flex-items h-8 ml-4 text-gray-500 hover:bg-white rounded mt-2 cursor-pointer"
                                                    onClick={() => handleAddArticle(catIdx, fldIdx)}
                                                >
                                                    <i className="fa-solid fa-circle-plus"></i>
                                                    <p>Add Article in Folder</p>
                                                </div>
                                            </>
                                        )}

                                    </div>
                                ))}
                                <div className="mb-3 ">
                                    {generalArticle.map(({ artTitle }, genIdx) => (
                                        <div key={genIdx}
                                            className={`justify-items w-full group px-3 py-1 mb-1 rounded cursor-pointer hover:bg-gray-300 ${selectedArticle.categoryIndex === catIdx && selectedArticle.generalArticleIndex === genIdx ? 'bg-gray-300' : 'bg-none'}`}
                                            onClick={() => setSelectedArticle({ categoryIndex: catIdx, articleIndex: null, generalArticleIndex: genIdx })
                                            }
                                        >
                                            {artTitle}
                                            {/* Ellipsis only shows when parent row is hovered */}
                                            <div className="relative inline-block opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out">
                                                <div className="group/ellipsis cursor-pointer w-2">
                                                    <i className="fa-solid fa-ellipsis-vertical"></i>

                                                    {/* Dropdown only shows when ellipsis itself is hovered */}
                                                    <div className="absolute w-fit bg-white p-1 top-5 -right-2 rounded shadow opacity-0 group-hover/ellipsis:opacity-100 pointer-events-none group-hover/ellipsis:pointer-events-auto z-40 text-sm transition-all duration-300">
                                                        <ul className="flex flex-col gap-1">
                                                            <li
                                                                onClick={() => {
                                                                    setEditGeneralArticle(true)
                                                                    setUpdateGeneralArticle(artTitle)
                                                                    setEditingCategoryIndex({ catIdx, genIdx })
                                                                }}
                                                                className="px-2 py-1 rounded flex gap-2 items-center hover:bg-gray-200">
                                                                <i className="fa-solid fa-pen"></i>Edit
                                                            </li>
                                                            <li
                                                                // onClick={() => handleDeleteGeneralArticle(catIdx, genIdx)}
                                                                onClick={() => {
                                                                    setDeleteGeneralArticle(true)
                                                                    setEditingCategoryIndex({ catIdx, genIdx });
                                                                }}
                                                                className="px-2 py-1 rounded flex gap-2 items-center hover:bg-gray-200">
                                                                <i className="fa-solid fa-trash-can"></i>Delete
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="flex-items fixed w-[350px] bottom-0 h-10 cursor-pointer bg-white py-1">
                        {!openCreateCategory && (
                            <div className="flex-items"
                                onClick={() => setOpenCreateCategory(true)}
                            >
                                <i className="fa-solid fa-circle-plus"></i>
                                <p>Create Category</p>
                            </div>
                        )}

                        {openCreateCategory && (
                            <div className="h-full w-full flex items-center gap-2">
                                <input type="text"
                                    value={newCategory}
                                    onChange={(e) => setNewCategory(e.target.value)}
                                    className="border border-gray-400 w-full h-8 rounded mt-2 px-4 text-[14px] font-semibold focus:border-green-500 outline-none focus:outline-none focus:ring-1 focus:ring-green-500 hover:border-green-500 mb-2"
                                />
                                <button onClick={handleAddCategory}>
                                    <i className="fa-solid fa-check text-green-500"></i>
                                </button>
                                <button onClick={handleCloseCategory}>
                                    <i className="fa-solid fa-xmark text-red-500"></i>
                                </button>
                            </div>
                        )}
                    </div>
                </div>


                <div className="h-full w-full p-2 bg-gray-300 overflow-y-auto">

                </div>
            </div>

            {notification.visibility && (
                <div
                    className={`fixed bottom-4 right-4 px-4 py-2 rounded shadow-md text-sm transition-opacity duration-300
          ${notification.type === 'success' ? 'bg-green-100 text-green-500 border border-green-400' : 'bg-red-100 border border-red-500 text-red-500'}`}
                >
                    {notification.message}
                </div>
            )}

        </div >
    )
}

export default Knowledge
