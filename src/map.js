/* eslint-disable react/jsx-no-undef */
/* eslint-disable react/jsx-closing-tag-location */
/* eslint-disable no-undef */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/jsx-filename-extension */
import './App.css';

function App() {
  return React.createElement(
    'div',
    { className: 'App' },
    React.createElement(
      'h1',
      null,
      'HI'
    )
  );
}

ReactDOM.render(React.createElement(
  React.StrictMode,
  null,
  React.createElement(App, null)
), document.getElementById('mapReact'));