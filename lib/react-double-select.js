/** @jsx React.DOM */
(function (root, factory) {

  if (typeof define === 'function' && define.amd) {
    define(['.', 'lodash'], factory);
  } else if (typeof module === 'object' && typeof module.exports === 'object') {
    module.exports = factory(require('react'), require('lodash'));
  } else {
    root.Loader = factory(root.React, root._);
  }

}(this, function (React, _) {
  var DoubleSelect = React.createClass({
    getInitialState: function() {
      return {
        first: {
          'list':this.props.firstList,
          'selected':[]
        },
        second: {
          'list': this.props.secondList,
          'selected': []
        }
      };
    },

    _updateSelectedValues: function(source, e){
      this.state[source].selected = [];

      for(var i=0; i < e.target.options.length; i++){
        if(e.target.options[i].selected){
          this.state[source].selected.push(this.state[source].list[i]);
        }
      }

      this.forceUpdate();
    },

    _moveItems: function(source, destination){
        this.state[destination].list = this.state[destination].list.concat(this.state[source].selected);

        for(var i=0; i<this.state[source].list.length; i++){
          for(var j=0; j<this.state[source].selected.length; j++){
            if(this.state[source].list[i].id === this.state[source].selected[j].id){
              this.state[source].list.splice(i,1);
            }
          }
        }
        this.state[source].selected = [];
        this.forceUpdate();
    },

    render: function(){
      return <div>
          <MultipleSelect
            list={this.state['first'].list}
            selected={this.state['first'].selected}
            onChange={this._updateSelectedValues.bind(null, 'first')}
          />
          <a onClick={this._moveItems.bind(null, 'first', 'second')}>&#62;&#62;</a>
          <a onClick={this._moveItems.bind(null, 'second', 'first')}>&#60;&#60;</a>
          <MultipleSelect
            list={this.state['second'].list}
            selected={this.state['second'].selected}
            onChange={this._updateSelectedValues.bind(null, 'second')}
          />
        </div>;
    }
  });

  var MultipleSelect = React.createClass({

    _getSelectedIds: function(selected){
      return selected.map(function(item){
        return item.id;
      });
    },

    render: function(){
      var options = this.props.list.map(function(item){
        return <option value={item.id}>{item.content}</option>
      });

      return <select multiple value={this._getSelectedIds(this.props.selected)} onChange={this.props.onChange}>
        {options}
      </select>
    }

  });

  return DoubleSelect;
}));