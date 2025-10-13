import React, { useCallback, useMemo, useState } from "react";
import { createEditor, Editor } from "slate";
import { Slate, Editable, withReact, useSlate } from "slate-react";
import { withHistory, HistoryEditor } from "slate-history";
import { Button } from "../components/ui/button";
import { Bold, Italic, Underline, Code, RotateCcw, RotateCw } from "lucide-react";

// Safe initial value
const initialValue = [
  {
    type: "paragraph",
    children: [{ text: "Start typing your document..." }],
  },
];

// Validate Slate value
const isValidSlateValue = (value) => {
  return Array.isArray(value) && value.every(item => 
    item && typeof item === 'object' && 'children' in item
  );
};

const TextEditor = () => {
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);
  
  // Initialize with safe value and add validation
  const [value, setValue] = useState(() => {
    try {
      // If you're loading from storage, validate it here
      return isValidSlateValue(initialValue) ? initialValue : [
        {
          type: "paragraph",
          children: [{ text: "Start typing your document..." }],
        },
      ];
    } catch (error) {
      console.error('Error initializing editor value:', error);
      return [
        {
          type: "paragraph",
          children: [{ text: "Start typing your document..." }],
        },
      ];
    }
  });

  const renderElement = useCallback((props) => <Element {...props} />, []);
  const renderLeaf = useCallback((props) => <Leaf {...props} />, []);

  // Safe value getter
  const getSafeValue = (val) => {
    return isValidSlateValue(val) ? val : initialValue;
  };

  return (
    <div className="p-4 border rounded-2xl shadow-md max-w-3xl mx-auto bg-white">
      <Slate
        editor={editor}
        value={getSafeValue(value)}
        onChange={(newValue) => {
          // Only update if the new value is valid
          if (isValidSlateValue(newValue)) {
            setValue(newValue);
          } else {
            console.warn('Invalid Slate value detected, ignoring update');
          }
        }}
      >
        {/* Toolbar INSIDE Slate for useSlate */}
        <div className="flex space-x-2 mb-3">
          <MarkButton format="bold" icon={<Bold size={16} />} />
          <MarkButton format="italic" icon={<Italic size={16} />} />
          <MarkButton format="underline" icon={<Underline size={16} />} />
          <MarkButton format="code" icon={<Code size={16} />} />
          <ToolbarButton
            onClick={() => HistoryEditor.undo(editor)}
            title="Undo"
            icon={<RotateCcw size={16} />}
          />
          <ToolbarButton
            onClick={() => HistoryEditor.redo(editor)}
            title="Redo"
            icon={<RotateCw size={16} />}
          />
        </div>

        {/* Editable area */}
        <Editable
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          placeholder="Write something amazing..."
          className="min-h-[200px] p-3 border rounded-lg focus:outline-none"
          spellCheck
          autoFocus
          onKeyDown={(event) => {
            if (!event.ctrlKey) return;
            switch (event.key) {
              case "b":
                event.preventDefault();
                toggleMark(editor, "bold");
                break;
              case "i":
                event.preventDefault();
                toggleMark(editor, "italic");
                break;
              case "u":
                event.preventDefault();
                toggleMark(editor, "underline");
                break;
              case "`":
                event.preventDefault();
                toggleMark(editor, "code");
                break;
              case "z":
                event.preventDefault();
                if (event.shiftKey) HistoryEditor.redo(editor);
                else HistoryEditor.undo(editor);
                break;
              default:
                break;
            }
          }}
        />
      </Slate>
    </div>
  );
};

/* Toolbar buttons */
const ToolbarButton = ({ onClick, icon, title }) => (
  <Button
    type="button"
    variant="outline"
    size="sm"
    className="rounded-lg shadow-sm"
    onClick={onClick}
    title={title}
  >
    {icon}
  </Button>
);

/* Mark button using useSlate (must be inside Slate) */
const MarkButton = ({ format, icon }) => {
  const editor = useSlate();
  return (
    <ToolbarButton
      onClick={(event) => {
        event.preventDefault();
        toggleMark(editor, format);
      }}
      icon={icon}
      title={format}
    />
  );
};

/* Slate helpers */
const toggleMark = (editor, format) => {
  const isActive = isMarkActive(editor, format);
  if (isActive) Editor.removeMark(editor, format);
  else Editor.addMark(editor, format, true);
};

const isMarkActive = (editor, format) => {
  const marks = Editor.marks(editor);
  return marks ? marks[format] === true : false;
};

/* Element and Leaf renderers */
const Element = ({ attributes, children, element }) => {
  switch (element.type) {
    case "code":
      return (
        <pre {...attributes} className="bg-gray-100 p-2 rounded-lg">
          <code>{children}</code>
        </pre>
      );
    default:
      return <p {...attributes}>{children}</p>;
  }
};

const Leaf = ({ attributes, children, leaf }) => {
  if (leaf.bold) children = <strong>{children}</strong>;
  if (leaf.italic) children = <em>{children}</em>;
  if (leaf.underline) children = <u>{children}</u>;
  if (leaf.code)
    children = <code className="bg-gray-200 p-0.5 rounded">{children}</code>;
  return <span {...attributes}>{children}</span>;
};

export default TextEditor;