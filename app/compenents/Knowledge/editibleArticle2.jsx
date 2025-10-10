// 'use client';
// import React, { useCallback, useMemo, useState } from 'react';
// import { createEditor, Transforms, Element as SlateElement } from 'slate';
// import { Slate, Editable, withReact } from 'slate-react';

// const LIST_TYPES = ['numbered-list', 'bulleted-list'];

// export default function SlateEditor() {
//     const editor = useMemo(() => withReact(createEditor()), []);
//     const [value, setValue] = useState([
//         {
//             type: 'paragraph',
//             children: [{ text: '' }],
//         },
//     ]);

//     const renderElement = useCallback((props) => <Element {...props} />, []);
//     const renderLeaf = useCallback((props) => <Leaf {...props} />, []);

//     const toggleBlock = (editor, format) => {
//         const isActive = isBlockActive(editor, format);
//         const isList = LIST_TYPES.includes(format);

//         Transforms.unwrapNodes(editor, {
//             match: (n) =>
//                 LIST_TYPES.includes(!SlateElement.isElement(n) ? n.type : n.type),
//             split: true,
//         });

//         let newType = isActive ? 'paragraph' : isList ? 'list-item' : format;

//         Transforms.setNodes(editor, { type: newType });

//         if (!isActive && isList) {
//             const block = { type: format, children: [] };
//             Transforms.wrapNodes(editor, block);
//         }
//     };

//     const isBlockActive = (editor, format) => {
//         const [match] = Array.from(
//             SlateEditor.Editor.nodes(editor, {
//                 match: (n) => SlateElement.isElement(n) && n.type === format,
//             })
//         );
//         return !!match;
//     };

//     return (
//         <div className="p-6 bg-gray-50 min-h-screen">
//             {/* Toolbar */}
//             <div className="flex gap-2 mb-4">
//                 <button onMouseDown={(e) => { e.preventDefault(); toggleBlock(editor, 'paragraph'); }}>
//                     Text
//                 </button>
//                 <button onMouseDown={(e) => { e.preventDefault(); toggleBlock(editor, 'heading'); }}>
//                     Heading
//                 </button>
//                 <button onMouseDown={(e) => { e.preventDefault(); toggleBlock(editor, 'bulleted-list'); }}>
//                     UL
//                 </button>
//                 <button onMouseDown={(e) => { e.preventDefault(); toggleBlock(editor, 'numbered-list'); }}>
//                     OL
//                 </button>
//                 <button onMouseDown={(e) => { e.preventDefault(); toggleBlock(editor, 'checklist'); }}>
//                     Checklist
//                 </button>
//                 <button onMouseDown={(e) => { e.preventDefault(); toggleBlock(editor, 'table'); }}>
//                     Table
//                 </button>
//                 <button onMouseDown={(e) => { e.preventDefault(); toggleBlock(editor, 'image'); }}>
//                     Image
//                 </button>
//             </div>

//             <Slate
//                 editor={editor}
//                 value={value}
//                 onChange={(newValue) => setValue(newValue)}
//             >
//                 <Editable
//                     renderElement={renderElement}
//                     renderLeaf={renderLeaf}
//                     placeholder="Start writing your article here..."
//                 />
//             </Slate>
//         </div>
//     );
// }

// const Element = ({ attributes, children, element }) => {
//     switch (element.type) {
//         case 'heading':
//             return <h2 {...attributes} className="text-xl font-semibold mb-2">{children}</h2>;
//         case 'bulleted-list':
//             return <ul {...attributes} className="list-disc list-inside">{children}</ul>;
//         case 'numbered-list':
//             return <ol {...attributes} className="list-decimal list-inside">{children}</ol>;
//         case 'checklist':
//             return (
//                 <div {...attributes} className="flex items-center gap-2 mb-2">
//                     <input type="checkbox" />
//                     <span>{children}</span>
//                 </div>
//             );
//         case 'table':
//             return (
//                 <table {...attributes} className="table-auto border border-gray-300 mb-2">
//                     <tbody>{children}</tbody>
//                 </table>
//             );
//         case 'table-row':
//             return <tr {...attributes}>{children}</tr>;
//         case 'table-cell':
//             return <td {...attributes} className="border px-2 py-1">{children}</td>;
//         case 'image':
//             return (
//                 <div {...attributes} className="mb-2">
//                     <input type="file" accept="image/*" onChange={(e) => {
//                         const file = e.target.files[0];
//                         if (!file) return;
//                         const reader = new FileReader();
//                         reader.addEventListener('load', () => {
//                             const img = { type: 'image-element', url: reader.result, children: [{ text: '' }] };
//                             SlateEditor.Editor.insertNodes(editor, img);
//                         });
//                         reader.readAsDataURL(file);
//                     }} />
//                 </div>
//             );
//         default:
//             return <p {...attributes}>{children}</p>;
//     }
// };

// const Leaf = ({ attributes, children }) => {
//     return <span {...attributes}>{children}</span>;
// };
