import React from 'react';
import ReactDOM from 'react-dom';

class SelectionBar extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <nav className="tabbar">
         <ul>
            <li className="selected-tab">
               <div className="tab-contents swift-border-color">
                  <span className="tab-name">Swift 4</span>
               </div>
            </li>
            <li className="">
               <div className="tab-contents objective-c-border-color ">
                  <span className="tab-name">Objective-C</span>
               </div>
            </li>
            <li className="full-opacity tab-name float-right">
              <div class="tab-contents copy-border-color">
                <span className="tab-name" onClick={this.props.copyButtonClick}>Copy</span>
              </div>
               
            </li>

         </ul>
      </nav>

      // <div className = "col-12 nopadding">
      //   <button type="button"
      //           onClick={this.props.copyButtonClick}
      //           className="float-right copy-button" >
      //     <img src="images/copy.svg"
      //          className ="copy-image"
      //          width="13" 
      //          alt="Copy to clipboard"/>
      //   </button>
      // </div>
    )
  }
}

export default SelectionBar;