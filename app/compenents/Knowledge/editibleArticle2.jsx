'use client';
import { useEffect, useRef } from 'react';

export default function EditableArticle({ content }) {
    const editorRef = useRef(null);
    const editorHolderRef = useRef(null);
    const holderId = `editorjs-${Math.random().toString(36).substring(2, 9)}`;

    useEffect(() => {
        let EditorJS;
        let Header;
        let List;
        let Table;
        let ImageTool;

        const loadEditor = async () => {
            EditorJS = (await import('@editorjs/editorjs')).default;
            Header = (await import('@editorjs/header')).default;
            List = (await import('@editorjs/list')).default;
            Table = (await import('@editorjs/table')).default;
            ImageTool = (await import('@editorjs/image')).default;
            if (!editorRef.current && editorHolderRef.current) {
                editorRef.current = new EditorJS({
                    holder: editorHolderRef.current,
                    autofocus: true,
                    placeholder: 'Start writing your article here...',
                    /**
                     * Important: start with empty data explicitly
                     */
                    data: {
                        blocks: [
                            { type: 'paragraph', data: { text: '' } }
                        ]
                    },
                    tools: {
                        header: {
                            class: Header,
                            inlineToolbar: ['bold', 'italic'],
                            // config: {
                            //     levels: [1, 2, 3, 4, 5, 6], // h1, h2, h3, h4
                            //     defaultLevel: 2,
                            // }
                        },

                        list: { class: List, inlineToolbar: true },
                        // checklist: { class: Checklist, inlineToolbar: true },
                        table: { class: Table, inlineToolbar: true },
                        image: {
                            class: ImageTool,
                            config: {
                                uploader: {
                                    uploadByFile: async (file) => {
                                        const url = URL.createObjectURL(file);
                                        return { success: 1, file: { url } };
                                    }
                                }
                            }
                        }
                    }
                });
            }
        };

        loadEditor();

        return () => {
            if (editorRef.current && typeof editorRef.current.destroy === 'function') {
                editorRef.current.destroy();
                editorRef.current = null;
            }
        };
    }, [content, holderId]);

    return (
        <div className="relative w-full">
            <div ref={editorHolderRef} className="min-h-[250px] focus:outline-none" />
        </div>
    );
}
