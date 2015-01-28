/** @jsx React.DOM */

// tests/CheckboxWithLabel-test.js

jest.dontMock('../lib/react-multiple-select.js');
jest.dontMock('lodash');

describe('MultipleSelect', function() {

  var React = require('react/addons');
  var MultipleSelect = require('../lib/react-multiple-select.js');
  var TestUtils = React.addons.TestUtils;

  it('Should show the good options values and texts', function() {
    // Given
    var list = [{id:1, content:'one'},{id:2, content:'two'}];
    var select = TestUtils.renderIntoDocument(
      <MultipleSelect list={list} selected={[]}/>
    );

    // When
    var options = TestUtils.scryRenderedDOMComponentsWithTag(
      select, 'option');

    // Then
    expect(options.length).toBe(2);
    expect(options[0].getDOMNode().textContent).toEqual('one');
    expect(options[0].getDOMNode().value).toEqual('1');
    expect(options[1].getDOMNode().textContent).toEqual('two');
    expect(options[1].getDOMNode().value).toEqual('2');
  });

  it('Should select the selected list', function(){
    // Given
    var list = [{id:3, content:'three'},{id:4, content:'four'}];
    var selected = [{id:4, content:'four'}];
    var select = TestUtils.renderIntoDocument(
      <MultipleSelect list={list} selected={selected}/>
    );

    //When
    var options = TestUtils.scryRenderedDOMComponentsWithTag(
      select, 'option');

    //Then
    expect(options[0].getDOMNode().selected).toBeFalsy();
    expect(options[1].getDOMNode().selected).toBeTruthy();
  });

});