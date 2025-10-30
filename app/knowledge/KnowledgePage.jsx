'use client'
import { useState, useRef } from "react";
import CategoryList from "../compenents/Knowledge/categoryPosition";
import ArticleList from "../compenents/Knowledge/articlePosition";
import FolderList from "../compenents/Knowledge/folderPosition";
import GeneralArticleList from "../compenents/Knowledge/generalArticlePosition";
import ArticleDocx from "../compenents/Knowledge/articleDocx";
import Select from 'react-select';
import { customStyles } from '../data/selectStyle';
import Link from "next/link";

// const dataCategory = [
//     {
//         category: 'General', visibility: "all", folder: [
//             {
//                 folderName: 'General', visibility: "agents",
//                 article: [
//                     { title: 'title 1', context: 'Start writing your article here', delete: false },
//                     { title: 'title 2', context: 'Start writing your article here', delete: false },
//                     { title: 'title 3', context: 'Start writing your article here', delete: false },
//                     { title: 'title 4', context: 'Start writing your article here', delete: false },
//                 ],
//             },
//             {
//                 folderName: 'Geene', visibility: "agents",
//                 article: [
//                     { title: 'title 1', context: 'Start writing your article here' },
//                 ]
//             }
//         ],

//         generalArticle: [
//             { artTitle: 'Title 1', artContext: "" },
//             { artTitle: 'Title 2', artContext: "" },
//         ]
//     },
//     {
//         category: 'FAQs', visibility: "all", folder: [
//             {
//                 folderName: 'Getting Started ', visibility: "agents",
//                 article: [
//                     { title: 'title 1', context: 'Start writing your article here', delete: false },
//                     { title: 'title 2', context: 'Start writing your article here', delete: false },
//                     { title: 'title 3', context: 'Start writing your article here', delete: false },
//                     { title: 'title 4', context: 'Start writing your article here', delete: false },
//                 ],
//             },
//         ],
//         generalArticle: [
//             { artTitle: 'Title 1', artContext: "" },
//         ]
//     },
//     {
//         category: 'General', visibility: "all", folder: [
//             {
//                 folderName: 'FAQs', visibility: "agents",
//                 article: [
//                     { title: 'title 1', context: 'Start writing your article here', delete: false },
//                     { title: 'title 2', context: 'Start writing your article here', delete: false },
//                     { title: 'title 3', context: 'Start writing your article here', delete: false },
//                     { title: 'title 4', context: 'Start writing your article here', delete: false },
//                 ],
//             },
//         ],
//         generalArticle: [
//             { artTitle: 'Title 1', artContext: "" },
//         ]
//     },
// ]
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

const orderArticles = [
    { label: "Alphabetically (A-Z)", value: "alphabetical" },
    { label: "Creation Date (Latest to Oldest)", value: "creation_latest" },
    { label: "Creation Date (Oldest to Latest)", value: "creation_oldest" },
    { label: "Modified Date (Latest to Oldest)", value: "modified_latest" },
    { label: "Modified Date (Oldest to Latest)", value: "modified_oldest" }
];


