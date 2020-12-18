/* eslint-disable */
import React from 'react';
import ReactDOM from 'react-dom';
import './map/App.css';
import {
  MenuItem,
  FormControl,
  Select,
} from "@material-ui/core";
function App() {
  return (
    <div className="App">
      <h1>HI</h1>
      <FormControl className="app__dropdown">
        <Select
          variant="outlined"
          value="abc"
        >
          <MenuItem value="worldwide">Worldwide</MenuItem>
          <MenuItem value="worldwide">Option two</MenuItem>
          <MenuItem value="worldwide">Option 3</MenuItem>
          <MenuItem value="worldwide">otion 4</MenuItem>
          

        </Select>
      </FormControl>
      {/* Header */}
      {/* Title + Selecet input dropdown field */}

      {/* InfoBoxs */}
      {/* InfoBoxs */}
      {/* InfoBoxs */}

      {/* Table */}
      {/* Graph */}

      {/* Map */}
    </div>
  );
}

ReactDOM.render(<React.StrictMode>
  <App />
</React.StrictMode>,
document.getElementById('mapReact'));