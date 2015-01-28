/** @jsx React.DOM */
(function (root, factory) {

  if (typeof define === 'function' && define.amd) {
    define(['.', 'lodash'], factory);
  } else if (typeof module === 'object' && typeof module.exports === 'object') {
    module.exports = factory(require('react'), require('lodash'));
  } else {
    root.MultipleSelect = factory(root.React, root._);
  }

}(this, function (React, _) {
  return React.createClass({

    render: function(){
      var options = this.props.list.map(function(item){
        return <option value={item.id}>{item.content}</option>
      });

      return <select multiple value={_.pluck(this.props.selected, 'id')} onChange={this.props.onChange}>
          {options}
      </select>
    }

  });
}));