import React from 'react';
import ReactDOM from 'react-dom';
import ReactQuill, { Quill, Mixin, Toolbar }  from 'react-quill';
import Parchment from 'parchment';
import Picker from "quill/ui/picker.js"
import Emitter from 'quill/core/emitter';

var Snow = Quill.import('themes/snow');
class CustomSnow extends Snow {
  constructor(quill, options) {
    super(quill, options);
  }

  buildPickers(selects, icons) {
    super.buildPickers(selects, icons);

    let newClases = ['ql-underline-style']
    let newSelectors = selects.filter(select => newClases.includes(select.getAttribute('class')));

    let self = this
    newSelectors.forEach(function(select) {
      if (select.classList.contains('ql-underline-style')) {
        console.log("cacatua")
        fillSelect(select, ["Fafafa","fofofo"]);
      }

      console.log(self.pickers.length)

      self.pickers.push(new Picker(select));
      console.log(self.pickers.length)
    });

    let update = () => {
      this.pickers.forEach(function(picker) {
        picker.update();
      });
    };
    this.quill.on(Emitter.events.EDITOR_CHANGE, update);
  }
}

function fillSelect(select, values, defaultValue = false) {
  values.forEach(function(value) {
    let option = document.createElement('option');
    if (value === defaultValue) {
      option.setAttribute('selected', 'selected');
    } else {
      option.setAttribute('value', value);
    }
    select.appendChild(option);
  });
}

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
UnderlineStyle.blotName = 'underline-style';
UnderlineStyle.tagName = 'u';

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
    <button className="ql-clean"/>
    <select className="ql-underline-style">
      <option value="style-none" defaultValue>.styleNone</option>
      <option value="style-double">.styleDouble</option>
    </select>
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
