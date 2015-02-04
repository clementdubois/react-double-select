/** @jsx React.DOM */

// __tests__/react-double-select-test.js
jest.dontMock('./helpers/DoubleSelectHelper.js');

var React = require('react/addons');
var DoubleSelectHelper = require('./helpers/DoubleSelectHelper.js');

describe('DoubleSelect', function() {
  var doubleSelectTest = new DoubleSelectHelper();

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