"use client"
import { useState } from "react";
import Select from "react-select";
import { customStyles } from "../../data/selectStyle";
import { bulkUpdateData, assigntoData, conversationStatusData } from "../../data/chat";

const BulkUpdate = ({ setOpneBulkUpdate, selectedIds = [], onUpdate }) => {
    const [animateOut, setAnimateOut] = useState(false);
    const [searchInput, setSearchInput] = useState("");
    const [updateData, setUpdateData] = useState("");
    const [assignTo, setAssignTo] = useState("");
    const [convoStatus, setConvoStatus] = useState("");

    const handleClearUpdate = () => {
        setUpdateData("");
        setAssignTo("");
        setConvoStatus("");
    };


  return (
    <div className="h-full w-full bg-black/80 absolute top-0 left-0 z-50 flex justify-center">
        <div className={`bg-white w-[50%] min-w-[500px] h-fit mt-30 rounded p-5 ${animateOut ? "popup-out" : "popup-in"}`}>
            <div className="justify-items mb-2">
                <h2 className=" font-bold">Bulk Update</h2>
                <i onClick={()=> setOpneBulkUpdate(false)} className="fa-solid fa-xmark text-[20px] text-gray-500 hover:bg-gray-300 px-1 py-0.5 rounded-full cursor-pointer"></i>
            </div>

            <p className="text-sm text-gray-500">Choose a field from the dropdown and update with new information</p>

            <div className="grid grid-cols-2 gap-3 mb-5 mt-2">
                <div className="relative group">
                    <Select 
                        instanceId="select_bulk"
                        options={bulkUpdateData}
                        value={bulkUpdateData.find(option => option.value === updateData) || null}
                        onChange={(e)=> setUpdateData(e?.value || "")}
                        styles={customStyles}
                        className="w-full text-sm"
                        placeholder="Select field"
                        components={{
                        IndicatorSeparator: () => null
                        }}
                    /> 
                    {updateData !== "" && 
                    <i onClick={handleClearUpdate}
                    className="fa-solid fa-circle-xmark absolute z-10 top-5 right-5 text-gray-300 bg-white group-hover:block! cursor-pointer hidden!"></i>
                    }
                </div>

            {updateData === "assign_to" &&
                <Select 
                    instanceId="select_assign"
                    options={assigntoData}
                    value={assigntoData
                    .flatMap(group => group.options)
                    .find(option => option.value === assignTo) || null}
                    onChange={(e)=> setAssignTo(e?.value || "")}
                    styles={customStyles}
                    className="w-full text-sm"
                    placeholder="Select User or Bot"
                    components={{
                    IndicatorSeparator: () => null
                    }}
                />
            }

                {updateData === "update_convo_status" &&    
                <Select 
                    instanceId="select_bulk"
                    options={conversationStatusData}
                    value={conversationStatusData.find(option => option.value === convoStatus) || null}
                    onChange={(e)=> setConvoStatus(e?.value || "")}
                    styles={customStyles}
                    className="w-full text-sm"
                    placeholder="Select Status"
                    components={{
                    IndicatorSeparator: () => null
                    }}
                />}
            </div>

                    <div className="w-full flex justify-end gap-3 pt-3">
                        <button onClick={()=> setOpneBulkUpdate(false)}
                        className="h-8 border px-4 text-gray-400 hover:bg-gray-200 text-sm rounded-3xl transition-all">
                            Cancel
                        </button>

                        <button
                            onClick={() => {
                                // do nothing if nothing selected or no update selected
                                if (!updateData || selectedIds.length === 0) return;
                                if (updateData === 'assign_to') {
                                    onUpdate && onUpdate('assignedTo', assignTo || '');
                                } else if (updateData === 'update_convo_status') {
                                    onUpdate && onUpdate('status', convoStatus || '');
                                }
                                setOpneBulkUpdate(false);
                            }}
                            className={`h-8 border border-green-500 px-4 text-white ${(!updateData || selectedIds.length === 0) ? 'bg-gray-300 text-gray-400 cursor-not-allowed' : 'hover:bg-green-300 bg-green-400'} text-sm rounded-3xl transition-all`}
                            disabled={!updateData || selectedIds.length === 0}
                        >
                            Update
                        </button>
                    </div>
        </div>
    </div>
  )
}

export default BulkUpdate