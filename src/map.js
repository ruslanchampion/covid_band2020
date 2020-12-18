/* eslint-disable */
import React from 'react';
import ReactDOM from 'react-dom';
import './map/App.css';
import { MenuItem, FormControl, Select } from "@material-ui/core";
function App() {
  return React.createElement(
    'div',
    { className: 'App' },
    React.createElement(
      'h1',
      null,
      'HI'
    ),
    React.createElement(
      FormControl,
      { className: 'app__dropdown' },
      React.createElement(
        Select,
        {
          variant: 'outlined',
          value: 'abc'
        },
        React.createElement(
          MenuItem,
          { value: 'worldwide' },
          'Worldwide'
        ),
        React.createElement(
          MenuItem,
          { value: 'worldwide' },
          'Option two'
        ),
        React.createElement(
          MenuItem,
          { value: 'worldwide' },
          'Option 3'
        ),
        React.createElement(
          MenuItem,
          { value: 'worldwide' },
          'otion 4'
        )
      )
    )
  );
}

ReactDOM.render(React.createElement(
  React.StrictMode,
  null,
  React.createElement(App, null)
), document.getElementById('mapReact'));