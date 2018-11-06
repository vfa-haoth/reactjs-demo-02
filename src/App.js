import React, { Component } from 'react';
import './App.css';
import FlowPanel from './components/FlowPanel';
import Controller from './components/Controller';
import Table from './components/Table';

class App extends Component {
  
  constructor(props){
    super(props);
    this.state = {
      tasks : [],
      isDisplayed : false,
      taskEditing : null,
      filter : {
        name : '',
        date : null,
        status : -1
      },
      keyword : '',
      sortBy : 'name',
      sortValue : 1
    }
  }

  componentWillMount(){
    if(localStorage && localStorage.getItem('tasks')){
      var tasks = JSON.parse(localStorage.getItem('tasks'));

      this.setState({
        tasks : tasks
      });
    }
  }

  onToggleForm(){
    if ( this.state.isDisplayed && this.state.taskEditing !== null ){
      this.setState({
        isDisplayed : true,
        taskEditing : null
      });
    }else {
      this.setState({
        isDisplayed : !this.state.isDisplayed,
        taskEditing : null
      });
    }
  }

  onShow = () => {
    this.setState({
      isDisplayed : true
    })
  }

  onClose(){
    this.setState({
      isDisplayed : false
    })
  }

  onSubmit(data){
    var { tasks } = this.state; 

    if ( data.id === '' ) {
      data.id = this.generateID();
      tasks.push(data);
    } else {
      var index = this.findIndex(data.id);
      tasks[index] = data;
    }

    this.setState({
      tasks : tasks ,
      taskEditing : null
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  random(){
    return Math.floor((1+Math.random())*0x10000).toString(16).substring(1);
  }

  generateID(){
    return this.random() 
    + '-' + this.random() + this.random() 
    + '-' + this.random()
    + '-' + this.random() + this.random() + this.random()
    + '-' + this.random();
  }

  onChangeStatus = (id) => {
    var {tasks} = this.state;
    var index = this.findIndex(id);
    if(index !== -1){
      tasks[index].status = !tasks[index].status;
      this.setState({
        tasks : tasks
      });
      localStorage.setItem('tasks',JSON.stringify(tasks));
    }

  }

  findIndex = (id) => {
    var result = '';
    var {tasks}=this.state;
    tasks.forEach ((task, index) => {
      if ( task.id === id){
        result = index;
      }
    })
    return result;
  }

  onDelete = (id) => {
    var {tasks} = this.state;
    var index = this.findIndex(id);
    if(index !== -1){
      tasks.splice(index, 1);
      this.setState({
        tasks : tasks
      });
      localStorage.setItem('tasks',JSON.stringify(tasks));
    }

    this.onClose();
  }

  onUpdate = (id) => {
    var {tasks} = this.state;
    var index = this.findIndex(id);
    var taskEditing = tasks[index];

    this.setState({
      taskEditing : taskEditing
    });

    this.onShow();
    localStorage.setItem('tasks',JSON.stringify(tasks));
  }

  onFilter = (filterName, filterDate, filterStatus) => {
    filterStatus = parseInt(filterStatus, 10);

    this.setState ({
      filter : {
        name : filterName.toLowerCase(),
        date : filterDate.toLowerCase(),
        status : filterStatus
      }
    })
  }

  onSearch = (keyword) => {
    this.setState({
      keyword : keyword
    })
  }

  onSort = (sortBy, sortValue) => {
    this.setState({
      sortBy : sortBy,
      sortValue : sortValue
    })
  }

  render() {

    var { 
      tasks, 
      isDisplayed, 
      taskEditing ,
      filter ,
      keyword,
      sortBy,
      sortValue 
    } = this.state; // var tasks = this.state.tasks

    if(filter){
      if(filter.name){
        tasks = tasks.filter((task) => {
          return task.name.toLowerCase().indexOf(filter.name) !== -1;
        });
      }

      // tasks = tasks.filter((task) => {
      //   if(filter.date === -1){
      //     return task;
      //   }else{
      //     // Note : Try sort by specific date
      //     return task.date.toLowerCase().indexOf(filter.date) !== -1;
      //   }
      // });

      tasks = tasks.filter((task) => {
        if(filter.status === -1){
          return task;
        }else{
          return task.status === ( filter.status === 0 ? true : false )
        }
      });
    }

    if(keyword){
      tasks = tasks.filter((task) => {
        return task.name.toLowerCase().indexOf(keyword) !== -1;
      })
    }

    if(sortBy==='name'){
      tasks.sort((a,b) => {
        return a.name > b.name ? sortValue : a.name < b.name ? -sortValue : 0;
      })
    }
    // else if(sortBy==='date'){
    //   tasks.sort((a,b) => {
    //     return a.date > b.date ? sortValue : a.date < b.date ? -sortValue : 0;
    //   })
    // }
    else{
      tasks.sort((a,b) => {
        return a.status > b.status ? -sortValue : a.status < b.status ? sortValue : 0;
      })
    }

    var eleFPanel = isDisplayed ? 
      <FlowPanel 
        onToggleForm = {this.onToggleForm.bind(this)}
        onClose = {this.onClose.bind(this)}
        onSubmit = {this.onSubmit.bind(this)}
        taskEditing = {taskEditing}
      /> 
      : '';

    return (
      <div className="container">
        <div className = "Header">
          <h2 align="center">Work management</h2>
        </div>
        <br/>
        <div className = "Body">
          <div className="row">
            <div className={ isDisplayed ? "col-xs-4 col-sm-4 col-md-4 col-lg-4" 
              : '' }>
              {eleFPanel}
            </div>
            <div className={ isDisplayed ? "col-xs-8 col-sm-8 col-md-8 col-lg-8" 
              : "col-xs-12 col-sm-12 col-md-12 col-lg-12" }
            >
              <Controller 
                isDisplayed = {isDisplayed} 
                onToggleForm = {this.onToggleForm.bind(this)}
                onSearch = {this.onSearch}
                onSort = {this.onSort}
                sortBy={this.sortBy}
                sortValue={this.sortValue}
              />
              <br/>
              <div className="row">
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                  <Table 
                    tasks={tasks} 
                    onChangeStatus={this.onChangeStatus}
                    onDelete = {this.onDelete}
                    onUpdate = {this.onUpdate}
                    onFilter = {this.onFilter}
                  />
                </div>
              </div>           
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
