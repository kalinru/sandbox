const { createRoot } = ReactDOM;
const { useState, useEffect } = React;

const defaultText = `# Welcome to my React Markdown Previewer!

## This is a sub-heading...
### And here's some other cool stuff:

Heres some code, \`<div></div>\`, between 2 backticks.

\`\`\`
// this is multi-line code:

function anotherExample(firstLine, lastLine) {
  if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
    return multiLineCode;
  }
}
\`\`\`

You can also make text **bold**... whoa!
Or _italic_.
Or... wait for it... **_both!_**
And feel free to go crazy ~~crossing stuff out~~.

There's also [links](https://www.freecodecamp.org), and
> Block Quotes!

And if you want to get really crazy, even tables:

Wild Header | Crazy Header | Another Header?
------------ | ------------- | -------------
Your content can | be here, and it | can be here....
And here. | Okay. | I think we get it.

- And of course there are lists.
  - Some are bulleted.
     - With different indentation levels.
        - That look like this.


1. And there are numbered lists too.
1. Use just 1s if you want!
1. And last but not least, let's not forget embedded images:

![freeCodeCamp Logo](https://cdn.freecodecamp.org/testable-projects-fcc/images/fcc_secondary.svg)
`;

const App = () => {
  const [text, setText] = useState(defaultText);
  const [markdown, setMarkdown] = useState("");

  const updateMartdown = (value) => {
    // document.getElementById('preview').innerHTML = marked.parse(text);
    setMarkdown(marked.parse(value));
  };

  useEffect(() => {
    updateMartdown(text);
  }, []);

  const onMarkdownChange = (event) => {
    const value = event.target.value;
    setText(value);
    updateMartdown(value);
  };

  return (
    <div id="app">
      <div className="editorWrap">
        <div className="toolbar">
          <i className="fa fa-free-code-camp" title="no-stack-dub-sack"></i>
          Editor
          <i className="fa fa-arrows-alt"></i>
        </div>
        <textarea
          id="editor"
          type="text"
          value={text}
          onChange={onMarkdownChange}
        ></textarea>
      </div>
      <div className="converter"></div>
      <div className="previewWrap">
        <div className="toolbar">
          <i className="fa fa-free-code-camp" title="no-stack-dub-sack"></i>
          Previewer
          <i className="fa fa-arrows-alt"></i>
        </div>
        <div id="preview" dangerouslySetInnerHTML={{ __html: markdown }}></div>
      </div>
    </div>
  );
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
