/** @jsx React.DOM */

// tests/CheckboxWithLabel-test.js

jest.dontMock('../lib/react-multiple-select.js');
describe('MultipleSelect', function() {

  it('Shows the options', function() {
    var React = require('react/addons');
    var MultipleSelect = require('../lib/react-multiple-select.js');
    var TestUtils = React.addons.TestUtils;

    // Render a checkbox with label in the document
    var list = [{id:1, content:'one'},{id:2, content:'two'}];
    var select = TestUtils.renderIntoDocument(
      <MultipleSelect list={list} selected={[]}/>
    );

    // Verify that it's Off by default
    var options = TestUtils.scryRenderedDOMComponentsWithTag(
      select, 'option');
    expect(options.length).toBe(2);
    expect(options[0].getDOMNode().textContent).toEqual('one');
    expect(options[1].getDOMNode().textContent).toEqual('two');
  });

});