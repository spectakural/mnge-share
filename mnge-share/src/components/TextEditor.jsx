import "./TextEditor.scss";
import { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";

const TextEditor = ({ updateText, roomData }) => {
  const [text, setText] = useState("");
  const [cursor, setCursor] = useState(0);
  const textEditor = useRef(null);

  useEffect(() => {
    textEditor.current.setSelectionRange(cursor, cursor);
  }, [roomData]);

  const handleChange = (e) => {
    setText(e.target.value);
    updateText(e.target.value);
    setCursor(e.target.selectionStart);
  };
  return (
    <div className="text-editor-container">
      <div className="text-editor-header">
        <span>Text Editor</span>
      </div>

      <div className="text-editor">
        <textarea
          id="text-editor"
          name="txt-editor"
          cols="60"
          rows="10"
          placeholder="Start typing here..."
          value={roomData.texteditor}
          onChange={handleChange}
          ref={textEditor}
        ></textarea>
      </div>
    </div>
  );
};

export default TextEditor;
