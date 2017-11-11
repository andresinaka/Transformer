import React from 'react';
import ReactDOM from 'react-dom';
import Counter from './Counter';
import StyleEditor from './StyleEditor';
import SwiftTranslator from './SwiftTranslator';
import ObjectiveTranslator from './ObjectiveTranslator';
import SelectionBar from './SelectionBar';
import Highlight from 'react-highlight';

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      text: "",
      code: "",
      swiftCode: "",
      objectiveCode: "",
      contents: {},
      showing: "swift"
    };

    this.onChange = this.onChange.bind(this)
    this.copyButtonClick = this.copyButtonClick.bind(this)
    this.objectiveCall = this.objectiveCall.bind(this)
    this.swiftCall = this.swiftCall.bind(this)
  }

  objectiveCall() {
    this.setState({
      code: this.state.objectiveCode,
      showing: "objective-c"
    });
  }

  swiftCall() {
    this.setState({
      code: this.state.swiftCode,
      showing: "swift"
    });
  }

  onChange(text, contents) {
    let swiftTranslator = new SwiftTranslator(text, contents);
    let objectiveTranslator = new ObjectiveTranslator(text, contents);

    this.setState({ 
      swiftCode: swiftTranslator.translate(),
      objectiveCode: objectiveTranslator.translate()
    })

    let codeToShow = this.state.objectiveCode;
    if (this.state.showing == "swift") {
      codeToShow = this.state.swiftCode;
    }

    this.setState({
      code: codeToShow
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
          <div className="row tabbar-bg-color">
            <SelectionBar copyButtonClick={this.copyButtonClick} 
                          swiftCall={this.swiftCall}
                          objectiveCall={this.objectiveCall}
            />
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

