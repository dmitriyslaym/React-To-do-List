var React = require('react');
var ReactFire = require('reactfire');
var Firebase = require('firebase');
var Header = require('./header');
var List = require('./list');
var rootUrl = 'https://blistering-torch-4253.firebaseio.com/';

var App = React.createClass({
  mixins: [ ReactFire ],
  getInitialState: function() {
    return {
      items: {},
      loaded: false,
      doneFilter: 'all'
    }
  },
  componentWillMount: function() {
    this.fb = new Firebase(rootUrl + 'items/');
    this.bindAsObject(this.fb, 'items');
    this.fb.on('value', this.handleDataLoaded);
  },
  render: function() {
    return <div className="row panel panel-default">
      <div className="col-md-8 col-md-offset-2">
        <h2 className="text-center">
          To-Do List
        </h2>
        <Header generateNumberOptions={this.generateNumberOptions} itemsStore={this.firebaseRefs.items} />
        <hr />
        <div className={"content " + (this.state.loaded ? 'loaded' : '')}>
          <List generateNumberOptions={this.generateNumberOptions} items={this.state.items} doneFilter={this.state.doneFilter} />
          {this.deleteButton()}
        </div>
      </div>
    </div>
  },
  deleteButton: function() {
    if(!this.state.loaded) {
      return
    } else {
      return <div className="text-center clear-complete">
        <hr />
        <button
          type="button"
          onClick={this.onDeleteDoneClick}
          className="btn btn-default">
          Clear Complete
        </button>
        <div className="filters">
          <label>Filter by Completeness</label>
          <select onChange={this.handleDoneFilterChange}>
            <option value="all">All tasks</option>
            <option value="done">Only done</option>
            <option value="in process">Only in process</option>
          </select>
        </div>
      </div>
    }
  },
  onDeleteDoneClick: function() {
    for(var key in this.state.items) {
      if(this.state.items[key].done === true) {
        this.fb.child(key).remove();
      }
    }
  },
  handleDataLoaded: function(){
    this.setState({
      loaded: true
    });
  },
  handleDoneFilterChange: function(event) {
    this.setState({
      doneFilter: event.target.value
    });
  },
  // Methods that are used in different components
  generateNumberOptions: function() {
      var options = [];
      for (var i = 0; i < 10; i++) {
        options.push(i+1);
      };
      return options.map(function(option, i) {
        return <option value={option} key={i}>{option}</option>;
      });
    }
});

var element = React.createElement(App, {});
React.render(element, document.querySelector('.container'));
