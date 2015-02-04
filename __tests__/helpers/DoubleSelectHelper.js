/** @jsx React.DOM */
jest.dontMock('../../lib/react-double-select.js');
jest.dontMock('../../lib/react-multiple-select.js');

var React = require('react/addons');
var TestUtils = React.addons.TestUtils;
var DoubleSelect = require('../../lib/react-double-select.js');

module.exports = function DoubleSelectTest(){
  this.firstList = [];
  this.secondList = [];
  this.rendered = null;
  this.selects = [];
  this.addButton = null;
  this.removeButton = null;

  this.getMultipleSelects = function getMultipleSelects(){
    return this.selects;
  };

  this.setLists = function setLists(firstList, secondList){
    this.firstList = firstList || [];
    this.secondList = secondList || [];
  };

  this.renderIntoDocument = function renderIntoDocument(){
    this.rendered = TestUtils.renderIntoDocument(
      <DoubleSelect firstList={this.firstList} secondList={this.secondList} />
    );
    this.update();
  };

  this.getFirstSelectDom = function getFirstSelectDom(){
    return this.selects[0].getDOMNode();
  };

  this.getSecondSelectDom = function getFirstSelectDom(){
    return this.selects[1].getDOMNode();
  };

  this.update = function update(){
    this.selects = TestUtils.scryRenderedDOMComponentsWithTag(this.rendered, 'select');
    var buttons = TestUtils.scryRenderedDOMComponentsWithTag(this.rendered, 'a');
    this.addButton = buttons[0];
    this.removeButton = buttons[1];
  };

  this.selectOptions = function selectOption(listIndex){
    TestUtils.Simulate.change(this.selects[listIndex], {target: {options: [{selected:'true'}]}});
  };

  this.addElements = function addElements(){
    TestUtils.Simulate.click(this.addButton);
  };

  this.removeElements = function removeElements(){
    TestUtils.Simulate.click(this.removeButton);
  };

}