const Knowledge = ({ dataCategory }) => {
    const [categoryData, setCategoryData] = useState(dataCategory);
    const articleDoxRef = useRef(null);

    // Save data to backend JSON file
    const saveDataToServer = async (data) => {
        try {
            const res = await fetch('/api/knowledge/Edit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            if (!res.ok) throw new Error('Failed to save');
            setNotification({ message: 'Saved!', visibility: true, type: 'success' });
            setTimeout(() => {
                setNotification((prev) => ({ ...prev, visibility: false }));
            }, 3000);
        } catch (err) {
            setNotification({ message: 'Save failed', visibility: true, type: 'error' });
            setTimeout(() => {
                setNotification((prev) => ({ ...prev, visibility: false }));
            }, 3000);
        }
    };
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
    const [notification, setNotification] = useState({ message: '', visibility: false, type: '' });
    const [folderOrder, setFolderOrder] = useState();

    // Variables of Edit Category
    const [editCategory, setEditCategory] = useState(false);
    const [newCategoryName, setNewCategoryName] = useState('');
    const [openUpdateCategoryPosition, setOpenUpdateCategoryPosition] = useState(false);
    const [visibilityCategory, setVisibilityCategory] = useState('all');
    const [deleteCategory, setDeleteCategory] = useState(false);
    const [isToggled, setIsToggled] = useState(true);

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
        const trimmedName = newCategory.trim();
        if (!trimmedName) return;
        // Check for duplicate (case-insensitive)
        const exists = categoryData.some(cat => cat.category.toLowerCase() === trimmedName.toLowerCase());
        if (exists) {
            setNotification({ message: 'Category name already exists!', visibility: true, type: 'error' });
            setTimeout(() => {
                setNotification((prev) => ({ ...prev, visibility: false }));
            }, 3000);
            return;
        }
        setCategoryData((prev) => {
            const updated = [
                {
                    category: trimmedName,
                    visibility: "all",
                    folder: [],
                    generalArticle: [],
                    type: ""
                },
                ...prev,
            ];
            // saveDataToServer(updated);
            return updated;
        });
        setNewCategory('');
        setOpenCreateCategory(false);
    }

    const handleAddNewFolder = (catIdx) => {
        if (!newFolderName.trim()) return; // prevent empty names
        setCategoryData((prev) => {
            const updated = prev.map((category, index) => {
                if (index === catIdx) {
                    return {
                        ...category,
                        folder: [
                            ...(category.folder ?? []),
                            {
                                folderName: newFolderName.trim(),
                                visibility: "agents",
                                article: [],
                                fldType: ""
                            },
                        ],
                    };
                }
                return category;
            });
            // saveDataToServer(updated);
            return updated;
        });
        setNewFolderName("");
        setAddNewFolder(false);
    };

    const handleAddGeneralArticle = (catIdx) => {
        if (!newArticleName.trim()) return;
        setCategoryData((prev) => {
            const updated = prev.map((gen, index) => {
                if (index === catIdx) {
                    return {
                        ...gen,
                        generalArticle: [
                            ...(gen.generalArticle ?? []),
                            {
                                artTitle: newArticleName.trim(),
                                artContext: [
                                    {
                                        type: "",
                                        tag: [],
                                        content: ""
                                    }
                                ],
                                artDel: false,
                                artType: "",
                            },
                        ],
                    };
                }
                return gen;
            });
            // saveDataToServer(updated);
            return updated;
        });
        setNewArticleName('');
        setAddOuterArticle(false);
        setEditingCategoryIndex(null);
    };

    const handleAddArticle = (catIdx, fIdx) => {
        setCategoryData((prev) => {
            const updated = prev.map((cat, index) => {
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
                                            title: "Untitled Article",
                                            context: [
                                                {
                                                    type: "",
                                                    tag: [],
                                                    content: "Starting to add article"
                                                }
                                            ],
                                            artDel: false,
                                            artType: "",
                                            createDate: new Date().toLocaleDateString('en-GB'),
                                            modifiedDate: ""
                                        },
                                    ],
                                };
                            }
                            return fld;
                        }),
                    };
                }
                return cat;
            });
            // saveDataToServer(updated);
            return updated;
        });
    };

    // Edit Category Name
    const handleEditCategoryName = (catIdx, newCategoryName) => {
        if (!newCategoryName.trim()) return;
        setCategoryData((prev) => {
            const updated = prev.map((category, index) => {
                if (index === catIdx) {
                    return {
                        ...category,
                        category: newCategoryName.trim(),
                        visibility: visibilityCategory,
                    };
                }
                return category;
            });
            // saveDataToServer(updated);
            return updated;
        });
        setEditCategory(false)
    };

    const handleEditFolderName = (catIdx, fldIdx, updateFolderName) => {
        if (!updateFolderName.trim()) return;
        setCategoryData((prev) => {
            const updated = prev.map((category, cIndex) => {
                if (cIndex === catIdx) {
                    return {
                        ...category,
                        folder: category.folder.map((folder, fIndex) => {
                            if (fIndex === fldIdx) {
                                const updatedFolder = {
                                    ...folder,
                                    folderName: updateFolderName.trim(),
                                    visibility: visibilityFolder,
                                    order: folderOrder || folder.order || 'alphabetical',
                                };

                                // 🧠 Apply sorting before saving
                                updatedFolder.article = sortArticles(
                                    folder.article,
                                    updatedFolder.order
                                );

                                return updatedFolder;
                            }
                            return folder;
                        }),
                    };
                }
                return category;
            });
            // saveDataToServer(updated);
            return updated;
        });
        setEditFolder(false)
        setEditingCategoryIndex(null);
    }

    const handleEditArticleName = (catIdx, fldIdx, artIdx, updateArticleName) => {
        if (!updateArticleName.trim()) return;
        setCategoryData((prev) => {
            const updated = prev.map((category, cIndex) => {
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
                                                title: updateArticleName.trim(),
                                                modifiedDate: new Date().toLocaleDateString('en-GB')
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
            });
            // saveDataToServer(updated);
            return updated;
        });
        setEditArticle(false);
        setEditingCategoryIndex(null);
    }

    const handleEditGeneralArtilceName = (catIdx, genIdx, updateGeneralArticleName) => {
        if (!updateGeneralArticleName.trim()) return;
        setCategoryData((prev) => {
            const updated = prev.map((category, cIndex) => {
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
            });
            // saveDataToServer(updated);
            return updated;
        });
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
            // saveDataToServer(updated);
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
        setCategoryData(prev => {
            const updated = prev.map((category, cIndex) => {
                if (cIndex !== catIdx) return category;
                return {
                    ...category,
                    folder: category.folder.filter((_, fIndex) => fIndex !== fldIdx)

                }
            });
            // saveDataToServer(updated);
            return updated;
        });
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
        setCategoryData(prev => {
            const updated = prev.map((category, cIndex) => {
                if (cIndex !== catIdx) return category;
                return {
                    ...category,
                    folder: category.folder.map((folder, fIndex) => {
                        if (fIndex !== fldIdx) return folder;
                        return {
                            ...folder,
                            // article: folder.article.filter((_, aIndex) => aIndex !== artIdx),
                            article: folder.article.map((article, aIndex) => {
                                if (aIndex === artIdx) {
                                    return { ...article, artDel: true };
                                }
                                return article;
                            })
                        };
                    }),
                };
            });
            // saveDataToServer(updated);
            return updated;
        });
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
        setCategoryData(prev => {
            const updated = prev.map((category, cIndex) => {
                if (cIndex !== catIdx) return category;
                return {
                    ...category,
                    // generalArticle: category.generalArticle.filter(
                    //     (_, index) => index !== genIdx
                    // ),
                    generalArticle: category.generalArticle.map((article, index) => {
                        if (index === genIdx) {
                            return { ...article, artDel: true };
                        }
                        return article;
                    }),
                };
            });
            // saveDataToServer(updated);
            return updated;
        });
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

    const updateContentInJSON = (tagsToSave) => {
        const { categoryIndex, folderIndex, articleIndex, generalArticleIndex } = selectedArticle;
        setCategoryData((prevData) => {
            const newData = JSON.parse(JSON.stringify(prevData));

            let contentBlocks = [];

            if (folderIndex != null && articleIndex != null) {
                contentBlocks = newData[categoryIndex].folder[folderIndex].article[articleIndex].context;
            } else if (generalArticleIndex != null) {
                contentBlocks = newData[categoryIndex].generalArticle[generalArticleIndex].artContext;
            }

            contentBlocks.forEach(block => {
                if (!Array.isArray(block.content)) block.content = [];
                block.content = (tagsToSave);
                // console.log(tagsToSave, "Content to save")
            });
            // console.log(contentBlocks, "COntentBlocks")

            return newData;
        });
    };

    const handleSaveType = async (newType) => {
        console.log("Red entered")
        const { categoryIndex, folderIndex, articleIndex, generalArticleIndex } = selectedArticle;
        if (articleDoxRef.current) {
            console.log("blue entered")
            const editorData = await articleDoxRef.current.save();  // Get editor data from ArticleDox
            if (editorData) {
                updateContentInJSON(editorData);  // Update categoryData with editor data
            }
            console.log(editorData, 'EditorData');
        }

        setCategoryData((prev) => {
            const updated = prev.map((cat, cIdx) => {
                if (cIdx === categoryIndex) {
                    // Editing a General Article
                    if (generalArticleIndex !== null) {
                        return {
                            ...cat,
                            generalArticle: cat.generalArticle.map((art, gIdx) =>
                                gIdx === generalArticleIndex ? { ...art, artType: newType } : art
                            ),
                        };
                    }

                    // Editing a Folder Article
                    if (folderIndex !== null && articleIndex !== null) {
                        return {
                            ...cat,
                            folder: cat.folder.map((fld, fIdx) =>
                                fIdx === folderIndex
                                    ? {
                                        ...fld,
                                        article: fld.article.map((art, aIdx) =>
                                            aIdx === articleIndex ? { ...art, artType: newType } : art
                                        ),
                                    }
                                    : fld
                            ),
                        };
                    }

                    // Editing a Folder itself
                    if (folderIndex !== null && articleIndex === null) {
                        return {
                            ...cat,
                            folder: cat.folder.map((fld, fIdx) =>
                                fIdx === folderIndex ? { ...fld, fldType: newType } : fld
                            ),
                        };
                    }

                    // Editing a Category
                    if (folderIndex === null && articleIndex === null && generalArticleIndex === null) {
                        return { ...cat, type: newType };
                    }
                }
                return cat;
            });

            // Save to server
            saveDataToServer(updated);
            return updated;
        });
    };

    const sortArticles = (articles, orderType) => {
        switch (orderType) {
            case "alphabetical":
                return [...articles].sort((a, b) => a.title.localeCompare(b.title));

            case "creation_latest":
                return [...articles].sort((a, b) => new Date(b.createDate) - new Date(a.createDate));

            case "creation_oldest":
                return [...articles].sort((a, b) => new Date(a.createDate) - new Date(b.createDate));

            case "modified_latest":
                return [...articles].sort((a, b) => new Date(b.modifiedDate) - new Date(a.modifiedDate));

            case "modified_oldest":
                return [...articles].sort((a, b) => new Date(a.modifiedDate) - new Date(b.modifiedDate));

            default:
                return articles;
        }

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

                                <label className="inline-flex items-center cursor-pointer gap-3 mt-3">
                                    <span className="ms-3 text-sm font-medium text-gray-900 ">Toggle me</span>

                                    <input type="checkbox" value={isToggled} onClick={() => setIsToggled(!isToggled)} className="sr-only peer" />
                                    <div className="relative w-7 h-4 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 dark:peer-focus:ring-green-500 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all dark:border-gray-600 peer-checked:bg-green-600 dark:peer-checked:bg-green-600"></div>
                                </label>

                            </div>
                        )}
                        {editFolder && (
                            <div className="flex flex-col gap-3 mt-3">
                                <label htmlFor="order-articles">Order Articles <span className="text-red-500"> *</span></label>
                                <Select
                                    instanceId="order-articles"
                                    options={orderArticles}
                                    value={orderArticles.find(option => {
                                        if (!editingCategoryIndex) return false;
                                        const { catIdx, fldIdx } = editingCategoryIndex;
                                        return option.value === (categoryData?.[catIdx]?.folder?.[fldIdx]?.order || 'alphabetical');
                                    })}
                                    onChange={(e) => {
                                        if (editingCategoryIndex && editingCategoryIndex.catIdx !== undefined && editingCategoryIndex.fldIdx !== undefined) {
                                            const { catIdx, fldIdx } = editingCategoryIndex;
                                            setCategoryData(prev => {
                                                const updated = prev.map((cat, cIdx) => {
                                                    if (cIdx !== catIdx) return cat;
                                                    return {
                                                        ...cat,
                                                        folder: cat.folder.map((fld, fIdx) => {
                                                            if (fIdx !== fldIdx) return fld;
                                                            return { ...fld, order: e.value };
                                                        })
                                                    };
                                                });
                                                saveDataToServer(updated);
                                                return updated;
                                            });
                                        }
                                    }}
                                    styles={customStyles}
                                />

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
                            sds={saveDataToServer}
                        /> : (openUpdateArticlePosition ? <ArticleList
                            categoryData={categoryData}
                            setCategoryData={setCategoryData}
                            setOpenUpdateArticlePosition={setOpenUpdateArticlePosition}
                            catIdx={editingCategoryIndex.catIdx}
                            fldIdx={editingCategoryIndex.fldIdx}
                            sds={saveDataToServer}
                        /> : (openUpdateFolderPosition ? <FolderList
                            categoryData={categoryData}
                            setCategoryData={setCategoryData}
                            setOpenUpdateFolderPosition={setOpenUpdateFolderPosition}
                            catIdx={editingCategoryIndex.catIdx}
                            sds={saveDataToServer}
                        /> : <GeneralArticleList
                            categoryData={categoryData}
                            setCategoryData={setCategoryData}
                            setOpenUpdateGeneralArticlePosition={setOpenUpdateGeneralArticlePosition}
                            catIdx={editingCategoryIndex.catIdx}
                            sds={saveDataToServer}
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
                    <Link href="/knowledge/bin">
                        <div className="flex-items h-10 w-10 border border-gray-400 bg-gray-100 hover:bg-gray-300 cursor-pointer rounded-3xl group">
                            <i className="fa-solid fa-box-open"></i>
                            <span className="w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-b-[10px] border-b-black absolute -bottom-2 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity"></span>
                            <div className="bg-black px-2 py-1 rounded absolute -bottom-8 text-gray-50 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity text-sm">Recycle Bin</div>
                        </div>
                    </Link>
                    <button
                        className="h-10 border hover:bg-gray-200 px-4 text-gray-400 text-sm rounded-3xl"
                        onClick={() => handleSaveType("draft")}
                    >
                        Save as Draft
                    </button>

                    <button
                        className={`h-10 border bg-green-500 hover:bg-green-600 px-4 text-sm rounded-3xl text-white ${dataCategory === categoryData ? "cursor-not-allowed!" : "cursor-pointer"}`}
                        // onClick={() => { if (dataCategory !== categoryData) { handleSaveType("publish") } }}
                        onClick={() => { handleSaveType("publish") }}
                    >
                        Save & Publish
                    </button>

                </div>
            </div>

            <div className="flex-1 flex flex-row gap-2 relative">
                {/* Left Area */}
                <div className="w-[350px] min-w-[350px] relative bg-gray-200 flex flex-col h-auto">
                    <div className="flex-1 absolute w-full overflow-y-auto p-5 h-full scrollbar-color-2">
                        {categoryData.map(({ category, folder, generalArticle, type }, catIdx) => (
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

                                <div className={`flex ${isToggled ? 'flex-col' : 'flex-col-reverse'}`}>
                                    {openCategories.includes(catIdx) && folder.map((fld, fldIdx) => (
                                        < div className="" key={fldIdx}>
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
                                                        {sortArticles(fld.article, fld.order).map(({ title, artDel }, artIdx) => (
                                                            <div
                                                                key={artIdx}
                                                                className={`${!artDel ? 'block' : 'hidden!'} justify-items w-full group px-3 py-1 cursor-pointer ${selectedArticle.categoryIndex === catIdx &&
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
                                    <div className="pt-1">
                                        {generalArticle.map(({ artTitle, artDel }, genIdx) => (
                                            <div key={genIdx}
                                                className={`${!artDel ? 'block' : 'hidden!'} justify-items w-full group px-3 py-1 mb-1 rounded cursor-pointer hover:bg-gray-300 ${selectedArticle.categoryIndex === catIdx && selectedArticle.generalArticleIndex === genIdx ? 'bg-gray-300' : 'bg-none'}`}
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

                {/* Right Area */}
                <ArticleDocx
                    ref={articleDoxRef}
                    categoryData={categoryData}
                    setCategoryData={setCategoryData}
                    selectedArticle={selectedArticle}
                    setSelectedArticle={setSelectedArticle}
                    handleEditArticleName={handleEditArticleName}
                    handleEditGeneralArtilceName={handleEditGeneralArtilceName}
                    updateContentInJSON={updateContentInJSON}
                />
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
