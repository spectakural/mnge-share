import { useEffect } from "react";

import Editor, { DiffEditor, useMonaco, loader } from "@monaco-editor/react";
import { useState } from "react";

const Home = () => {
  const monaco = useMonaco();
  const [select, setSelect] = useState("python");
  useEffect(() => {
    if (monaco) {
      console.log("istance ready", monaco);
    }
  }, [monaco]);

  const handleEditorChange = () => {};

  return (
    <div>
      <select name="some" id="lang" onChange={(e) => setSelect(e.target.value)}>
        <option value="python">Python</option>
        <option value="javascript">js</option>
        <option value="html">html</option>
      </select>
      <Editor
        height="50vh"
        defaultLanguage={select}
        defaultValue="//python
        #python"
        onChange={handleEditorChange}
        theme="vs-dark"
        language={select}
      />
    </div>
  );
};

export default Home;
