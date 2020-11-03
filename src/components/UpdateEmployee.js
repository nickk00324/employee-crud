import gql from "graphql-tag";
import React from "react";
import { Mutation } from "react-apollo";
import { updateEmployee } from "../graphql/mutations";
import { listEmployees } from "../graphql/queries";
import AddEmployeeForm from "./AddEmployeeForm";

const UpdateEmployee = (props) => {
  const employee = props.history.location.state.selection;

  return (
    <Mutation
      mutation={gql(updateEmployee)}
      refetchQueries={[{ query: gql(listEmployees) }]}
    >
      {(updateEmployee, status) => (
        <AddEmployeeForm updateEmployee={updateEmployee} employee={employee} />
      )}
    </Mutation>
  );
};

export default UpdateEmployee;
