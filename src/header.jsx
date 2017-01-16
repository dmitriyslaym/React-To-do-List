var React = require('react');

module.exports = React.createClass({
  getInitialState: function() {
    return {
      text: '',
      deadline: '',
      priority: ''
    }
  },
  render: function() {
    return <div>
          <div className="input-group">
            <input
              value={this.state.text}
              onChange={this.handleInputChange}
              type="text"
              className="form-control"
              data-key="text"
              />

            <span className="input-group-btn">
              <button
                onClick={this.showModal}
                className="btn btn-default"
                type="button">
                Add Task
              </button>
            </span>
          </div>
        <div className="modal" id="modal" onClick={this.closeModal}>
          <div className="modal__content">
              <p className="modal__selectText">Select a deadline and priority</p>
              <div className="modal__inputs">
                <input
                  type="date"
                  value={this.state.deadline}
                  onChange={this.handleInputChange}
                  data-key = 'deadline'
                  className="modal__input"
                />
                <select
                 value={this.state.priority}
                 onChange={this.handleInputChange}
                 data-key = 'priority'
                 className="modal__input"
                 >
                  {this.props.generateNumberOptions()}
                </select>
                  <button
                    onClick={this.handleClick}
                    className="btn btn-default modal__addBtn"
                    type="button">
                    Add New Task
                  </button>
                </div>
          </div>
        </div>
    </div>
  },
  // Additional functions
  handleClick: function() {
    this.props.itemsStore.push({
      text: this.state.text,
      deadline: this.state.deadline,
      priority: this.state.priority,
      done: false
    });

    this.setState({
      text: '',
      deadline: '',
      priority: '',
    });
    document.getElementById('modal').style.display = 'none';
  },
  handleInputChange: function(event) {
    var newState = {};
    for (key in this.state) {
      if (key == event.target.getAttribute('data-key')) {
        newState[key] = event.target.value;
      }
    };
    this.setState(newState);
  },
  showModal: function() {
    document.getElementById('modal').style.display = 'block';
  },
  closeModal: function(event) {
    if (event.target.id == 'modal') {
      document.getElementById('modal').style.display = 'none';
      this.setState({
        deadline: '',
        priority: '',
      });
    }
  }
});
