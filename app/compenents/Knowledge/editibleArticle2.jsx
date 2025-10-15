'use client';
import { forwardRef, useEffect, useRef, useState, useImperativeHandle } from 'react';

const EditableArticle = forwardRef(({ content, setCategoryData, selectedArticle, updateContentInJSON }, ref) => {
    const editorRef = useRef(null);
    const editorHolderRef = useRef(null);
    const holderId = useRef(`editorjs-${Math.random().toString(36).substring(2, 9)}`).current;
    const [editorData, setEditorData] = useState(content.content);
    const { categoryIndex, folderIndex, articleIndex, generalArticleIndex } = selectedArticle;

    useImperativeHandle(ref, () => ({
        async save() {
            if (editorRef.current) {
                try {
                    const data = await editorRef.current.save();  // Get the current data from EditorJS
                    console.log(data, "Data")
                    return data;  // Return the data to the parent
                } catch (e) {
                    console.error('Error saving editor data:', e);
                    return null;  // Return null or handle error as needed
                }
            }
            return null;
        },
    }));

    useEffect(() => {
        let EditorJS, Header, List, Table, ImageTool;
        let isMounted = true;

        const loadEditor = async () => {
            // console.log(content, "Content")
            const el = editorHolderRef.current;
            if (!el) return;

            // dynamically import tools
            EditorJS = (await import('@editorjs/editorjs')).default;
            Header = (await import('@editorjs/header')).default;
            List = (await import('@editorjs/list')).default;
            Table = (await import('@editorjs/table')).default;
            ImageTool = (await import('@editorjs/image')).default;

            let editorBlocks = [];

            if (content?.content?.blocks && Array.isArray(content.content.blocks)) {
                editorBlocks = content.content.blocks.map((block, i) => {
                    if (block.data?.text) {
                        console.log(block.data.text, "Block", i);
                        return block; // valid block
                    } else {
                        console.log('No text in this block', "Block", i, block);
                        return block; // still return it (for tables/images/etc.)
                    }
                });
            } else {
                console.log("No valid blocks found, using empty paragraph");
                editorBlocks = [{ type: "paragraph", data: { text: "" } }];
            }

            // ✅ Store it in a variable to pass to EditorJS
            const dataForEditor = { blocks: editorBlocks };


            // only initialize if still mounted and container exists
            if (isMounted && !editorRef.current) {

                editorRef.current = new EditorJS({
                    holder: holderId, // ✅ use the ID string
                    autofocus: false, // don’t steal title input focus
                    placeholder: 'Start writing your article here...',
                    // data: content || {
                    //     blocks: [{ type: 'paragraph', data: { text: '' } }],
                    // },
                    data: content.content,
                    tools: {
                        header: {
                            class: Header, inlineToolbar: true, config: {
                                placeholder: 'Enter a header',
                                levels: [1, 2, 3, 4, 5, 6],
                                defaultLevel: 2
                            }
                        },
                        list: { class: List, inlineToolbar: true },
                        table: { class: Table, inlineToolbar: true },
                        image: {
                            class: ImageTool,
                            config: {
                                uploader: {
                                    uploadByFile: async (file) => {
                                        try {
                                            const formData = new FormData();
                                            formData.append("image", file);

                                            const response = await fetch("/api/upload", {
                                                method: "POST",
                                                body: formData,
                                            });

                                            // Check if response is OK
                                            if (!response.ok) {
                                                const text = await response.text(); // read what the server actually sent
                                                console.error("Server error:", text);
                                                throw new Error(`Upload failed: ${response.status}`);
                                            }

                                            const result = await response.json();
                                            console.log("Upload response:", result);

                                            if (result.success) {
                                                return { success: 1, file: { url: result.url } };
                                            } else {
                                                throw new Error(result.message);
                                            }
                                        } catch (err) {
                                            console.error("Upload error:", err);
                                            return { success: 0 };
                                        }
                                    }

                                },
                            },
                        },
                    },

                    onChange: async () => {
                        // This callback runs whenever the editor content changes
                        if (editorRef.current) {
                            try {
                                const data = await editorRef.current.save(); // Save the current editor data
                                setEditorData(data); // Update the local state with the new data
                                // console.log('Editor data updated:', data); // Optional: Log for debugging
                            } catch (e) {
                                console.error('Error saving editor data:', e);
                            }
                        }
                    },
                    onReady: () => {
                        // prevent title click conflict
                        el.addEventListener('mousedown', (e) => e.stopPropagation());
                    },
                });
            }
        };

        loadEditor();

        return () => {
            isMounted = false;
            if (editorRef.current?.destroy) {
                editorRef.current.destroy();
                editorRef.current = null;
            }
        };
    }, [content.content, holderId]);
    // console.log('Current editor data:', editorData);
    // content.content.map((block, i) => {
    //     if (block.data && block.data.text) {
    //         console.log(block.data.text, "Block", i);
    //     } else {
    //         console.log('No text in this block', "Block", i, block);
    //     }
    // });

    return (
        <div className="relative w-full">
            {/* ✅ ID is actually in DOM before EditorJS runs */}
            <div
                id={holderId}
                ref={editorHolderRef}
                className="min-h-[250px] focus:outline-none"
            />
        </div>
    );
});

export default EditableArticle;
