import React from 'react';
import ReactDOM from 'react-dom';

class ResultBox extends React.Component {
  render() {
    return (
      <div> {this.props.code} </div>
    )
  }
}

export default ResultBox;
