import React from 'react';
import ReactDOM from 'react-dom';
import Counter from './Counter';
import StyleEditor from './StyleEditor';
import ResultBox from './ResultBox';
import swiftTranslator from './SwiftTranslator';

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
    swiftTranslator(text, contents)
  }

  render() {
    return (
      <div> 
        <StyleEditor onChange={this.onChange} />
        <ResultBox code={this.state.text}/>
      </div>
    )
  }
}

document.addEventListener('DOMContentLoaded', function() {
  ReactDOM.render(<App />, document.getElementById('mount'));
});

