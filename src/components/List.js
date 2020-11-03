import React from "react";
import PropTypes from "prop-types";
import { DataGrid } from "@material-ui/data-grid";

import "./List.css";

export default function List(props) {
  return (
    <div className='ListRoot'>
      <h1>{props.title}</h1>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={props.rows}
          columns={props.columns}
          pageSize={5}
          onSelectionChange={(newSelection) =>
            props.handleSelectionChange(newSelection)
          }
        />
      </div>
    </div>
  );
}

List.propTypes = {
  rows: PropTypes.array,
  columns: PropTypes.array,
  title: PropTypes.string,
  handleSelectionChange: PropTypes.func,
};
