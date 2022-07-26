import "./TextEditor.scss";

const TextEditor = () => {
  return (
    <div className="text-editor-container">
      <div className="text-editor-header">
        <span>Text Editor</span>
      </div>

      <div className="text-editor">
        <textarea
          name="txt-editor"
          id="txt-editor"
          cols="60"
          rows="10"
          placeholder="Start typing here..."
        ></textarea>
      </div>
    </div>
  );
};

export default TextEditor;
