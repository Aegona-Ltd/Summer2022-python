import React from 'react';
import ReactDOM from 'react-dom';
import Pagination from 'semantic-ui-react-button-pagination';
 
class Example extends React.Component {
  constructor() {
    super();
    this.state = {offset: 0};
  }
 
  handleClick(offset) {
    this.setState({offset});
  }
 
  render() {
    return (
      <Pagination
        offset={this.state.offset}
        limit={10}
        total={100}
        onClick={(e, props, offset) => this.handleClick(offset)}
      />
    );
  }
}
 
ReactDOM.render(
  <Example/>,
  document.getElementById('app')
);