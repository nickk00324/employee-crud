import React from "react";
import List from "./List";
import { Query, Mutation } from "react-apollo";
import gql from "graphql-tag";
import { deleteEmployee } from "../graphql/mutations";
import UpdateDelete from "./UpdateDelete";

const employees = gql`
  query ListEmployees {
    listEmployees {
      items {
        id
        firstname
        lastname
        skills {
          id
          name
        }
      }
    }
  }
`;

export default function Employees() {
  const [selection, setSelection] = React.useState(null);

  const columns = [
    { field: "id", headerName: "ID", width: 130 },
    { field: "firstname", headerName: "First name", width: 130 },
    { field: "lastname", headerName: "Last name", width: 130 },
    {
      field: "fullName",
      headerName: "Full name",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 160,
      valueGetter: (params) =>
        `${params.getValue("firstname") || ""} ${
          params.getValue("lastname") || ""
        }`,
    },
    {
      field: "skills",
      headerName: "Skills",
      width: 500,
      valueGetter: (params) => {
        const skills = params.data.skills.map((skill) => skill.name);
        return skills.join(", ");
      },
    },
  ];

  const handleSelectionChange = (selected) => {
    setSelection(selected.rows[0]);
  };

  return (
    <Mutation
      mutation={gql(deleteEmployee)}
      refetchQueries={[{ query: employees }]}
    >
      {(deleteEmployee, status) => (
        <Query query={employees} fetchPolicy='no-cache'>
          {({ loading, data, error }) => {
            if (loading) return <p>loading...</p>;
            if (error) return <p>{error.message}</p>;
            return (
              <>
                <List
                  columns={columns}
                  rows={data.listEmployees.items}
                  title={"Employees"}
                  handleSelectionChange={handleSelectionChange}
                />
                <UpdateDelete
                  selection={selection}
                  deleteMutation={deleteEmployee}
                  type={"employee"}
                />
              </>
            );
          }}
        </Query>
      )}
    </Mutation>
  );
}
