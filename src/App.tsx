import { useEffect, useState } from "react";

import "./App.css";
declare var ace: any;
function App() {
  let st = { height: "100wh" };
  let code = `function add(x, y) {
    var resultString = "Hello, ACE! The result of your math is: ";
    var result = x + y;
    return resultString + result;
}`;
  const [editor, setEditor] = useState();
  const [debounceTimeout, setDebounceTimeout] = useState();
  useEffect(() => {
    var _editor = ace.edit("javascript-editor");
    _editor.getSession().setMode("ace/mode/javascript");
    _editor.setTheme("ace/theme/monokai");

    setEditor(_editor);
    _editor.getSession().getSelection().clearSelection();

    _editor.getSession().on("change", function () {
      if (debounceTimeout) {
        clearTimeout(debounceTimeout);
      }

      console.log(_editor.getValue());

      let x = new Function("a", "b", _editor.getValue());
      console.log(x(5, 10));
    });
  }, []);
  return (
    <>
      <div className="row apph">
        <div className="col-lg-6" id="javascript-editor">
          {code}
        </div>
        <div className="col-lg-6">
          <button className="btn btn-primary"> show </button>
        </div>
      </div>
    </>
  );
}

export default App;
