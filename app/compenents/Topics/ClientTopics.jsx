'use client';
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { topicTable } from "../../data/actionTable";

const ClientTopics = ({ topicData: initialData, showForm, setShowForm, setTopicId, setShowTopics }) => {
    const [menuIndex, setMenuIndex] = useState(null);
    const [topicData, setTopicData] = useState(initialData);
    const [sortOrder, setSortOrder] = useState('asc');
    const [searchInput, setSearchInput] = useState('');
    const [filteredData, setFilteredData] = useState(initialData);
    const [wrapper, setWrapper] = useState(0);
    const [textWrapper, setTextWrapper] = useState(true);
    const [nameWrapper, setNameWrapper] = useState(true);
    const [dateWrapper, setDateWrapper] = useState(true);
    const [creatorWrapper, setCreatorWrapper] = useState(true);
    const [activeSort, setActiveSort] = useState({ key: 'Topic Label', order: 'asc' });
    const [notification, setNotification] = useState({
        message: '',
        visibility: false,
        type: '', // 'success' | 'error'
    });
    const [sortOrders, setSortOrders] = useState({
        'Topic Label': 'asc',       // null, 'asc', or 'desc'
        'Last Modified': 'asc',
        'Created By': 'asc'
    });

    const wrapperStates = {
        nameWrapper: [nameWrapper, setNameWrapper],
        textWrapper: [textWrapper, setTextWrapper],
        dateWrapper: [dateWrapper, setDateWrapper],
        creatorWrapper: [creatorWrapper, setCreatorWrapper],
    };
    // console.log(textWrapper, "text wrapper")
    // console.log(nameWrapper, "name wrapper")
    console.log(wrapperStates, "Wrapper States")


    const menuRefs = useRef([]);
    const router = useRouter();

    // Handle click outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            // Check if the clicked target is not the menu or the three dots button
            if (menuIndex !== null) {
                const menu = menuRefs.current[menuIndex];
                const threeDotsButton = document.querySelector(
                    `[data-menu-index="${menuIndex}"]`
                );

                if (
                    menu &&
                    !menu.contains(event.target) &&
                    (!threeDotsButton || !threeDotsButton.contains(event.target))
                ) {
                    setMenuIndex(null);
                }
            }


        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [menuIndex]);

    useEffect(() => {
        const wrapperClickOutside = () => {
            if (wrapper !== 0) {
                setTimeout(() => {
                    setWrapper(0);

                }, 300)
            }
        }

        document.addEventListener('mousedown', wrapperClickOutside);
        return () => {
            document.removeEventListener('mousedown', wrapperClickOutside);
        }

    })

    // useEffect(() => {
    //     if (searchInput.trim() === '') {
    //         const sorted = [...topicData].sort((a,b) => {
    //         const dateA = a.name.toLowerCase();
    //         const dateB = b.name.toLowerCase();
    //         if(sortOrder === 'asc'){
    //             return dateA.localeCompare(dateB);
    //         }else{
    //             return dateB.localeCompare(dateA);
    //         }
    //     });
    //     setFilteredData(sorted);
    //     // setFilteredData(topicData);
    //     } else {
    //     const filtered = topicData.filter((item) =>
    //         item.name.toLowerCase().includes(searchInput.toLowerCase())
    //     );
    //     setFilteredData(filtered);
    //     }
    // }, [searchInput, topicData]);



    const handleReset = () => {
        setSearchInput('');
        setTextWrapper(true);
        setDateWrapper(true);
        setNameWrapper(true);
        setCreatorWrapper(true);
    }


    const handleDelete = async (indexToDelete, name) => {
        try {
            const res = await fetch('/api/delete-action', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name }),
            });

            if (res.ok) {
                // ✅ Use unique key (name or id) instead of index
                setTopicData(prev => prev.filter(item => item.name !== name));
                setFilteredData(prev => prev.filter(item => item.name !== name));

                setNotification({
                    message: 'Deleted successfully!',
                    visibility: true,
                    type: 'success',
                });
            } else {
                const text = await res.text();
                setNotification({
                    message: text || 'Delete failed.',
                    visibility: true,
                    type: 'error',
                });
            }

            setTimeout(() => {
                setNotification({ message: '', visibility: false, type: '' });
            }, 3000);

            router.refresh();
        } catch (err) {
            console.error('Error deleting:', err);
            setNotification({
                message: 'Something went wrong!',
                visibility: true,
                type: 'error',
            });
            setTimeout(() => {
                setNotification({ message: '', visibility: false, type: '' });
            }, 3000);
        }
        setMenuIndex(null);
    };


    // const handleSort = (key) => {
    // // Map display label to actual object key
    //     const dataKeyMap = {
    //         'Topic Label': 'name',
    //         'Last Modified': 'savedAt',
    //         'Created By': 'createdBy'
    //     };

    //     const dataKey = dataKeyMap[key] || key;
    //     const currentOrder = sortOrders[key] === 'asc' ? 'desc' : 'asc';
    //     const sorted = [...topicData].sort((a, b) => {
    //             const valA = (a[dataKey] || '').toString().toLowerCase();
    //             const valB = (b[dataKey] || '').toString().toLowerCase();

    //             return currentOrder === 'asc'
    //                 ? valA.localeCompare(valB)
    //                 : valB.localeCompare(valA);
    //     });

    //     setTopicData(sorted);
    //     setFilteredData(sorted);
    //     setSortOrders(prev => ({ ...prev, [key]: currentOrder }));
    //     setActiveSort({ key, order: currentOrder });
    // };

    useEffect(() => {
        let data = [...topicData];

        if (searchInput.trim() !== '') {
            // Filter first
            data = data.filter((item) =>
                item.name?.toLowerCase().includes(searchInput.toLowerCase())
            );
        }

        // Sort by activeSort if set
        if (activeSort?.key) {
            const { key, order } = activeSort;
            const dataKeyMap = {
                'Topic Label': 'name',
                'Last Modified': 'savedAt',
                'Created By': 'createdBy'
            };
            const dataKey = dataKeyMap[key] || key;

            data.sort((a, b) => {

                const valA = a[dataKey] ?? '';
                const valB = b[dataKey] ?? '';

                // Date sort if value looks like a date
                if (!isNaN(Date.parse(valA)) && !isNaN(Date.parse(valB))) {
                    return order === 'asc'
                        ? new Date(valA).getTime() - new Date(valB).getTime()
                        : new Date(valB).getTime() - new Date(valA).getTime();
                }

                // String sort
                return order === 'asc'
                    ? valA.toString().toLowerCase().localeCompare(valB.toString().toLowerCase())
                    : valB.toString().toLowerCase().localeCompare(valA.toString().toLowerCase());

            });
        }
        setFilteredData(data);
    }, [searchInput, topicData, activeSort]);

    const handleSort = (key) => {
        const currentOrder = activeSort?.key === key && activeSort?.order === 'asc' ? 'desc' : 'asc';
        setSortOrders(prev => ({ ...prev, [key]: currentOrder }));
        setActiveSort({ key, order: currentOrder });
    };



    const sortByDate = () => {
        const sorted = [...topicData].sort((a, b) => {
            const dateA = a.savedAt.toLowerCase();
            const dateB = b.savedAt.toLowerCase();
            if (sortOrder === 'asc') {
                return dateB.localeCompare(dateA);
            } else {
                return dateA.localeCompare(dateB);
            }
        });
        setTopicData(sorted);
        setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
    }

    const sortByName = () => {
        const sorted = [...topicData].sort((a, b) => {
            const dateA = a.name.toLowerCase();
            const dateB = b.name.toLowerCase();
            if (sortOrder === 'asc') {
                return dateA.localeCompare(dateB);
            } else {
                return dateB.localeCompare(dateA);
            }
        });
        setFilteredData(sorted);
        setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
    }

    return (
        <div>
            <div className={`relative flex gap-2 my-4 max-sm:mr-0 px-5 ${!showForm && 'max-w-[400px]'}`}>
                <i className="fa-solid fa-magnifying-glass text-gray-500 absolute top-4.5 left-7"></i>
                <input type="text" placeholder='Search topics...'
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    className='border border-gray-400 w-full mt-2 py-1 px-3 pl-8 rounded focus:outline-green-500 focus:border-green-500 hover:border-green-500'
                />
                <div
                    onClick={handleReset}
                    tabIndex={0} // makes div focusable
                    className="border border-gray-500 rounded w-fit items-center group flex mt-2 px-2 pt-1 
                hover:border-green-500 cursor-pointer 
                focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                >
                    <i className="fa-solid fa-arrow-rotate-right text-gray-500 group-hover:text-green-500 group-focus:text-green-500 outline-0 "></i>
                </div>
            </div>
            <div className={`w-full min-h-[500]`}>

                <p className="px-5">
                    {filteredData.length} items •
                    {activeSort.key
                        ? ` Sorted by ${activeSort.key} (${activeSort.order})`
                        : "Not sorted"}
                </p>


                {filteredData.length === 0 && (

                    <div className="flex-items-2 flex-col min-h-100">
                        <Image
                            className="w-20"
                            src="/folder.png"
                            alt="No data"
                            width={40}
                            height={40}
                        />
                        <p className="text-gray-400">No data</p>
                    </div>
                )}

                {filteredData.length > 0 && (
                    <div className=" flex min-h-[400] mt-3 overflow-x-auto max-sm:mr-0 scrollbar-hide">
                        <table className={`text-left h-fit table-auto ${showForm ? 'w-full min-w-[900px]' : 'w-[400px]'} md:table`}>
                            <thead>
                                <tr className="bg-gray-200 h-10">
                                    {!showForm && (
                                        <th
                                            className={`${'Topic Label' === 'Last Modified' ? 'w-[200px]' : 'min-w-[150px] max-w-[200px]'} ${'Topic Label' === 'Description' ? 'cursor-auto' : 'cursor-pointer'} group h-10 relative hover:bg-white border-r-2 border-b border-gray-400 pl-2.5`}
                                        >
                                            <div className="flex items-center gap-3"
                                                {...(1 !== 2 ? { onClick: () => handleSort('Topic Label') } : {})}
                                            >
                                                <span>{'Topic Label'}</span>
                                                {1 !== 2 && (
                                                    <div className="flex-items cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-200 ">
                                                        <i className={`text-green-500 ${sortOrders['Topic Label'] === 'asc' ? 'fa-solid fa-arrow-up' : 'fa-solid fa-arrow-down text-gray-300'}`} onClick={() => handleSort('Topic Label')}></i>
                                                    </div>
                                                )}
                                            </div>
                                            <div>
                                                <i className={`fa-solid fa-chevron-down text-[18px] text-gray-500 hover:text-green-500 cursor-pointer absolute right-3 top-3 `}
                                                    onClick={() => wrapper === 0 ? setWrapper(1) : setWrapper(0)}
                                                ></i>
                                                {wrapper === 1 && (
                                                    <div
                                                        className='absolute right-5 border-2 border-gray-400 rounded p-[3] text-gray-500 flex flex-col bg-white cursor-pointer gap-1 shadow-19'
                                                    >
                                                        <p className={`w-full px-[20] py-[5] rounded-[3] border-2 border-gray-100 hover:border-2 hover:border-green-500 ${!nameWrapper && 'border-2 border-green-500 bg-green-100'} `}
                                                            onClick={() => setNameWrapper(false)}
                                                        >Wrap Text</p>
                                                        <p
                                                            className={`w-full px-[20] py-[5] rounded-[3] border-2 border-gray-100 shadow hover:border-2 hover:border-green-500 ${nameWrapper && 'border-2 border-green-500 bg-green-100'} `}
                                                            onClick={() => setNameWrapper(true)}
                                                        >Clip Text</p>
                                                    </div>
                                                )}
                                            </div>

                                        </th>
                                    )}

                                    {showForm && topicTable.map(({ name, wrapNo, stateKey }, index) => {
                                        const [wrapValue, setWrapValue] = wrapperStates[stateKey];
                                        return (
                                            <th
                                                key={index}
                                                className={`${name === 'Last Modified' ? 'w-[200px]' : 'min-w-[150px] max-w-[200px]'} ${name === 'Description' ? 'cursor-auto' : 'cursor-pointer'} group h-10 relative hover:bg-white border-r-2 border-b border-gray-400 pl-2.5`}
                                            >
                                                <div className="flex items-center gap-3"
                                                    {...(wrapNo !== 2 ? { onClick: () => handleSort(name) } : {})}
                                                >
                                                    <span>{name}</span>
                                                    {wrapNo !== 2 && (
                                                        <div className="flex-items cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-200 ">
                                                            <i className={`text-green-500 ${sortOrders[name] === 'asc' ? 'fa-solid fa-arrow-up' : 'fa-solid fa-arrow-down text-gray-300'}`} onClick={() => handleSort(name)}></i>
                                                        </div>
                                                    )}
                                                </div>
                                                <div>
                                                    <i className={`fa-solid fa-chevron-down text-[18px] text-gray-500 hover:text-green-500 cursor-pointer absolute right-3 top-3 `}
                                                        onClick={() => wrapper === 0 ? setWrapper(wrapNo) : setWrapper(0)}
                                                    ></i>
                                                    {wrapper === wrapNo && (
                                                        <div
                                                            className='absolute right-5 border-2 border-gray-400 rounded p-[3] text-gray-500 flex flex-col bg-white cursor-pointer gap-1 shadow-19'
                                                        >
                                                            <p className={`w-full px-[20] py-[5] rounded-[3] border-2 border-gray-100 hover:border-2 hover:border-green-500 ${!wrapValue && 'border-2 border-green-500 bg-green-100'} `}
                                                                onClick={() => setWrapValue(false)}
                                                            >Wrap Text</p>
                                                            <p
                                                                className={`w-full px-[20] py-[5] rounded-[3] border-2 border-gray-100 shadow hover:border-2 hover:border-green-500 ${wrapValue && 'border-2 border-green-500 bg-green-100'} `}
                                                                onClick={() => setWrapValue(true)}
                                                            >Clip Text</p>
                                                        </div>
                                                    )}
                                                </div>

                                            </th>
                                        )
                                    })}
                                    <th className="w-[50px] hover:bg-white border-b border-gray-400"></th>

                                </tr>
                            </thead>

                            <tbody>
                                {filteredData.map(({ name, description, id, savedAt, createdBy }, index) => (
                                    <tr key={id} className="border h-8.5 border-gray-300 hover:bg-gray-200 hover:border-y-2 hover:border-y-gray-400">
                                        <td className={`max-w-[200] pl-2 ${nameWrapper && ('truncate whitespace-nowrap overflow-hidden')}`}>
                                            <span
                                                onClick={() => { setTopicId(id); setShowTopics(false) }}
                                                className="hover:border-b-1 border-green-500 text-green-500 hover:text-green-600 cursor-pointer">{name}</span>
                                        </td>
                                        {showForm && (
                                            <>
                                                <td className={`max-w-[200px] pl-2 ${textWrapper && ('truncate whitespace-nowrap overflow-hidden')}`} title={description}>
                                                    {description}
                                                </td>
                                                <td className="max-w-[150px] pl-2 truncate whitespace-nowrap overflow-hidden">
                                                    {savedAt}
                                                </td>
                                                <td className="max-w-[200px] pl-2 truncate whitespace-nowrap overflow-hidden">
                                                    {createdBy}
                                                </td>

                                            </>)}
                                        <td className="w-[50px]">
                                            <div className=' relative flex justify-end w-fit ml-[30%]' style={{ width: 15 }}>
                                                <i className={`fa-regular fa-square-caret-down text-[20px] hover:text-green-500 cursor-pointer ${menuIndex === index ? 'text-green-500' : 'text-gray-500'}`}
                                                    data-menu-index={index}
                                                    onClick={() => setMenuIndex(menuIndex === index ? null : index)}
                                                ></i>

                                                {menuIndex === index && (
                                                    <div
                                                        ref={(el) => (menuRefs.current[index] = el)}
                                                        className='absolute w-max right-5 border-2 border-gray-400 rounded p-[3px] text-gray-500 flex flex-col bg-white cursor-pointer gap-1 shadow-19'
                                                    >
                                                        <p onClick={() => { setTopicId(id); setShowTopics(false) }}
                                                            className='w-full px-[20] py-[5] rounded-[3] border-2 border-gray-100 shadow-green-100 hover:border-2 hover:border-green-500  hover:bg-green-100'>Edit</p>
                                                        <p
                                                            className='w-full px-[20] py-[5] rounded-[3] border-2 border-gray-100 shadow-green-100 hover:border-2 hover:border-green-500 hover:bg-green-100'
                                                            onClick={() => handleDelete(null, name)}
                                                        >Remove from Agent</p>
                                                    </div>
                                                )}
                                            </div>
                                        </td>

                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {notification.visibility && (
                    <div
                        className={`fixed bottom-4 right-4 px-4 py-2 rounded shadow-md text-sm transition-opacity duration-300
                        ${notification.type === 'success'
                                ? 'bg-green-100 text-green-500 border border-green-400'
                                : 'bg-red-100 border border-red-500 text-red-500'}`}
                    >
                        {notification.message}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ClientTopics;
