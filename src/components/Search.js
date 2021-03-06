import React from "react";
import { Form, FormGroup, Label, Input, FormText } from "reactstrap";

const Search = props => {
  return (
    <Form onSubmit={props.handleSubmit}>
      <FormGroup>
        <Label for="search">Search for a Charity</Label>
        <Input
          style={{
            boxShadow: "1px 1px 2px 1px"
          }}
          onChange={props.handleChange}
          type="search"
          name="search"
          id="search"
          placeholder="Search..."
          value={props.searchQuery}
        />
        <FormText color="muted">
          Search matches by title, cause, and mission statement.
        </FormText>
      </FormGroup>
    </Form>
  );
};

export default Search;
