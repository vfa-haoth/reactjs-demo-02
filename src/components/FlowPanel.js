import React, { Component } from 'react';

class FlowPanel extends Component {

  constructor(props){
    super(props);
    this.state = {
      id : '',
      name : '',
      date : '',
      status : true
    }
  }

  componentWillMount(){
    if ( this.props.taskEditing ){
      this.setState({
        id : this.props.taskEditing.id,
        name : this.props.taskEditing.name,
        date : this.props.taskEditing.date,
        status : this.props.taskEditing.status
      })
    }
  }

  componentWillReceiveProps(nextProps){
    if ( nextProps && nextProps.taskEditing ){
      this.setState({
        id : nextProps.taskEditing.id,
        name : nextProps.taskEditing.name,
        date : nextProps.taskEditing.date,
        status : nextProps.taskEditing.status
      })
    } else if ( !nextProps.taskEditing ) {
      this.setState({
        id : '',
        name : '',
        date : '',
        status : true
      });
    }
  }

  onChange(event){
    var target = event.target;
    var name = target.name;
    var value = target.value;

    if(name === 'status'){
      value = target.value === 'true' ? true : false
    }

    this.setState({
      [name] : value
    });
  }

  onSubmit(event){
    event.preventDefault();
    this.props.onSubmit(this.state);

    this.onClear();
    this.props.onClose();
  }

  onClear = () => {
    this.setState({
      name : '',
      date : '',
      status : true
    });
    this.props.onClose();
  }

  render() {
    var { id } = this.state;

    return (
      <div className="panel panel-danger">
        <div className="panel-heading">
          <h3 className="panel-title">
            { id !== '' ? 'Edit' : 'Add task' }
            <span className="fas fa-times-circle pull-right" onClick={this.props.onClose}></span>
          </h3>
        </div>
        <div className="panel-body">
          <form onSubmit = {this.onSubmit.bind(this)}>
            <div className="form-group">
              <label>Task name:</label>
              <input 
                type="text" 
                className="form-control" 
                name="name" 
                value={this.state.name}
                onChange={this.onChange.bind(this)}
              />
            </div>
            <div className="form-group">
              <label>Task date:</label>
              <input 
                type="date" 
                className="form-control" 
                name="date" 
                value={this.state.date}
                onChange={this.onChange.bind(this)}
              />
            </div>
            <div className="form-group">
              <label>Status:</label>
              <select 
                name="status" 
                className="form-control"
                value={this.state.status}
                onChange={this.onChange.bind(this)}
              >
                <option value={true}>Activate</option>
                <option value={false}>Deactivate</option>
              </select>
            </div>
            <div className="text-center">
              <button 
                type="submit" 
                className="btn btn-primary" 
              >
                <span className="fas fa-pencil-alt pull-left">
                  &nbsp;
                  Submit
                </span>
              </button>
              &nbsp;
              <button type="button" className="btn btn-danger" onClick={this.onClear}>
                <span className="fas fa-trash-alt pull-left">
                  &nbsp;
                  Cancel
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default FlowPanel;
