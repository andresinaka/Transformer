import React from 'react';
import ReactDOM from 'react-dom';
import ReactQuill from 'react-quill';

class StyleEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = { text: '' };
    this.toolbar = [
      [ { 'font': [] }],
      [{size: []}],
      ['bold', 'italic', 'underline']
    ];

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(content, delta, source, editor) {
    this.setState({ text: content });
    this.props.onChange(editor.getText(), editor.getContents());
  }

  render() {
    return (
      <ReactQuill value={this.state.text}
                  onChange={this.handleChange}
                  modules={ {toolbar: this.toolbar } }
      />
    )
  }
}

export default StyleEditor;
