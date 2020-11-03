import gql from "graphql-tag";
import React from "react";
import { Mutation, Query } from "react-apollo";
import { Button } from "@material-ui/core";

import AddSkillForm from "./AddSkillForm";
import { listSkills } from "../graphql/queries";
import { createSkill } from "../graphql/mutations";

import "./AddSkills.css";

const AddSkills = () => {
  const [skills, setSkills] = React.useState([]);
  const [shouldUpdateSkills, setShouldUpdateSkills] = React.useState(false);
  const [creationError, setCreationError] = React.useState("");
  const [success, setSuccess] = React.useState(false);

  const handleSkillChange = (newSkills) => {
    setSkills(newSkills);
  };

  const handleSubmit = (createSkill, allSkills) => {
    const allSkillNames = allSkills.map((skill) => skill.name);
    const skillsToAdd = skills.filter(
      (skill) => allSkillNames.indexOf(skill) === -1
    );
    const skillPromises = [];
    skillsToAdd.forEach((skill) => {
      const res = createSkill({
        variables: { input: { name: skill } },
      });
      skillPromises.push(res);
    });
    Promise.all(skillPromises)
      .then((values) => {
        setSuccess(true);
        setSkills([]);
        setShouldUpdateSkills(true);
      })
      .catch((err) => setCreationError(err.message));

    setTimeout(() => {
      setShouldUpdateSkills(false);
    }, 0);
    setTimeout(() => setSuccess(false), 5000);
  };

  return (
    <div className='AddSkillsRoot'>
      <Mutation
        mutation={gql(createSkill)}
        refetchQueries={[{ query: gql(listSkills) }]}
      >
        {(createSkill) => (
          <Query query={gql(listSkills)} fetchPolicy='no-cache'>
            {({ data, loading, error }) => (
              <>
                <AddSkillForm
                  onSkillChange={handleSkillChange}
                  skills={skills}
                  allSkills={data.listSkills.items}
                  shouldUpdateSkills={shouldUpdateSkills}
                />
                <div className='AddSkills__button'>
                  <Button
                    variant='contained'
                    color='primary'
                    onClick={() =>
                      handleSubmit(createSkill, data.listSkills.items)
                    }
                    disabled={skills.length === 0}
                  >
                    Add Skills
                  </Button>
                </div>
                {creationError && <p>{error}</p>}
                {success && <p>Skills added!</p>}
              </>
            )}
          </Query>
        )}
      </Mutation>
    </div>
  );
};

export default AddSkills;
