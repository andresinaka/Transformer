import React from 'react';
import ReactDOM from 'react-dom';
import Counter from './Counter';
import StyleEditor from './StyleEditor';
import ResultBox from './ResultBox';
import SwiftTranslator from './SwiftTranslator';
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
  }

  onChange(text, contents) {
    let translator = new SwiftTranslator(text, contents)
    let code = translator.translate()

    this.setState({
      code: code
    });
  }

  render() {
    return (
      <div> 
        <StyleEditor onChange={this.onChange} />
        <Highlight className='swift'>
          {this.state.code}
        </Highlight>
      </div>
    )
  }
}

document.addEventListener('DOMContentLoaded', function() {
  ReactDOM.render(<App />, document.getElementById('mount'));
});

