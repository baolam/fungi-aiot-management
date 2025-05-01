import React from 'react';
import { Button, Table } from 'react-bootstrap';

const RuleScript = ({ rules }) => {
  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Input</th>
            <th>Output</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {rules.map((rule, idx) => {
            return (
              <tr key={idx}>
                <td className="name">{rule.name}</td>
                <td>{rule.input_rule}</td>
                <td>{rule.output_rule}</td>
                <td className="long-description">{rule.description}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <Button className="w-100" variant="outline-success">
        Add new rule
      </Button>
    </>
  );
};

export default RuleScript;
