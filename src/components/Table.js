import React, { Component } from 'react';
import TaskItem from './TaskItem';

class Table extends Component {

  constructor(props) {
    super(props);
    this.state = {
      filterName: '',
      filterDate: '',
      filterStatus: -1
    }
  }

  onChange = (event) => {
    var target = event.target;
    var name = target.name;
    var value = target.value;

    this.props.onFilter(
      name === 'filterName' ? value : this.state.filterName,
      name === 'filterDate' ? value : this.state.filterDate,
      name === 'filterStatus' ? value : this.state.filterStatus
    );

    this.setState({
      [name]: value
    });
  }

  render() {
    var { tasks } = this.props;
    var { filterName, filterStatus } = this.state; //filterDate
    var eleTasks = tasks.map((task, index) => {
      return <TaskItem
        key={index}
        index={index}
        task={task}
        onChangeStatus={this.props.onChangeStatus}
        onDelete={this.props.onDelete}
        onUpdate={this.props.onUpdate}
      />
    })

    return (
      <div className="row">
        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
          <table className="table table-bordered table-hover">
            <thead>
              <tr>
                <th className="text-center">No.</th>
                <th className="text-center">Task name</th>
                <th className="text-center">Date</th>
                <th className="text-center">Status</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td></td>
                <td>
                  <input
                    type="text"
                    name="filterName"
                    className="form-control"
                    value={filterName}
                    onChange={this.onChange}
                  />
                </td>
                {/*<td>
                  <input
                    type="date"
                    name="filterDate" 
                    className="form-control"
                    value = {filterDate}
                    onChange = {this.onChange}
                  />
                </td>*/}
                <td></td>
                <td>
                  <select
                    name="filterStatus"
                    className="form-control"
                    value={filterStatus}
                    onChange={this.onChange}
                  >
                    <option value={-1}>All</option>
                    <option value={0}>Activated</option>
                    <option value={1}>Deactivated</option>
                  </select>
                </td>
                <td></td>
              </tr>
              {eleTasks}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default Table;
