import React from 'react';
import ReactDOM from 'react-dom';

class SelectionBar extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className = "col-12 nopadding">
        <button type="button"
                onClick={this.props.copyButtonClick}
                className="float-right copy-button" >
          <img src="images/copy.svg"
               className ="copy-image"
               width="13" 
               alt="Copy to clipboard"/>
        </button>
      </div>
    )
  }
}

export default SelectionBar;
