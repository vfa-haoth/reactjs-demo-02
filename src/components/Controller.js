import React, { Component } from 'react';
import SearchTask from './SearchTask';

class Controller extends Component {

  onClick = (sortBy,sortValue) => {
    
    this.props.onSort(sortBy,sortValue);
  }

  render() {
    return (
      <div className="row">
        <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2">
          <button 
            type="button" 
            className="btn btn-primary"
            onClick={this.props.onToggleForm}
          >
            <span className="fas fa-plus fa-fw" />
            Add task
          </button>
        </div>
        <div className={this.props.isDisplayed ? "col-xs-4 col-sm-4 col-md-4 col-lg-4"
        : "col-xs-8 col-sm-8 col-md-8 col-lg-8" }>
          <SearchTask onSearch={this.props.onSearch}/>
        </div>
        <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2">
          <div className="dropdown">
            <button 
              type="button" 
              className="btn btn-primary dropdown-toggle" 
              data-toggle="dropdown" 
              aria-haspopup="true" 
              aria-expanded="true"
            >
              Sort
              <span className="fas fa-caret-square-o-down pull-left" />
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenu">
              <li onClick = { () => this.onClick('name',1) } className="text-left">
                <a 
                  role="button" 
                  href="#a"
                  className={(this.props.sortBy === 'name' && this.props.sortValue === 1) ?
                  'sort-selected' : '' }
                >&nbsp;
                  <span className="fas fa-sort-alpha-down">
                    Sort by A-Z
                  </span>
                </a>
              </li>
              <li onClick = {() => this.onClick('name',-1)} className="text-left">
                <a role="button" 
                   href="#a"
                  className={(this.props.sortBy === 'name' && this.props.sortValue === -1) ?
                  'sort-selected' : '' }
                >&nbsp;
                  <span className="fas fa-sort-alpha-up">
                    Sort by Z-A
                  </span>
                </a>
              </li>
              <li role="separator" className="divider"></li>
              <li onClick = {() => this.onClick('status',1)} className="text-left">
                <a role="button" href="#a" 
                  className={(this.props.sortBy === 'status' && this.props.sortValue === 1) ?
                  'sort-selected' : '' }
                >&nbsp;
                  <span className="fas fa-meh-blank">
                    Activate
                  </span>
                </a>
              </li>
              <li onClick = {() => this.onClick('status',-1)} className="text-left">
                <a role="button" href="#a" 
                  className={(this.props.sortBy === 'status' && this.props.sortValue === -1) ?
                  'sort-selected' : '' }
                >&nbsp;
                  <span className="far fa-meh-blank">
                    Deactivate
                  </span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default Controller;
