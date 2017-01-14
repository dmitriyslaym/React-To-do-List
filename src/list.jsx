var React = require('react');
var ListItem = require('./list-item');

module.exports = React.createClass({
  render: function() {
    return <div>
      {this.renderList()}
    </div>
  },
  filterByCompleteness: function(itemsToFilter) {
    if (this.props.doneFilter == 'done') {
      return itemsToFilter.filter(item => item.done == true);
    }
    else if (this.props.doneFilter == 'in process') {
      return itemsToFilter.filter(item => item.done == false);
    }
    else return itemsToFilter;
  },
  renderList: function() {
    if(!this.props.items) {
      return <h4>
        Add a todo to get started.
      </h4>
    } else {
      var children = [];
      var items = this.props.items;
      var itemsArr = [];

      for (var key in items) {
        var item = items[key];
        item.key = key;
        itemsArr.push(item);
      };

      var itemsArr = this.filterByCompleteness(itemsArr);

      return itemsArr.map(function(item, i) {
        return <ListItem
            item={item}
            key={item.key}
            >
          </ListItem>
      });
    }
  }
});
