import React, { Component } from 'react';

class SearchTask extends Component {

  constructor(props){
    super(props);
    this.state = {
      keyword : ''
    }
  }

  onChange = (event) => {
    var target = event.target;
    var name = target.name;
    var value = target.value;
    this.setState ({
      [name] : value
    })
  }

  onSearch = () => {
    this.props.onSearch(this.state.keyword);
  }

  render() {
    var {keyword} = this.state;
    return (
      <div className="input-group">
        <input 
          type="text" 
          name="keyword" 
          className="form-control"
          value = {keyword}
          onChange = {this.onChange}
        />
        <span className="input-group-btn">
          <button type="button" className="btn btn-primary" onClick={this.onSearch}>
            <span className="fas fa-search"></span>
          </button>
        </span>
      </div>
    );
  }
}

export default SearchTask;
