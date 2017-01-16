var React = require('react');
var Firebase = require('firebase');
var rootUrl = 'https://blistering-torch-4253.firebaseio.com/';

module.exports = React.createClass({
  getInitialState: function() {
    return {
      text: this.props.item.text,
      deadline: this.props.item.deadline,
      priority: this.props.item.priority,
      done: this.props.item.done,
      taskChanged: false,
      moreInfo: false
    }
  },
  componentWillMount: function() {
    this.fb = new Firebase(rootUrl + 'items/' + this.props.item.key);
  },
  render: function() {
    return <div>
      <div className="input-group">
        <span className="input-group-addon">
          <input
            type="checkbox"
            checked={this.state.done}
            onChange={this.handleDoneChange}
            />
        </span>
        <input type="text"
          disabled={this.state.done}
          className="form-control"
          value={this.state.text}
          onChange={this.handleInputChange}
          data-key="text"
          />
        <span className="input-group-btn">
          {
            this.changesButtons()
          }
          <button
            className="btn btn-default"
            onClick={this.handleDeleteClick}
            >
            Delete
          </button>
          <button
            className="btn btn-default"
            onClick={this.handleInfoClick}
            >
            Show More Info
          </button>
        </span>
      </div>
      {this.renderMoreInfo()}
    </div>
  },
  // Additional functions
  changesButtons: function() {
    if(!this.state.taskChanged) {
      return null
    } else {
      return [
        <button
          className="btn btn-default"
          onClick={this.handleSaveClick}
          >
          Save
        </button>,
        <button
          onClick={this.handleUndoClick}
          className="btn btn-default"
          >
          Undo
        </button>
      ]
    }
  },
  handleSaveClick: function() {
    this.fb.update({
      text: this.state.text,
      deadline: this.state.deadline,
      priority: this.state.priority
      });
    this.setState({taskChanged: false});
  },
  handleUndoClick: function() {
    this.setState({
      text: this.props.item.text,
      deadline: this.props.item.deadline,
      priority: this.props.item.priority,
      taskChanged: false
    });
  },
  // All input changes in one function
  handleInputChange: function(event) {
    var newState = {
      taskChanged: true
    };
    for (key in this.state) {
      if (key == event.target.getAttribute('data-key')) {
        newState[key] = event.target.value;
      }
    };
    this.setState(newState);
  },
  // END All input changes in one function
  handleDoneChange: function(event) {
    var update = {
      done: event.target.checked,
    };
    this.setState(update);
    this.fb.update(update);
  },
  handleDeleteClick: function() {
    this.fb.remove();
  },
  handleInfoClick: function(event) {
    var more = 'Show More Info';
    var hide = 'Hide More Info';
    this.state.moreInfo == false ? this.setState({moreInfo: true}) : this.setState({moreInfo: false});
    event.target.innerHTML == more ? event.target.innerHTML = hide : event.target.innerHTML = more;
  },
  renderMoreInfo: function() {
    if (this.state.moreInfo == true) {
      return <div className="input-group moreInfo">
              <label>Deadline:</label>
              <input
                type="date"
                value={this.state.deadline}
                onChange={this.handleInputChange}
                data-key = 'deadline'
              />
              <label>Priority:</label>
              <select
               value={this.state.priority}
               onChange={this.handleInputChange}
               data-key = 'priority'
              >
                {this.props.generateNumberOptions()}
              </select>
             </div>;
    }
  }
});
