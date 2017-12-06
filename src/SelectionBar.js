import React from 'react';
import ReactDOM from 'react-dom';
import ReactTooltip from 'react-tooltip'

class SelectionBar extends React.Component {
  constructor(props) {
    super(props);

    this.objectiveCall = this.objectiveCall.bind(this);
    this.swiftCall = this.swiftCall.bind(this);
    this.copyButtonClick = this.copyButtonClick.bind(this);
  }

  copyButtonClick() {
    this.props.copyButtonClick();
    ReactTooltip.show(this.refs.foo)

    setTimeout(function() { 
      ReactTooltip.hide();
    }, 800);
  }

  objectiveCall() {
    var objClickable = this.refs.ObjectiveClickable;
    var swifClickable = this.refs.SwiftClickable;

    swifClickable.classList.remove("selected-tab");
    objClickable.classList.add("selected-tab");

    this.props.objectiveCall();
  }

  swiftCall() {
    var objClickable = this.refs.ObjectiveClickable;
    var swifClickable = this.refs.SwiftClickable;

    objClickable.classList.remove("selected-tab");
    swifClickable.classList.add("selected-tab");

    this.props.swiftCall();
  }

  render() {
    return (
      <nav className="tabbar">
         <ul>
            <li className="selected-tab" ref="SwiftClickable">
               <div className="tab-contents swift-border-color">
                  <span className="tab-name" onClick={this.swiftCall}>Swift 4</span>
               </div>
            </li>
            <li className="" ref="ObjectiveClickable">
               <div className="tab-contents objective-c-border-color ">
                  <span className="tab-name" onClick={this.objectiveCall}>Objective-C</span>
               </div>
            </li>
            <ReactTooltip
              className="tooltip"
              place="top"
              type="dark"
              effect="solid"
              event="custom"
            />
            <li ref='foo' data-tip='Copied!' className="full-opacity tab-name float-right">
              <div className="tab-contents copy-border-color">
                <span className="tab-name" onClick={this.copyButtonClick}>Copy</span>
              </div>
            </li>
         </ul>
      </nav>
    )
  }
}

export default SelectionBar;