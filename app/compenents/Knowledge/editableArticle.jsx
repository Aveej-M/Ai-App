'use client';
import { useState, useRef, useEffect, use } from 'react';

const blockTypes = [
    { icon: <i className="fa-solid fa-t"></i>, label: 'Text', type: 'paragraph' },
    { icon: <i className="fa-solid fa-heading"></i>, label: 'Heading', type: 'heading' },
    { icon: <i className="fa-solid fa-list-ul"></i>, label: 'Unordered List', type: 'unordered-list' },
    { icon: <i className="fa-solid fa-list-ol"></i>, label: 'Ordered List', type: 'ordered-list' },
    { icon: <i className="fa-regular fa-square-check"></i>, label: 'Checklist', type: 'checklist' },
    { icon: <i className="fa-solid fa-table"></i>, label: 'Table', type: 'table' },
    { icon: <i className="fa-regular fa-image"></i>, label: 'Image', type: 'image' },
];

export default function NotionEditor() {
    const convertTypes = [
        { icon: <i className="fa-solid fa-right-left rotate-45"></i>, label: 'Convert', type: 'paragraph' },
        { icon: <i className="fa-solid fa-angle-up"></i>, label: 'Move up', type: 'paragraph' },
        { icon: <i className="fa-solid fa-xmark"></i>, label: 'Delete', type: 'paragraph' },
        { icon: <i className="fa-solid fa-angle-down"></i>, label: 'Move down', type: 'paragraph' },
    ];

    const [blocks, setBlocks] = useState([{ type: 'paragraph', content: '' }]);
    const [showMenu, setShowMenu] = useState(false);
    const [filter, setFilter] = useState('');
    const [activeIndex, setActiveIndex] = useState(0);
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const [focusIndex, setFocusIndex] = useState(null);
    const [openAlignColumn, setOpenAlignColumn] = useState(false);
    const [columnIdx, setColumnIdx] = useState(null);
    const [deleteSure, setDeleteSure] = useState(false);
    const [convertMenu, setConvertMenu] = useState(false);
    const [showHeading, setShowHeading] = useState(false);

    const menuRef = useRef(null);
    const inputRefs = useRef({});

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (
                menuRef.current &&
                !menuRef.current.contains(e.target) &&
                !e.target.closest('.align-column-trigger') // ⛔ ignore clicks on trigger
            ) {
                setShowMenu(false);
                setConvertMenu(false);
                setOpenAlignColumn(false);
                setColumnIdx(null);
            }

        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Handle global Enter key when no input is focused
    useEffect(() => {
        const handleGlobalEnter = (e) => {
            // Only trigger if Enter is pressed and no input or textarea is focused
            const isInputFocused =
                document.activeElement &&
                (document.activeElement.tagName === 'INPUT' ||
                    document.activeElement.tagName === 'TEXTAREA' ||
                    document.activeElement.isContentEditable);

            if (!isInputFocused && e.key === 'Enter') {
                e.preventDefault();
                const newBlocks = [...blocks];
                // Insert a new paragraph block at the end
                newBlocks.push({ type: 'paragraph', content: '' });
                setBlocks(newBlocks);
                // Focus the new input
                setTimeout(() => focusInput(`${newBlocks.length - 1}`), 0);
            }
        };

        window.addEventListener('keydown', handleGlobalEnter);
        return () => window.removeEventListener('keydown', handleGlobalEnter);
    }, [blocks]);


    // Move cursor focus to a specific input
    const focusInput = (key) => {
        setTimeout(() => inputRefs.current[key]?.focus(), 0);
    };

    // Handle Up/Down arrow navigation
    const handleNextLine = (e, refKeyList, currentKey) => {
        const currentIndex = refKeyList.indexOf(currentKey);
        if (currentIndex === -1) return;

        const focusInput = (key) => {
            setTimeout(() => {
                if (inputRefs.current[key]) inputRefs.current[key].focus();
            }, 0);
        };

        // 🧩 Check if it's a table key (example: "2-1-3" -> block 2, row 1, col 3)
        const keyParts = currentKey.split("-");
        const isTableKey = keyParts.length === 3;

        if (isTableKey) {
            const [blockIdx, rowIdx, colIdx] = keyParts.map(Number);

            // Move between table cells
            if (e.key === "ArrowRight") {
                e.preventDefault();
                const nextKey = `${blockIdx}-${rowIdx}-${colIdx + 1}`;
                if (inputRefs.current[nextKey]) focusInput(nextKey);
            } else if (e.key === "ArrowLeft") {
                e.preventDefault();
                const prevKey = `${blockIdx}-${rowIdx}-${colIdx - 1}`;
                if (inputRefs.current[prevKey]) focusInput(prevKey);
            } else if (e.key === "ArrowDown") {
                e.preventDefault();
                const nextRowKey = `${blockIdx}-${rowIdx + 1}-${colIdx}`;
                if (inputRefs.current[nextRowKey]) focusInput(nextRowKey);
            } else if (e.key === "ArrowUp") {
                e.preventDefault();
                const prevRowKey = `${blockIdx}-${rowIdx - 1}-${colIdx}`;
                if (inputRefs.current[prevRowKey]) focusInput(prevRowKey);
            }
            // return; // ✅ Stop here (don’t run normal block navigation)
        }

        // 🧱 Default behavior for paragraphs, lists, etc.
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            const nextKey = refKeyList[currentIndex + 1];
            if (nextKey) focusInput(nextKey);
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            const prevKey = refKeyList[currentIndex - 1];
            if (prevKey) focusInput(prevKey);
        }
    };


    const handleChange = (index, value) => {
        const newBlocks = [...blocks];
        const block = newBlocks[index];
        if (block.type === 'ordered-list' || block.type === 'unordered-list') block.items = value;
        else if (block.type === 'checklist') block.content = value;
        else block.content = value;
        setBlocks(newBlocks);
    };

    const handleAddListItem = (e, index) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            const newBlocks = [...blocks];
            newBlocks[index].items.push('');
            setBlocks(newBlocks);
            focusInput(`${index}-${newBlocks[index].items.length - 1}`);
        }
    };

    const handleListItemChange = (blockIndex, itemIndex, value) => {
        const newBlocks = [...blocks];
        newBlocks[blockIndex].items[itemIndex] = value;
        setBlocks(newBlocks);
    };

    const handleAddCheckBox = (e, index, itemIndex) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            const newBlocks = [...blocks];
            newBlocks[index].items.splice(itemIndex + 1, 0, { content: '', checked: false });
            setBlocks(newBlocks);
            focusInput(`${index}-${itemIndex + 1}`);
        }
    };

    const handleSelectType = (type) => {
        if (activeIndex === null) return;

        // We'll compute new blocks immutably
        const newBlocks = [...blocks];
        const current = newBlocks[activeIndex];

        // Should we replace current block?
        const shouldReplace =
            current &&
            current.type === 'paragraph' &&
            (current.content || '').trim() === '';

        // Create a factory to build a new block by type
        const makeBlock = (t) => {
            switch (t) {
                case 'ordered-list':
                case 'unordered-list':
                    return { type: t, items: [''] };
                case 'table':
                    return { type: t, rows: [['', ''], ['', '']] };
                case 'checklist':
                    return { type: t, items: [{ content: '', checked: false }] };
                case 'image':
                    return { type: t, file: null, preview: '' };
                default:
                    return { type: t, content: '' };
            }
        };

        let targetIndex = activeIndex;

        if (shouldReplace) {
            // Replace the current (empty paragraph) with the new block
            newBlocks[targetIndex] = makeBlock(type);
        } else {
            // Insert new block AFTER the activeIndex
            targetIndex = activeIndex + 1;
            newBlocks.splice(targetIndex, 0, makeBlock(type));
        }

        setBlocks(newBlocks);
        setShowMenu(false);

        // If we inserted/replaced an image we want to open file picker after DOM update
        if (type === 'image') {
            // Wait for the input to exist in DOM
            setTimeout(() => {
                const input = document.getElementById(`image-input-${targetIndex}`);
                if (input) input.click();
            }, 50);
        }

        // Set new active index and focus the correct input key
        setActiveIndex(targetIndex);

        // Focus keys vary by block type:
        // - table -> `${idx}-0-0`
        // - lists/checklist -> `${idx}-0`
        // - others -> `${idx}`
        setTimeout(() => {
            if (type === 'table') focusInput(`${targetIndex}-0-0`);
            else if (type === 'ordered-list' || type === 'unordered-list' || type === 'checklist')
                focusInput(`${targetIndex}-0`);
            else focusInput(`${targetIndex}`);
        }, 0);
    };

    const handleKeyDown = (e, index) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            const newBlocks = [...blocks];
            newBlocks.splice(index + 1, 0, { type: 'paragraph', content: '' });
            setBlocks(newBlocks);
            setActiveIndex(index + 1);
            focusInput(`${index + 1}`);
        }
    };

    const handleFileChange = (index, e) => {
        const file = e.target.files[0];
        if (!file) return;
        const newBlocks = [...blocks];
        newBlocks[index].file = file;
        newBlocks[index].preview = URL.createObjectURL(file);
        setBlocks(newBlocks);
    };

    const filteredTypes = blockTypes.filter((bt) =>
        bt.label.toLowerCase().includes(filter.toLowerCase())
    );

    const filteredTunes = convertTypes.filter((tu) =>
        tu.label.toLocaleLowerCase().includes(filter.toLowerCase())
    );

    const toggleMenu = (index) => {
        setOpenAlignColumn((prev) => {
            // if clicking the same column, close the menu
            if (prev && columnIdx === index) {
                setColumnIdx(null);
                return false;
            }

            // otherwise open for this column
            setColumnIdx(index);
            return true;
        });
    };


    const renderBlock = (block, index) => {
        // Show plus icon if this block is focused or hovered
        const showPlus = focusIndex === index || hoveredIndex === index;
        const plusIcon = (
            <div>
                <div
                    className={`flex items-center gap-2 text-gray-600 transition-opacity duration-150 ${showPlus ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}
                >
                    <i
                        className="fa-solid fa-plus cursor-pointer"
                        onClick={() => {
                            setShowMenu(!showMenu);
                            setActiveIndex(index);
                            setFocusIndex(index);
                        }}
                    ></i>

                    <div className="flex py-1 px-1.5 rounded hover:bg-gray-200 gap-0.5 text-gray-400 cursor-pointer hover:text-black h-fit"
                        onClick={() => {
                            setConvertMenu(!convertMenu);
                            setActiveIndex(index);
                            setFocusIndex(index);
                        }}
                    >
                        <i className="fa-solid fa-ellipsis-vertical"></i>
                        <i className="fa-solid fa-ellipsis-vertical"></i>
                    </div>


                </div>
                {showMenu && activeIndex === index && (
                    <div
                        ref={menuRef}
                        className="absolute top-5 left-5 w-64 bg-white shadow-lg rounded-lg border border-gray-200 p-2 z-50"
                    >
                        <div className="flex items-center border-b border-gray-300 pb-1 px-2 mb-1">
                            <i className="fa-solid fa-magnifying-glass"></i>
                            <input
                                type="text"
                                placeholder="Filter"
                                value={filter}
                                onChange={(e) => setFilter(e.target.value)}
                                className="w-full px-2 py-1 text-sm outline-none"
                            />
                        </div>
                        <div className="max-h-48 overflow-y-auto">
                            {filteredTypes.map((bt, i) => (
                                <div
                                    key={i}
                                    onClick={() => handleSelectType(bt.type)}
                                    className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm text-gray-700"
                                >
                                    {bt.icon}
                                    <span>{bt.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {convertMenu && activeIndex === index && (
                    <div
                        ref={menuRef}
                        className="absolute top-5 left-10 w-64 bg-white shadow-lg rounded-lg border border-gray-200 p-2 z-50"
                    >
                        <div className="flex items-center border-b border-gray-300 pb-1 px-2 mb-1">
                            <i className="fa-solid fa-magnifying-glass"></i>
                            <input
                                type="text"
                                placeholder="Filter"
                                value={filter}
                                onChange={(e) => setFilter(e.target.value)}
                                className="w-full px-2 py-1 text-sm outline-none"
                            />
                        </div>
                        <div className="max-h-48 overflow-y-auto">
                            {filteredTunes.map((tu, i) => (
                                <div
                                    key={i}
                                    onClick={() => handleSelectType(tu.type)}
                                    className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm text-gray-700"
                                >
                                    {tu.icon}
                                    <span>{tu.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        );

        // build ref key list for navigation
        const refKeyList = [];
        blocks.forEach((b, bIdx) => {
            if (b.type === 'table') {
                b.rows.forEach((r, rIdx) => {
                    r.forEach((_, cIdx) => {
                        refKeyList.push(`${bIdx}-${rIdx}-${cIdx}`);
                    });
                });
            } else if (b.type === 'unordered-list' || b.type === 'ordered-list') {
                (b.items || []).forEach((_, i) => refKeyList.push(`${bIdx}-${i}`));
            } else if (b.type === 'checklist') {
                (b.items || []).forEach((_, i) => refKeyList.push(`${bIdx}-${i}`));
            } else {
                refKeyList.push(`${bIdx}`);
            }
        });

        // build ref key list for navigation
        // const refKeyList = [];
        blocks.forEach((b, bIdx) => {
            if (b.type === 'unordered-list' || b.type === 'ordered-list') {
                (b.items || []).forEach((_, i) => refKeyList.push(`${bIdx}-${i}`));
            } else if (b.type === 'checklist') {
                (b.items || []).forEach((_, i) => refKeyList.push(`${bIdx}-${i}`));
            } else {
                refKeyList.push(`${bIdx}`);
            }
        });

        // Add group class and hover handlers to block wrapper
        const blockWrapperProps = {
            className: 'relative flex-items group',
            onMouseEnter: () => setHoveredIndex(index),
            onMouseLeave: () => setHoveredIndex(null),
        };

        const moveColumnLeft = (blockIndex, colIndex) => {
            // nothing to do if already first column or invalid
            if (colIndex == null || colIndex <= 0) return;

            setBlocks(prev => {
                // shallow copy of blocks array
                const newBlocks = prev.map(b => ({ ...b }));

                const tableBlock = newBlocks[blockIndex];
                if (!tableBlock || !Array.isArray(tableBlock.rows) || tableBlock.rows.length === 0) {
                    return prev;
                }

                const colCount = tableBlock.rows[0].length;
                if (colIndex <= 0 || colIndex >= colCount) {
                    return prev;
                }

                // create new rows with swapped columns (immutable)
                tableBlock.rows = tableBlock.rows.map(row => {
                    const newRow = [...row];                 // copy row
                    const tmp = newRow[colIndex - 1];
                    newRow[colIndex - 1] = newRow[colIndex];
                    newRow[colIndex] = tmp;
                    return newRow;
                });

                return newBlocks;
            });
        };

        const moveColumnRight = (blockIndex, colIndex) => {
            setBlocks(prev => {
                const newBlocks = prev.map(b => ({ ...b }));

                const tableBlock = newBlocks[blockIndex];
                if (!tableBlock || !Array.isArray(tableBlock.rows) || tableBlock.rows.length === 0) {
                    return prev;
                }

                const colCount = tableBlock.rows[0].length;
                if (colIndex < 0 || colIndex >= colCount - 1) {
                    return prev; // can't move the last column further right
                }

                tableBlock.rows = tableBlock.rows.map(row => {
                    const newRow = [...row];
                    const tmp = newRow[colIndex + 1];
                    newRow[colIndex + 1] = newRow[colIndex];
                    newRow[colIndex] = tmp;
                    return newRow;
                });

                return newBlocks;
            });
        };

        const handleDeleteColumn = (blockIndex, colIndex) => {
            setBlocks(prev => {
                const newBlocks = prev.map(b => ({ ...b }));

                const tableBlock = newBlocks[blockIndex];
                if (!tableBlock || !Array.isArray(tableBlock.rows) || tableBlock.rows.length === 0) {
                    return prev;
                }

                // const colCount = tableBlock.rows[0].length;
                // if (colCount <= 1) {
                //     alert("You must have at least one column.");
                //     return prev; // prevent deleting last column
                // }

                // Remove the column at colIndex for all rows
                tableBlock.rows = tableBlock.rows.map(row => {
                    const newRow = [...row];
                    newRow.splice(colIndex, 1);
                    return newRow;
                });

                return newBlocks;
            });
        };


        switch (block.type) {
            case 'heading':
                return (
                    <div key={index} {...blockWrapperProps}>
                        {plusIcon}
                        <input
                            className="w-full text-xl font-semibold outline-none border-none bg-transparent"
                            placeholder="Heading"
                            value={block.content}
                            onChange={(e) => handleChange(index, e.target.value)}
                            onKeyDown={(e) => {
                                handleNextLine(e, refKeyList, `${index}`);
                                if (e.key === 'Enter') handleKeyDown(e, index);
                            }}
                            ref={(el) => (inputRefs.current[`${index}`] = el)}
                            onFocus={() => setFocusIndex(index)}
                            onBlur={() => setFocusIndex(null)}
                        />
                    </div>
                );

            case 'unordered-list':
            case 'ordered-list':
                return (
                    <div key={index} {...blockWrapperProps} className="mb-2 relative flex items-start gap-3 group">
                        <span>{plusIcon}</span>
                        <div>
                            {(block.items || []).map((item, i) => (
                                <div key={i} className="flex items-center gap-2 mb-1">
                                    <span className="w-4">
                                        {block.type === 'unordered-list' ? '•' : `${i + 1}.`}
                                    </span>
                                    <input
                                        type="text"
                                        className="w-full outline-none border-none bg-transparent"
                                        value={item}
                                        placeholder="List item"
                                        onChange={(e) => handleListItemChange(index, i, e.target.value)}
                                        onKeyDown={(e) => {
                                            handleNextLine(e, refKeyList, `${index}-${i}`);
                                            if (e.key === 'Enter') {
                                                if (e.target.value === '') handleKeyDown(e, index);
                                                else handleAddListItem(e, index);
                                            }
                                        }}
                                        ref={(el) => (inputRefs.current[`${index}-${i}`] = el)}
                                        onFocus={() => setFocusIndex(index)}
                                        onBlur={() => setFocusIndex(null)}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                );

            case 'checklist':
                return (
                    <div key={index} {...blockWrapperProps} className="mb-2 relative flex gap-3 items-start space-y-1 group">
                        <span className="mt-1">{plusIcon}</span>
                        <div>
                            {(block.items || []).map((item, i) => (
                                <div key={i} className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        checked={item.checked || false}
                                        onChange={() => {
                                            const newBlocks = [...blocks];
                                            newBlocks[index].items[i].checked = !item.checked;
                                            setBlocks(newBlocks);
                                        }}
                                    />
                                    <input
                                        type="text"
                                        className="w-full outline-none border-none bg-transparent"
                                        placeholder="Checklist item"
                                        value={item.content}
                                        onChange={(e) => {
                                            const newBlocks = [...blocks];
                                            newBlocks[index].items[i].content = e.target.value;
                                            setBlocks(newBlocks);
                                        }}
                                        onKeyDown={(e) => {
                                            handleNextLine(e, refKeyList, `${index}-${i}`);
                                            if (e.key === 'Enter') {
                                                if (e.target.value.trim() === '') handleKeyDown(e, index);
                                                else handleAddCheckBox(e, index, i);
                                            }
                                        }}
                                        ref={(el) => (inputRefs.current[`${index}-${i}`] = el)}
                                        onFocus={() => setFocusIndex(index)}
                                        onBlur={() => setFocusIndex(null)}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                );

            case 'table':
                return (
                    <div key={index} {...blockWrapperProps} className="relative flex gap-1 mb-2 group text-start">
                        <span className="mt-1">{plusIcon}</span>

                        <div className='w-full flex flex-col items-start relative right-4'>
                            <table className="w-full table-auto flex-1 overflow-x-scroll">
                                <thead>
                                    <tr className="relative">
                                        <th></th>
                                        {block.rows[0]?.map((_, colIndex) => (

                                            <th
                                                key={colIndex}
                                                className="relative px-2 py-1 text-center font-normal group/col "
                                            >
                                                {/* Column handle (4 vertical dots) */}
                                                <div className={`gap-0.5 flex justify-center mt-1.5 ${colIndex === columnIdx ? "opacity-100" : "opacity-0"} group-hover/col:opacity-100 transition-opacity duration-200`}>
                                                    <div className='flex gap-0.5 cursor-pointer align-column-trigger'
                                                        onClick={(e) => {
                                                            e.stopPropagation(); // ⛔ prevent outside click from firing
                                                            if (openAlignColumn && columnIdx === colIndex) {
                                                                // If same column is open — close it
                                                                setOpenAlignColumn(false);
                                                                setColumnIdx(null);
                                                            } else {
                                                                // Otherwise open this one
                                                                setOpenAlignColumn(true);
                                                                setColumnIdx(colIndex);
                                                            }
                                                        }}


                                                    >
                                                        <i className="fa-solid fa-ellipsis-vertical text-gray-400 text-sm"></i>
                                                        <i className="fa-solid fa-ellipsis-vertical text-gray-400 text-sm"></i>
                                                        <div className='w-3 h-2 bg-gray-50 absolute bottom-[1px]'></div>
                                                    </div>

                                                    {openAlignColumn && colIndex === columnIdx && (
                                                        <div
                                                            ref={menuRef}
                                                            className='border border-gray-300 shadow-11 p-2 rounded absolute right-0 top-5 bg-gray-50 z-50 min-w-55'>
                                                            <div className='flex items-center justify-start gap-3 p-1 pr-3 rounded w-full hover:bg-gray-200 my-0.5 cursor-pointer'
                                                                onClick={(e) => {
                                                                    e.stopPropagation();                 // IMPORTANT: prevent outside-click closing race
                                                                    moveColumnLeft(index, colIndex);     // index = table block index in renderBlock
                                                                    setOpenAlignColumn(false);
                                                                    setColumnIdx(null);
                                                                }}
                                                            >
                                                                <i className="text-gray-500 fa-solid fa-turn-down rotate-y-180  shadow-11 px-1.5 rounded py-1 bg-white"></i>
                                                                <h1 className='text-sm text-gray-500'>Add Columns to Left</h1>
                                                            </div>
                                                            <div className='flex items-center justify-start gap-3 p-1 pr-3 rounded w-full hover:bg-gray-200 my-0.5 cursor-pointer'
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    moveColumnRight(index, colIndex); // index = current block index
                                                                    setOpenAlignColumn(false);
                                                                    setColumnIdx(null);
                                                                }}
                                                            >
                                                                <i className="text-gray-500 fa-solid fa-turn-down shadow-11 px-1.5 rounded py-1 bg-white"></i>
                                                                <h1 className='text-sm text-gray-500'>Add Columns to Right</h1>
                                                            </div>
                                                            {!deleteSure ? (
                                                                <div className='flex items-center justify-start gap-3 p-1 pr-3 rounded w-full hover:bg-gray-200 my-0.5 cursor-pointer'
                                                                    onClick={(e) => setDeleteSure(true)}
                                                                >
                                                                    <i className="text-gray-500 fa-solid fa-xmark shadow-11 px-1.5 rounded py-1 bg-white"></i>
                                                                    <h1 className='text-sm text-gray-500'>Delete Columns</h1>
                                                                </div>
                                                            ) : (
                                                                <div className={`items-center justify-start gap-3 p-1 pr-3 rounded w-full bg-red-500  my-0.5 cursor-pointer ${block.rows[0].length <= 1 ? "hidden" : "flex"}`}
                                                                    onClick={(e) => {
                                                                        setDeleteSure(false);
                                                                        e.stopPropagation();
                                                                        handleDeleteColumn(index, colIndex);
                                                                        setOpenAlignColumn(false);
                                                                        setColumnIdx(null);
                                                                    }}
                                                                >
                                                                    <i className="text-gray-500 fa-solid fa-xmark shadow-11 px-1.5 rounded py-1 bg-white"></i>
                                                                    <h1 className='text-sm text-white'>Delete Columns</h1>
                                                                </div>
                                                            )}
                                                        </div>
                                                    )}

                                                </div>
                                            </th>
                                        ))}
                                    </tr>
                                </thead>

                                <tbody>
                                    {block.rows.map((row, rowIndex) => (
                                        <tr
                                            key={rowIndex}
                                            className="relative group/row hover:bg-gray-50 transition-colors duration-150"
                                        >
                                            {/* Floating 4-dot handle — sits outside, aligned perfectly */}
                                            <td className='w-6'>
                                                <div className='gap-0.5 flex justify-center mt-1.5 opacity-0 group-hover/row:opacity-100 transition-opacity duration-200 cursor-pointer'
                                                >
                                                    <i className="fa-solid fa-ellipsis-vertical text-gray-400 text-sm"></i>
                                                    <i className="fa-solid fa-ellipsis-vertical text-gray-400 text-sm"></i>
                                                    <div className='w-3 h-2 bg-gray-50 absolute bottom-[4px] left-[6px]'></div>
                                                </div></td>

                                            {row.map((cell, cellIndex) => (
                                                <td key={cellIndex} className={`border border-l-0 last:border-r-0 group/col px-2 py-1 border-gray-300 ${columnIdx !== null && columnIdx === cellIndex ? "bg-gray-200" : ""}`}>
                                                    <input
                                                        placeholder={rowIndex === 0 && showHeading ? "Heading" : ""}
                                                        type="text"
                                                        className="w-full outline-none bg-transparent"
                                                        value={cell}
                                                        onChange={(e) => {
                                                            const newBlocks = [...blocks];
                                                            newBlocks[index].rows[rowIndex][cellIndex] = e.target.value;
                                                            setBlocks(newBlocks);
                                                        }}
                                                        onKeyDown={(e) => handleNextLine(e, refKeyList, `${index}-${rowIndex}-${cellIndex}`)}
                                                        ref={(el) => (inputRefs.current[`${index}-${rowIndex}-${cellIndex}`] = el)}
                                                        onFocus={() => setFocusIndex(index)}
                                                        onBlur={() => setFocusIndex(null)}
                                                    />
                                                </td>
                                            ))}

                                            <td
                                                className="px-2 py-1 border border-gray-300 border-r-0 border-b border-b-gray-300! text-center cursor-pointer"
                                                onClick={() => {
                                                    // Example: Add a new column to all rows
                                                    const newBlocks = [...blocks];
                                                    newBlocks[index].rows = newBlocks[index].rows.map(r => [...r, '']);
                                                    setBlocks(newBlocks);
                                                }}
                                            >
                                                {rowIndex === 0 && (
                                                    <i className="fa-solid fa-plus text-gray-400 text-xs"></i>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <div className='w-full flex'>
                                <div className='w-6 h-full'></div>
                                <div
                                    className="flex justify-start items-center cursor-pointer hover:bg-gray-100 w-full h-8 px-2"
                                    onClick={() => {
                                        const newBlocks = [...blocks];
                                        const columnCount = newBlocks[index].rows[0]?.length || 2;
                                        newBlocks[index].rows.push(Array(columnCount).fill(''));
                                        setBlocks(newBlocks);
                                    }}
                                >
                                    <i className="fa-solid fa-plus text-gray-400"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                );

            case 'image':
                return (
                    <div
                        key={index}
                        {...blockWrapperProps}
                        className="mb-2 relative flex items-start gap-3 group"
                    >
                        <span className="mt-1">{plusIcon}</span>
                        <div className="flex flex-col gap-2 w-full shadow rounded-lg">
                            {/* Hidden file input */}
                            <input
                                id={`image-input-${index}`}
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) => handleFileChange(index, e)}
                            />

                            {/* Custom upload button */}
                            {!block.preview && (
                                <label
                                    htmlFor={`image-input-${index}`}
                                    className="cursor-pointer text-sm text-gray-600 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded border border-gray-300 inline-flex items-center justify-center gap-2"
                                >
                                    <i className="fa-regular fa-image text-gray-500"></i>
                                    <span>Select an Image</span>
                                </label>
                            )}

                            {/* Image preview */}
                            {block.preview && (
                                <div className="relative w-fit">
                                    <img
                                        src={block.preview}
                                        alt="preview"
                                        className=" w-full rounded-lg border border-gray-300"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => {
                                            const newBlocks = [...blocks];
                                            newBlocks[index].file = null;
                                            newBlocks[index].preview = '';
                                            setBlocks(newBlocks);
                                        }}
                                        className="absolute top-1 right-1 bg-white/80 hover:bg-green-200 transition-all text-gray-700 rounded-full px-2 shadow-11"
                                        title="Remove image"
                                    >
                                        <i className="fa-solid fa-xmark text-xs"></i>
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                );

            default:
                return (
                    <div key={index} {...blockWrapperProps}>
                        {plusIcon}

                        <input
                            ref={(el) => (inputRefs.current[`${index}`] = el)}
                            className="w-full text-gray-800 outline-none border-none resize-none bg-transparent"
                            placeholder="Start writing your article here by typing /"
                            value={block.content}
                            onChange={(e) => handleChange(index, e.target.value)}
                            onKeyDown={(e) => {
                                handleNextLine(e, refKeyList, `${index}`);
                                if (e.key === 'Enter') handleKeyDown(e, index);
                            }}
                            onFocus={() => setFocusIndex(index)}
                            onBlur={() => setFocusIndex(null)}
                        />
                    </div>
                );
        }
    };

    return (
        <div className="relative w-full px-3 bg-gray-50">
            <div className="space-y-2">
                {blocks.map((block, index) => renderBlock(block, index))}
            </div>

            {/* {showMenu && (
                <div
                    ref={menuRef}
                    className="absolute top-16 left-20 w-64 bg-white shadow-lg rounded-lg border border-gray-200 p-2 z-50"
                >
                    <div className="flex items-center border-b border-gray-300 pb-1 mb-1">
                        <i className="fa-solid fa-magnifying-glass"></i>
                        <input
                            type="text"
                            placeholder="Filter"
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                            className="w-full px-2 py-1 text-sm outline-none"
                        />
                    </div>
                    <div className="max-h-48 overflow-y-auto">
                        {filteredTypes.map((bt, i) => (
                            <div
                                key={i}
                                onClick={() => handleSelectType(bt.type)}
                                className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm text-gray-700"
                            >
                                {bt.icon}
                                <span>{bt.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )} */}
        </div>
    );
}
