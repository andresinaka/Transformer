import React from 'react';
import ReactDOM from 'react-dom';
import ReactQuill, { Quill, Mixin, Toolbar }  from 'react-quill';
import CustomSnow from "./CustomSnow"
import UnderlineStyle from "./custom-formats/UnderlineStyle.js"

let Inline = Quill.import('blots/inline');

var SizeStyle = Quill.import('attributors/style/size');
SizeStyle.whitelist = ['13px','15px', '18px', '32px'];

Quill.register(UnderlineStyle)
Quill.register(SizeStyle, true);
Quill.register('themes/snow', CustomSnow, true);


const CustomToolbar = () => (
  <div id="toolbar">
    <select className="ql-color"/>
    <select className="ql-background"/>
    <select className="ql-size">
      <option value="13px" defaultValue>13 Points</option>
      <option value="15px">15 Points</option>
      <option value="18px">18 Points</option>
      <option value="32px">32 Points</option>
    </select>
    <select className="ql-underline-style">
      <option value="false" defaultValue>.styleNone</option>
      <option value="style-single">.styleSingle</option>
      <option value="style-double">.styleDouble</option>
      <option value="style-thick">.styleThick</option>
    </select>
    <button className="ql-clean"/>
  </div>
)

class StyleEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = { text: '' };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(content, delta, source, editor) {
    this.setState({ text: content });
    this.props.onChange(editor.getText(), editor.getContents());
  }

  render() {
    return (
      <div className="text-editor">
        <CustomToolbar />
        <ReactQuill value={ this.state.text }
                    onChange={ this.handleChange }
                    modules={ StyleEditor.modules }
                    theme="snow"/>
      </div>
    )
  }
}

StyleEditor.modules = {
  toolbar: {
    container: "#toolbar"
  }
}

export default StyleEditor;
