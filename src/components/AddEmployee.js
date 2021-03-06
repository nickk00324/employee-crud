import React from "react";
import { Mutation } from "react-apollo";
import { createEmployee } from "../graphql/mutations";
import gql from "graphql-tag";

import AddEmployeeForm from "./AddEmployeeForm";

const getSkills = gql`
  query ListSkills {
    listSkills {
      items {
        id
        name
      }
    }
  }
`;

const AddEmployee = () => {
  return (
    <Mutation
      mutation={gql(createEmployee)}
      refetchQueries={[{ query: getSkills }]}
    >
      {(createEmployee, status) => {
        return <AddEmployeeForm createEmployee={createEmployee} {...status} />;
      }}
    </Mutation>
  );
};

export default AddEmployee;
