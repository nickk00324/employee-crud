import React from "react";
import { TextField, Chip } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    width: 500,
    "& > * + *": {
      marginTop: theme.spacing(3),
    },
  },
}));

const AddSkillTags = (props) => {
  const classes = useStyles();
  const allSkills = props.allSkills.map((skill) => skill.name);

  console.log(props);

  return (
    <div className={classes.root}>
      <Autocomplete
        onChange={(e, value) => {
          props.onSkillChange(value);
        }}
        multiple
        id='tags-filled'
        options={allSkills}
        value={props.skills}
        defaultValue={props.skills}
        freeSolo
        renderTags={(value, getTagProps) => {
          return props.skills.map((option, index) => (
            <Chip
              variant='outlined'
              label={option}
              {...getTagProps({ index })}
            />
          ));
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            variant='filled'
            label='Skills'
            placeholder='Add Skill'
          />
        )}
      />
    </div>
  );
};

export default AddSkillTags;
