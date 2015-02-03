/** @jsx React.DOM */

// __tests__/react-double-select-test.js

jest.dontMock('../lib/react-double-select.js');
jest.dontMock('../lib/react-multiple-select.js');
jest.dontMock('lodash');

var React = require('react/addons');
var DoubleSelect = require('../lib/react-double-select.js');
var MultipleSelect = require('../lib/react-multiple-select.js');
var TestUtils = React.addons.TestUtils;

function DoubleSelectTest(){
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

describe('DoubleSelect', function() {
  var doubleSelectTest = new DoubleSelectTest();

  it("should show two multiple select with lists", function(){
    // Given
    doubleSelectTest.setLists([{id:1, content:'one'}], [{id:2, content:'two'}]);

    // When
    doubleSelectTest.renderIntoDocument();

    // Then
    var domSelect1 = doubleSelectTest.getFirstSelectDom();
    var domSelect2 = doubleSelectTest.getSecondSelectDom();

    expect(doubleSelectTest.getMultipleSelects().length).toBe(2);
    expect(domSelect1.multiple).toBeTruthy();
    expect(domSelect1.options.length).toBe(1);
    expect(domSelect1.options[0].value).toBe('1');

    expect(domSelect2.multiple).toBeTruthy();
    expect(domSelect2.options.length).toBe(1);
    expect(domSelect2.options[0].value).toBe('2');
  });

  it("should add selected items from first list to second list", function(){
    // Given
    doubleSelectTest.setLists([{id:1, content:'one'}], []);
    doubleSelectTest.renderIntoDocument();

    // When
    doubleSelectTest.selectOptions(0);
    doubleSelectTest.addElements();

    // Then
    expect(doubleSelectTest.getSecondSelectDom().options.length).toBe(1);
    expect(doubleSelectTest.getFirstSelectDom().options.length).toBe(0);
  });

  it("should remove selected items from second list to first list", function(){
    // Given
    doubleSelectTest.setLists([], [{id:1, content:'one'}]);
    doubleSelectTest.renderIntoDocument();

    // When
    doubleSelectTest.selectOptions(1);
    doubleSelectTest.removeElements();

    // Then
    expect(doubleSelectTest.getSecondSelectDom().options.length).toBe(0);
    expect(doubleSelectTest.getFirstSelectDom().options.length).toBe(1);
  });

  it("should validate that lists are well formated", function(){
    // Given

    // When

    // Then
  });
});