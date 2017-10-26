import React from 'react';
import ReactDOM from 'react-dom';
import Counter from './Counter';
import StyleEditor from './StyleEditor';
import SwiftTranslator from './SwiftTranslator';
import SelectionBar from './SelectionBar';
import Highlight from 'react-highlight';

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      text: "",
      code: "",
      contents: {}
    };

    this.onChange = this.onChange.bind(this)
    this.copyButtonClick = this.copyButtonClick.bind(this)
  }

  onChange(text, contents) {
    let translator = new SwiftTranslator(text, contents)
    let code = translator.translate()

    this.setState({
      code: code
    });
  }

  copyButtonClick() {
    var textField = document.createElement('textarea')
    let text = this.state.code

    textField.value = text

    document.body.appendChild(textField)
    textField.select()
    document.execCommand('copy')
    textField.remove()
  }

  render() {
    return (
        <div className="container-fluid">
          <div className="row half">
            <div className="col nopadding">
              <StyleEditor onChange={this.onChange} />
            </div>
          </div>
          <div className="row">
            <SelectionBar copyButtonClick={this.copyButtonClick}/>
          </div>
          <div className="row half bg-color">
            <div className="col nopadding">
              <Highlight className='swift code-font-size'>
                {this.state.code}
              </Highlight>
            </div>
          </div>
        </div>
    )
  }
}

document.addEventListener('DOMContentLoaded', function() {
  ReactDOM.render(<App />, document.getElementById('mount'));
});

