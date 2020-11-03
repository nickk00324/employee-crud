import React from "react";
import { Fab } from "@material-ui/core";
import { withRouter } from "react-router-dom";

import "./UpdateDelete.css";

function UpdateDelete(props) {
  const { selection, deleteMutation } = props;

  const handleDelete = (selection, mutatingFunction) => {
    mutatingFunction({ variables: { input: { id: selection.id } } });
  };

  const handleUpdate = (selection, type) => {
    props.history.push({
      pathname: `/update_${type}`,
      state: {
        selection,
      },
    });
  };

  const handleAdd = (type) => {
    props.history.push(`/add_${type}`);
  };

  return (
    <div className='UpdateDeleteRoot'>
      <div className='UpdateDelete__buttons'>
        <Fab
          onClick={() => handleUpdate(selection, props.type)}
          color='primary'
          variant='contained'
          disabled={selection == null}
        >
          Update
        </Fab>
        <Fab
          onClick={() => handleAdd(props.type)}
          color='primary'
          variant='contained'
        >
          Add
        </Fab>
        <Fab
          onClick={() => handleDelete(selection, deleteMutation)}
          color='secondary'
          variant='contained'
          disabled={selection == null}
        >
          Delete
        </Fab>
      </div>
    </div>
  );
}

export default withRouter(UpdateDelete);
