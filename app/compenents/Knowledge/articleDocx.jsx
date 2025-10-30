"use client";
import { useState, useEffect, forwardRef, useRef, useImperativeHandle } from "react";
import EditableArticle from "./editibleArticle2";

const ArticleDocx = forwardRef(({ categoryData, setCategoryData, selectedArticle, setSelectedArticle, handleEditArticleName, handleEditGeneralArtilceName, updateContentInJSON }, ref) => {
    const [openTagInput, setOpenTagInput] = useState(false);
    const [tagInput, setTagInput] = useState('');
    const [tags, setTags] = useState([]);
    const [isFocused, setIsFocused] = useState(false);
    const [isEditingTitle, setIsEditingTitle] = useState(false);
    const [editTitleValue, setEditTitleValue] = useState("");
    const titleInputRef = useRef(null);
    const tagInputRef = useRef(null);
    const dropdownRef = useRef(null);
    const editorRef = useRef(null);

    useImperativeHandle(ref, () => ({
        async save() {
            console.log("Redddd")
            if (editorRef.current) {
                try {
                    const editorData = await editorRef.current.save();  // Get data from EditableArticle
                    console.log(editorData, "EDITOR")
                    if (editorData) {
                        updateContentInJSON(editorData);  // Pass data to GrandParent's save function
                        console.log(editorData, "EDITOR")
                    }
                } catch (e) {
                    console.error('Error saving data:', e);
                }
            }
        },
    }));

    useEffect(() => {
        if (isEditingTitle && titleInputRef.current) {
            titleInputRef.current.focus();
        }
    }, [isEditingTitle]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                tagInputRef.current &&
                !tagInputRef.current.contains(event.target) &&
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setIsFocused(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    useEffect(() => {
        if (!selectedArticle || (selectedArticle.articleIndex === null && selectedArticle.generalArticleIndex === null)) {
            setTags([]);
            return;
        }
        const { categoryIndex, folderIndex, articleIndex, generalArticleIndex } = selectedArticle;
        let tagArr = [];
        if (folderIndex != null && articleIndex != null) {
            const article = categoryData?.[categoryIndex]?.folder?.[folderIndex]?.article?.[articleIndex];
            // Collect tags from all blocks, flatten, and deduplicate
            if (Array.isArray(article?.context)) {
                tagArr = [...new Set(article.context.flatMap(block => block.tag || []))];
            }
        } else if (generalArticleIndex != null) {
            const generalArticle = categoryData?.[categoryIndex]?.generalArticle?.[generalArticleIndex];
            if (Array.isArray(generalArticle?.artContext)) {
                tagArr = [...new Set(generalArticle.artContext.flatMap(block => block.tag || []))];
            }
        }
        setTags(
            tagArr.filter(tag => typeof tag === "string" && tag.trim() !== "").map(tag => tag.trim())
        );
    }, [selectedArticle, categoryData]);

    const handleReset = () => {
        setTagInput("");
    }

    const updateTagsInJSON = (tagsToSave, action) => {
        setCategoryData((prevData) => {
            const newData = JSON.parse(JSON.stringify(prevData));

            let articleBlocks = [];

            if (folderIndex != null && articleIndex != null) {
                articleBlocks = newData[categoryIndex].folder[folderIndex].article[articleIndex].context;
            } else if (generalArticleIndex != null) {
                articleBlocks = newData[categoryIndex].generalArticle[generalArticleIndex].artContext;
            }

            articleBlocks.forEach(block => {
                if (!Array.isArray(block.tag)) block.tag = [];
                if (action === "add" && !block.tag.includes(tagsToSave)) {
                    block.tag.push(tagsToSave);   // add tag
                } else if (action === "remove") {
                    block.tag = block.tag.filter(t => t !== tagsToSave); // remove tag
                }
            });

            return newData;
        });
    };

    const handleSelectTag = (tag) => {
        if (!tag) return;
        if (!tags.includes(tag)) {
            const newTags = [...tags, tag];
            setTags(newTags);
            updateTagsInJSON(tag, "add");
        }
        setTagInput("");
    };

    const filteredTags = tags.filter(
        tag => typeof tag === "string" && tag.toLowerCase().includes(tagInput.toLowerCase())
    );


    const handleRemoveTag = (tagToRemove) => {
        setTags((prev) => prev.filter((t) => t !== tagToRemove));
        updateTagsInJSON(tagToRemove, "remove");
    };

    if (!selectedArticle || (selectedArticle.articleIndex === null && selectedArticle.generalArticleIndex === null)) {
        return (
            <div className="flex-1 h-full w-full p-4 bg-gray-100 text-gray-500 flex items-center justify-center">
                Select an article to view its details.
            </div>
        );
    }

    const { categoryIndex, folderIndex, articleIndex, generalArticleIndex } = selectedArticle;

    let articleTitle = "";
    let articleContent = [];

    if (folderIndex != null && articleIndex != null) {
        const article = categoryData?.[categoryIndex]?.folder?.[folderIndex]?.article?.[articleIndex];
        articleTitle = article?.title || "Untitled Article";
        articleContent = Array.isArray(article?.context) ? article.context : [];
        console.log(articleContent.length, 'ArticleContent')
        console.log(articleContent, 'ArticleContent')

    } else if (generalArticleIndex != null) {
        const generalArticle = categoryData?.[categoryIndex]?.generalArticle?.[generalArticleIndex];
        articleTitle = generalArticle?.artTitle || "Untitled Article";
        articleContent = Array.isArray(generalArticle?.artContext) ? generalArticle.artContext : [];
    }

    const handleNavigate = (direction) => {
        const { categoryIndex, folderIndex, articleIndex, generalArticleIndex } = selectedArticle;

        // 🧭 Folder-based articles
        if (folderIndex != null && articleIndex != null) {
            const articles = categoryData?.[categoryIndex]?.folder?.[folderIndex]?.article || [];
            const newIndex = direction === 'next' ? articleIndex + 1 : articleIndex - 1;

            if (newIndex >= 0 && newIndex < articles.length) {
                // ✅ Update parent-selected article
                setSelectedArticle({
                    categoryIndex,
                    folderIndex,
                    articleIndex: newIndex,
                    generalArticleIndex: null,
                });
            }
        }

        // 🧭 General articles
        else if (generalArticleIndex != null) {
            const generalArticles = categoryData?.[categoryIndex]?.generalArticle || [];
            const newIndex = direction === 'next' ? generalArticleIndex + 1 : generalArticleIndex - 1;

            if (newIndex >= 0 && newIndex < generalArticles.length) {
                setSelectedArticle({
                    categoryIndex,
                    folderIndex: null,
                    articleIndex: null,
                    generalArticleIndex: newIndex,
                });
            }
        }
    };





    return (
        <div className="h-auto relative flex-1 w-full bg-gray-50 border-l border-gray-200">
            <div className="flex-1 overflow-y-auto absolute p-5 w-[-webkit-fill-available] h-[-webkit-fill-available]" style={{ scrollbarColor: 'var(--color-green-200) var(--color-gray-50)' }}>
                <div className={`relative group px-10 ${openTagInput ? 'w-full' : 'w-fit'}`} ref={tagInputRef}>
                    {!openTagInput && tags.length === 0 ? (
                        <div
                            onClick={() => setOpenTagInput(true)}
                            className="flex items-center gap-2 pb-1 text-xs text-gray-400 group-hover:opacity-100 opacity-0 cursor-pointer">
                            <i className="fa-solid fa-tags"></i>
                            <p>Add Tags</p>
                        </div>
                    ) : (!openTagInput && (
                        <div className="flex items-center mb-6">
                            {tags.map((tag, i) => (
                                <span
                                    key={i}
                                    className="flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 rounded text-xs mr-1 border border-green-500"
                                >

                                    <i className="fa-solid fa-tags cursor-pointer"></i>

                                    {tag}
                                </span>
                            ))}
                            <div onClick={() => setOpenTagInput(true)} className="cursor-pointer">
                                <i className="fa-solid fa-pencil text-gray-400 hover:text-green-500 transition-all ml-2"></i>
                            </div>
                        </div>
                    ))}

                    {/* SEARCH TAG BAR */}
                    {openTagInput && (
                        <div className="relative flex gap-2 max-sm:mr-0 mb-1">
                            <div className={`flex flex-wrap items-center border border-gray-400 w-full text-sm mt-2 mb-8 px-2 rounded focus-within:border-green-500 hover:border-green-500`}
                                onClick={() => setIsFocused(!isFocused)}
                            >
                                {tags.map((tag, i) => (
                                    <span
                                        key={i}
                                        className="flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 rounded text-xs mr-1"
                                    >
                                        {tag}
                                        <button
                                            type="button"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                // setTags(tags.filter((_, index) => index !== i));
                                                const tagToRemove = tags[i];
                                                setTags(tags.filter((_, index) => index !== i));
                                                updateTagsInJSON(tagToRemove, "remove");
                                            }}
                                        >
                                            <i className="fa-solid fa-xmark text-[10px]"></i>
                                        </button>
                                    </span>
                                ))}

                                <input
                                    type="text"
                                    placeholder={tags.length === 0 ? "Search settings" : ""}
                                    value={tagInput}
                                    onChange={(e) => setTagInput(e.target.value)}
                                    // onFocus={() => setIsFocused(true)}
                                    // onBlur={() => setIsFocused(false)}
                                    className="flex-1 outline-none border-none text-sm py-1 px-1 min-w-[100px]"
                                />
                            </div>

                            {isFocused ?
                                <i className="fa-solid fa-magnifying-glass text-xs text-gray-400 absolute top-4 right-2"></i> :
                                <i className="fa-solid fa-chevron-down text-xs text-gray-400 absolute top-4 right-2"></i>
                            }

                            <div onClick={() => { handleReset(); setOpenTagInput(false) }} className="flex-items-2 items-center w-6 h-6 absolute top-3 -right-7 cursor-pointer">
                                <i className="fa-regular fa-circle-xmark text-black hover:text-green-500 transition-all"></i>
                            </div>

                            <div
                                ref={dropdownRef}
                                className={`absolute w-full flex-items gap-1! flex-col justify-center text-gray-400 top-11 shadow-6 bg-white rounded origin-top transition-all duration-300 ease-out ${isFocused ?
                                    'opacity-100 translate-y-0 scale-100 z-10 visible' :
                                    'opacity-0 -translate-y-2 scale-100 z-0 invisible'}`}
                            >
                                {tagInput.length === 0 && tags.length === 0 ? (
                                    <div className="flex flex-col items-center py-6">
                                        <i className="fa-solid fa-inbox text-3xl mb-1"></i>
                                        <p>No Data</p>
                                    </div>
                                ) : (
                                    <div className="w-full text-left py-0.5 px-1">
                                        {tagInput.trim() !== "" && (
                                            <div onMouseDown={() => handleSelectTag(tagInput.trim())}
                                                className="py-1 px-2 hover:bg-gray-100 cursor-pointer text-sm text-gray-700 rounded"
                                            >
                                                {tagInput}
                                            </div>
                                        )}

                                        {tags.length > 0 && (
                                            <>
                                                {filteredTags.map((tag, i) => (
                                                    <div key={i}
                                                        onMouseDown={(e) => {
                                                            // prevent input blur while removing
                                                            e.preventDefault();
                                                            handleRemoveTag(tag);
                                                        }}
                                                        className="py-1 px-2 my-0.5 flex items-center justify-between bg-green-100 rounded text-sm text-gray-700 cursor-pointer">
                                                        <span>{tag}</span>

                                                        <button

                                                            className="text-xs text-red-500 ml-2"
                                                        >
                                                            ✕
                                                        </button>
                                                    </div>
                                                ))}
                                            </>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    <div className="mb-8 w-full">
                        {isEditingTitle ? (
                            <input
                                ref={titleInputRef}
                                type="text"
                                value={editTitleValue}
                                onChange={(e) => setEditTitleValue(e.target.value)}
                                onBlur={() => {
                                    if (editTitleValue.trim() !== "") {
                                        if (folderIndex != null && articleIndex != null) {
                                            // Normal article
                                            handleEditArticleName(categoryIndex, folderIndex, articleIndex, editTitleValue);
                                        } else if (generalArticleIndex != null) {
                                            // General article
                                            handleEditGeneralArtilceName(categoryIndex, generalArticleIndex, editTitleValue);
                                        }
                                    }
                                    setIsEditingTitle(false);
                                }}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        e.target.blur(); // triggers onBlur
                                    }
                                }}
                                className="text-3xl font-semibold w-full outline-none bg-transparent text-gray-900"
                            />
                        ) : (
                            <h2
                                className="text-3xl font-semibold mb-2 text-gray-900 cursor-text"
                                onMouseDown={(e) => e.stopPropagation()}
                                onClick={() => {
                                    setIsEditingTitle(true);
                                    setEditTitleValue(articleTitle);
                                }}
                            >
                                {articleTitle}
                                {/* <i className="fa-solid fa-pencil text-gray-400 text-sm ml-2 opacity-0 group-hover:opacity-100"></i> */}
                            </h2>
                        )}
                    </div>

                </div>

                <div className="prose max-w-none mt-10 ml-3 pb-15">
                    {articleContent.length > 0
                        ? articleContent.map((block, index) => (
                            // <ContentBlock key={index} block={block} />
                            <EditableArticle
                                key={index}
                                ref={editorRef}
                                content={block}
                                setCategoryData={setCategoryData}
                                selectedArticle={selectedArticle}
                                updateContentInJSON={updateContentInJSON}
                            />
                            // <SlateEditor key={index} />
                        ))
                        : <p>Start writing your article here by typing /</p>}
                </div>

                {/* <div className="px-15">
                    <div className="flex justify-between items-center shadow-11 hover:shadow-2xl cursor-pointer px-5 py-5 rounded">
                        <div>
                            <p className="text-sm">Next</p>
                            <h3 className="text-[18px] font-bold">{articleTitle}</h3>
                        </div>
                        <i className="fa-solid fa-arrow-right text-[20px]"></i>
                    </div>
                </div> */}
                <div className="px-15 flex justify-between gap-5 mt-10">
                    {/* PREVIOUS BUTTON */}
                    <div
                        onClick={() => handleNavigate('prev')}
                        className={`flex-1 flex justify-between items-center border border-gray-200 hover:shadow-lg cursor-pointer px-5 py-5 rounded transition-all duration-200 ${((folderIndex != null && articleIndex === 0) || (generalArticleIndex === 0)) ? 'hidden' : ''}`}
                    >
                        <i className="fa-solid fa-arrow-left text-[20px]"></i>
                        <div>
                            <p className="text-sm">Previous</p>
                            <h3 className="text-[18px] font-bold">
                                {(() => {
                                    if (folderIndex != null && articleIndex > 0) {
                                        return categoryData?.[categoryIndex]?.folder?.[folderIndex]?.article?.[articleIndex - 1]?.title || '—';
                                    } else if (generalArticleIndex > 0) {
                                        return categoryData?.[categoryIndex]?.generalArticle?.[generalArticleIndex - 1]?.artTitle || '—';
                                    }
                                    return '—';
                                })()}
                            </h3>
                        </div>
                    </div>

                    {/* NEXT BUTTON */}
                    <div
                        onClick={() => handleNavigate('next')}
                        className={`flex-1 flex justify-between items-center border border-gray-200 hover:shadow-lg cursor-pointer px-5 py-5 rounded transition-all duration-200
      ${(() => {
                                const nextFolderArticles = categoryData?.[categoryIndex]?.folder?.[folderIndex]?.article?.length || 0;
                                const nextGeneralArticles = categoryData?.[categoryIndex]?.generalArticle?.length || 0;
                                if ((folderIndex != null && articleIndex === nextFolderArticles - 1) ||
                                    (generalArticleIndex === nextGeneralArticles - 1)) return 'hidden';
                                return '';
                            })()}`}
                    >
                        <div>
                            <p className="text-sm">Next</p>
                            <h3 className="text-[18px] font-bold">
                                {(() => {
                                    if (folderIndex != null) {
                                        return categoryData?.[categoryIndex]?.folder?.[folderIndex]?.article?.[articleIndex + 1]?.title || '—';
                                    } else if (generalArticleIndex != null) {
                                        return categoryData?.[categoryIndex]?.generalArticle?.[generalArticleIndex + 1]?.artTitle || '—';
                                    }
                                    return '—';
                                })()}
                            </h3>
                        </div>
                        <i className="fa-solid fa-arrow-right text-[20px]"></i>
                    </div>
                </div>

            </div>
        </div >
    );
});



export default ArticleDocx;
