import React from "react";
import { Mutation } from "react-apollo";
import { withRouter } from "react-router-dom";
import { updateSkill } from "../graphql/mutations";
import { TextField, Button } from "@material-ui/core";
import gql from "graphql-tag";
import { listSkills } from "../graphql/queries";

import "./UpdateSkill.css";

const UpdateSkill = (props) => {
  const skill = props.history.location.state.selection;
  const [name, setName] = React.useState(skill.name);

  const handleSubmit = (updateSkill) => {
    if (name !== "") {
      updateSkill({
        variables: {
          input: {
            id: skill.id,
            name: name,
          },
        },
      })
        .then((res) => props.history.push("/skills"))
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className='UpdateSkillRoot'>
      <Mutation
        mutation={gql(updateSkill)}
        refetchQueries={[{ query: gql(listSkills) }]}
      >
        {(updateSkill, status) => (
          <>
            <TextField
              id='filled-basic'
              label='Skill Name'
              variant='filled'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Button
              variant='contained'
              color='primary'
              onClick={() => handleSubmit(updateSkill)}
              disabled={status.loading || name === ""}
            >
              Update Skill
            </Button>
          </>
        )}
      </Mutation>
    </div>
  );
};

export default withRouter(UpdateSkill);
