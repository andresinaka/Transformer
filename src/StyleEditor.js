import React from 'react';
import ReactDOM from 'react-dom';
import ReactQuill, { Quill, Mixin, Toolbar }  from 'react-quill';
import Parchment from 'parchment';

let Inline = Quill.import('blots/inline');

var SizeStyle = Quill.import('attributors/style/size');
SizeStyle.whitelist = ['13px','15px', '18px', '32px'];

class UnderlineStyle extends Inline {
  static create(underlineStyle) {
    this.whitelist = [
      "style-none",
      "style-single",
      "style-thick",
      "style-double",
      "pattern-dot",
      "pattern-dash",
      "pattern-dash-dot",
      "pattern-Dash-dot-dot",
      "by-word"
    ];

    let node = super.create();
    node.setAttribute('class', underlineStyle);
    return node;
  }

  static formats(node) {
    let theClass = node.getAttribute('class');

    if(this.whitelist.indexOf(theClass) > -1) {
      return theClass
    } else { 
      return null
    }
  }
}
UnderlineStyle.blotName = 'underlineStyle';
UnderlineStyle.tagName = 'u';

Quill.register(UnderlineStyle)
Quill.register(SizeStyle, true);

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
    <button className="ql-clean"/>
    <select className="ql-underlineStyle">
      <option value="style-none" defaultValue>.styleNone</option>
      <option value="style-double">.styleDouble</option>
    </select>

    <button className="ql-underlineStyle" value="style-double"/>
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
                    modules={ StyleEditor.modules }/>
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
