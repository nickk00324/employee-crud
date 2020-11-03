import React from "react";
import List from "./List";
import { Query, Mutation } from "react-apollo";
import gql from "graphql-tag";
import { listSkills } from "../graphql/queries";
import { deleteSkill } from "../graphql/mutations";
import UpdateDelete from "./UpdateDelete";

export default function Skills() {
  const [selection, setSelection] = React.useState(null);
  const columns = [
    { field: "id", headerName: "ID", width: 200 },
    { field: "name", headerName: "Name", width: 200 },
    { field: "createdAt", headerName: "Created", width: 200 },
  ];

  const handleSelectionChange = (selected) => {
    setSelection(selected.rows[0]);
  };

  return (
    <Mutation
      mutation={gql(deleteSkill)}
      refetchQueries={[{ query: gql(listSkills) }]}
    >
      {(deleteSkill, status) => (
        <Query query={gql(listSkills)} fetchPolicy='no-cache'>
          {({ loading, data, error }) => {
            if (loading) return <p>loading...</p>;
            if (error) return <p>{error.message}</p>;
            return (
              <>
                <List
                  columns={columns}
                  rows={data.listSkills.items}
                  title={"Skills"}
                  handleSelectionChange={handleSelectionChange}
                />
                <UpdateDelete
                  deleteMutation={deleteSkill}
                  selection={selection}
                  type={"skill"}
                />
              </>
            );
          }}
        </Query>
      )}
    </Mutation>
  );
}
