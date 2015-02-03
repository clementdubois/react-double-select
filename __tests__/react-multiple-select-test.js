/** @jsx React.DOM */

// __tests__/react-multiple-select-test.js

jest.dontMock('../lib/react-multiple-select.js');
jest.dontMock('lodash');

var React = require('react/addons');
var MultipleSelect = require('../lib/react-multiple-select.js');
var TestUtils = React.addons.TestUtils;

describe('MultipleSelect', function() {

  it('Should show the good options values and texts', function() {
    // Given
    var list = [{id:1, content:'one'},{id:2, content:'two'}];

    // When
    var select = TestUtils.renderIntoDocument(
      <MultipleSelect list={list} selected={[]}/>
    );

    // Then
    var options = TestUtils.scryRenderedDOMComponentsWithTag(select, 'option');
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

    //When
    var select = TestUtils.renderIntoDocument(
      <MultipleSelect list={list} selected={selected}/>
    );

    //Then
    var options = TestUtils.scryRenderedDOMComponentsWithTag(select, 'option');
    expect(options[0].getDOMNode().selected).toBeFalsy();
    expect(options[1].getDOMNode().selected).toBeTruthy();
  });

});