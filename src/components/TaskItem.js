import React, { Component } from 'react';

class TaskItem extends Component {

  onChangeStatus = () => {
    this.props.onChangeStatus(this.props.task.id);
  }

  onDelete = () => {
    this.props.onDelete(this.props.task.id);
  }

  onUpdate = () => {
    this.props.onUpdate(this.props.task.id);
  }

  render() {
    var {task, index} = this.props;
    return (
      <tr> 
        <td>{index + 1}</td>
        <td>{task.name}</td>
        <td>{task.date}</td>
        <td className="text-center">
          <span className={task.status === true ? 'label label-success' 
          : 'label label-danger'}
          onClick = {this.onChangeStatus}
          >
            {task.status === true ? 'Activated' : 'Deactivated'}
          </span>
        </td>
        <td className="text-center">
          <button 
            type="button" 
            className="btn btn-primary"
            onClick={this.onUpdate}
          >
            <span className="fas fa-edit">
              &nbsp;
              Edit
            </span>
          </button>
          &nbsp;
          <button 
            type="button" 
            className="btn btn-danger"
            onClick = {this.onDelete}
          >
            <span className="fas fa-trash-alt">
              &nbsp;
              Delete
            </span>
          </button>
        </td>
      </tr>
    );
  }
}

export default TaskItem;
