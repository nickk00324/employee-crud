import React from "react";
import { Query, Mutation } from "react-apollo";
import { TextField, Button } from "@material-ui/core";
import gql from "graphql-tag";
import { withRouter } from "react-router-dom";

import { createSkill } from "../graphql/mutations";
import { listSkills } from "../graphql/queries";
import AddSkillForm from "./AddSkillForm";

import "./AddEmployeeForm.css";

const AddEmployeeForm = (props) => {
  const { employee } = props;
  const [firstName, setFirstName] = React.useState(
    employee ? employee.firstname : ""
  );
  const [lastName, setLastName] = React.useState(
    employee ? employee.lastname : ""
  );
  const [skills, setSkills] = React.useState(
    employee ? employee.skills.map((skill) => skill.name) : []
  );
  const [shouldUpdateSkills, setShouldUpdateSkills] = React.useState(false);
  const [wasSuccess, setWasSuccess] = React.useState(false);

  const handleChange = (field, e) => {
    switch (field) {
      case "firstName":
        setFirstName(e.target.value);
        break;
      case "lastName":
        setLastName(e.target.value);
        break;
      default:
    }
  };

  const handleSkillChange = (newSkills) => {
    setSkills(newSkills);
  };

  const handleSubmit = (e, addNewSkill, allSkills) => {
    e.preventDefault();
    // Take all the skills they added to the user and create skills first
    const skillsToAdd = [];
    const preExistingSkillsToAdd = allSkills.filter(
      (skill) => skills.indexOf(skill.name) !== -1
    );
    const skillsToIgnore = preExistingSkillsToAdd.map((skill) => skill.name);
    skills.forEach(async (skill) => {
      if (skillsToIgnore.indexOf(skill) === -1) {
        const res = await addNewSkill({
          variables: { input: { name: skill } },
        });
        const currentDate = new Date().toISOString();
        const skillObj = {
          id: res.data.createSkill.id,
          name: res.data.createSkill.name,
          createdAt: currentDate,
          updatedAt: currentDate,
        };
        skillsToAdd.push(skillObj);
      } else {
        const currentSkill =
          preExistingSkillsToAdd[skillsToIgnore.indexOf(skill)];
        const skillObj = {
          id: currentSkill.id,
          name: currentSkill.name,
          createdAt: currentSkill.createdAt,
          updatedAt: currentSkill.updatedAt,
        };
        skillsToAdd.push(skillObj);
      }
    });

    if (!props.employee) {
      props
        .createEmployee({
          variables: {
            input: {
              firstname: firstName,
              lastname: lastName,
              skills: skillsToAdd,
            },
          },
        })
        .then((res) => {
          setSkills([]);
          setFirstName("");
          setLastName("");
          setWasSuccess(true);
        })
        .catch((err) => console.log(err));
    } else {
      props
        .updateEmployee({
          variables: {
            input: {
              id: props.employee.id,
              firstname: firstName,
              lastname: lastName,
              skills: skillsToAdd,
            },
          },
        })
        .then((res) => props.history.push("/employees"));
    }

    // To immediately re-render the autocomplete after submission without old values persisting
    setShouldUpdateSkills(true);
    setTimeout(() => setShouldUpdateSkills(false), 0);
    setTimeout(() => setWasSuccess(false), 5000);
  };

  return (
    <Mutation mutation={gql(createSkill)}>
      {(createSkill, createSkillStatus) => (
        <Query query={gql(listSkills)} fetchPolicy='no-cache'>
          {({ data, error, loading }) => {
            return (
              <form
                className='AddEmployeeFormRoot'
                noValidate
                autoComplete='off'
              >
                <TextField
                  id='filled-basic'
                  className='AddEmployeeForm__name'
                  label='First Name'
                  variant='filled'
                  value={firstName}
                  onChange={(e) => handleChange("firstName", e)}
                />
                <TextField
                  id='filled-basic'
                  className='AddEmployeeForm__name'
                  label='Last Name'
                  variant='filled'
                  value={lastName}
                  onChange={(e) => handleChange("lastName", e)}
                />
                <AddSkillForm
                  onSkillChange={handleSkillChange}
                  skills={skills}
                  allSkills={data.listSkills.items}
                  shouldUpdateSkills={shouldUpdateSkills}
                />
                <div className='AddEmployeeForm__button'>
                  <Button
                    variant='contained'
                    color='primary'
                    onClick={(e) =>
                      handleSubmit(e, createSkill, data.listSkills.items)
                    }
                    disabled={firstName === "" || lastName === ""}
                  >
                    {employee ? "Update Employee" : "Create Employee"}
                  </Button>
                </div>
                {props.error && <p>{props.error.message}</p>}
                {wasSuccess && (
                  <p className='AddEmployeeForm__success'>Employee Created!</p>
                )}
              </form>
            );
          }}
        </Query>
      )}
    </Mutation>
  );
};

export default withRouter(AddEmployeeForm);
