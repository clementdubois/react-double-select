var React = require('react');
var DoubleSelect = require('../lib/react-double-select.js');

var firstList = [
  {id:1, content:"test1"},
  {id:2, content:"test2"}
];

var secondList = [
  {id:3, content:"test3"},
  {id:4, content:"test4"}
];
React.render(
  <DoubleSelect firstList={firstList} secondList={secondList} />,
  document.body
);