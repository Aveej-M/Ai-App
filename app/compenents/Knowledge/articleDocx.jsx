"use client";
import { useState } from "react";

const ArticleDocx = ({ categoryData, selectedArticle }) => {
    const [openTagInput, setOpenTagInput] = useState(false);
    const [tagInput, setTagInput] = useState("")
    const [isFocused, setIsFocused] = useState(false);

    const handleReset = () => {
        setTagInput("");
    }

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
    } else if (generalArticleIndex != null) {
        const generalArticle = categoryData?.[categoryIndex]?.generalArticle?.[generalArticleIndex];
        articleTitle = generalArticle?.artTitle || "Untitled Article";
        articleContent = Array.isArray(generalArticle?.artContext) ? generalArticle.artContext : [];
    }

    return (
        <div className="flex-1 h-full w-full p-6 bg-gray-50 overflow-y-auto border-l border-gray-200">
            <div className={`relative group px-10 ${openTagInput ? 'w-full' : 'w-fit'}`}>
                {!openTagInput && (
                    <div
                        onClick={() => setOpenTagInput(true)}
                        className="flex items-center gap-2 pb-1 text-xs text-gray-400 group-hover:opacity-100 opacity-0 cursor-pointer">
                        <i className="fa-solid fa-tags"></i>
                        <p>Add Tags</p>
                    </div>
                )}

                {/* SEARCH TAG BAR */}
                {openTagInput && (
                    <div className="relative flex gap-2 max-sm:mr-0 mb-1">

                        <input type="text" placeholder='Search settings'
                            value={tagInput}
                            onChange={(e) => setTagInput(e.target.value)}
                            onFocus={() => setIsFocused(true)}
                            onBlur={() => setIsFocused(false)}
                            className='border border-gray-400 w-full text-sm mt-2 py-1 px-3 rounded focus:outline-green-500 focus:border-green-500 hover:border-green-500'
                        />
                        {isFocused ?
                            <i className="fa-solid fa-magnifying-glass text-xs text-gray-400 absolute top-4 right-2"></i> :
                            <i className="fa-solid fa-chevron-down text-xs text-gray-400 absolute top-4 right-2"></i>
                        }

                        <div onClick={() => { handleReset(); setOpenTagInput(false) }} className="flex-items-2 items-center w-6 h-6 absolute top-3 -right-7">
                            <i className="fa-regular fa-circle-xmark text-black"></i>
                        </div>

                        <div className={`absolute w-full flex-items gap-1! flex-col justify-center text-gray-400 min-h-24 top-11 shadow-6 bg-white rounded origin-top transition-all duration-300 ease-out ${isFocused ?
                            'opacity-100 translate-y-0 scale-100 z-10 visible' :
                            'opacity-0 -translate-y-2 scale-100 z-0 invisible'}`}>
                            <i className="fa-solid fa-inbox text-3xl"></i>
                            <p>No Data</p>
                        </div>
                    </div>
                )}



                <h2 className="text-3xl font-semibold my-8 text-gray-900">{articleTitle}</h2>

            </div>
            <div className="prose max-w-none mt-10">
                {articleContent.length > 0
                    ? articleContent.map((block, index) => (
                        <ContentBlock key={index} block={block} />
                    ))
                    : <p>Start writing your article here by typing /</p>}
            </div>
        </div>
    );
};

/**
 * 🧩 Component to render individual content blocks
 * Each block could be: heading, paragraph, ordered list, unordered list, etc.
 */
const ContentBlock = ({ block }) => {
    if (!block || !block.type) return null;

    switch (block.type) {
        case "heading":
            return <h3 className="text-xl font-bold mt-4 mb-2">{block.content}</h3>;

        case "paragraph":
            return <p className="mb-2 leading-relaxed">{block.content}</p>;

        case "ordered-list":
            return (
                <ol className="list-decimal list-inside mb-3">
                    {block.items?.map((item, i) => <li key={i}>{item}</li>)}
                </ol>
            );

        case "unordered-list":
            return (
                <ul className="list-disc list-inside mb-3">
                    {block.items?.map((item, i) => <li key={i}>{item}</li>)}
                </ul>
            );

        default:
            return <p>{block.content || "Unsupported block type"}</p>;
    }
};

export default ArticleDocx;
