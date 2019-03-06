/**
 *@description: Re-useable input component
 */
import React, { Component } from "react";
import { TextField } from "@material-ui/core";
import "../App.css";
export default class Inputs extends Component {
  render() {
    return (
      <TextField
        type={this.props.type}
        className={this.props.className}
        id={this.props.id}
        name={this.props.name}
        placeholder={this.props.placeholder}
        value={this.props.value}
        onChange={this.props.onChange}
      />
    );
  }
}
