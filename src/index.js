import React, { Component } from "react";
import ReactDOM from "react-dom";
import { default as ReactSelect } from "react-select";
import "./index.css";
import Option from "./Option";
import axios from "axios";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      optionSelected: null,
      data: null,
    };
  }


  filterData() {
    axios.post("http://localhost:8000/api", {
      data: this.state.optionSelected,
    });
  }

  handleChange = (selected) => {
    this.setState({
      optionSelected: selected,
    });
    this.filterData()
  };

  componentDidMount() {
    const arrayData = [];
    axios
      .get("http://localhost:8000/api")
      .then((res) => {
        res.data.data.forEach((el) =>
          arrayData.push({ value: el.task, label: el.task })
        );
        this.setState({ data: arrayData });
        this.handleChange(JSON.parse(res.data.filteredData).data);
      })
      .catch((error) => console.log(error));
  }

  componentDidUpdate() {
    this.filterData();
  }

  render() {
    return (
      <span
        className="d-inline-block"
        data-toggle="popover"
        data-trigger="focus"
        data-content="Please selecet account(s)"
      >
        <ReactSelect
          options={this.state.data}
          isMulti
          closeMenuOnSelect={false}
          hideSelectedOptions={false}
          components={{
            Option,
          }}
          onChange={this.handleChange}
          allowSelectAll={true}
          value={this.state.optionSelected}
        />
      </span>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
