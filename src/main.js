import React from 'react';
import ReactDOM from 'react-dom';
import StyleEditor from './StyleEditor';
import SwiftTranslator from './SwiftTranslator';
import ObjectiveTranslator from './ObjectiveTranslator';
import SelectionBar from './SelectionBar';
import Highlight from 'react-highlight';
import ReactGA from 'react-ga';

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

    ReactGA.initialize('UA-52353329-2', {
      debug: location.hostname == 'localhost',
    });

    if (location.hostname == 'localhost') {
      ReactGA.set({ sendHitTask: null });
    }

    ReactGA.pageview(window.location.pathname);

    this.onChange = this.onChange.bind(this)
    this.copyButtonClick = this.copyButtonClick.bind(this)
    this.objectiveCall = this.objectiveCall.bind(this)
    this.swiftCall = this.swiftCall.bind(this)
    this.onUnload = this.onUnload.bind(this)
  }

  onUnload(event) {
    if(this.state.alertClose) {
      event.returnValue = "You are going to lose your changes!";
    }
  }

  componentDidMount() {
    window.addEventListener("beforeunload", this.onUnload)
  }

  componentWillUnmount() {
    window.removeEventListener("beforeunload", this.onUnload)
  }

  objectiveCall() {
    ReactGA.event({
      category: 'Action',
      action: 'Objective-C'
    });

    this.setState({
      code: this.state.objectiveCode,
      showing: "objective-c",
      alertClose: false
    });
  }

  swiftCall() {
    ReactGA.event({
      category: 'Action',
      action: 'Swift'
    });

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
      code: codeToShow,
      alertClose: text.length > 10
    });
  }

  copyButtonClick() {
    ReactGA.event({
      category: 'Action',
      action: 'Copy'
    });

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
          <div className="row top-half">
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
          <div className="row bottom-half bg-color">
            <div className="col nopadding scroll-enabled">
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

