import React from 'react';
import { Button, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { updateChosenId } from '../../store/disease.store';

const OverallDisease = ({ diseases }) => {
  const diseaseId = useSelector((state) => state.disease.chosenDiseaseId);
  const dispatch = useDispatch();

  return (
    <>
      <h4 className="text-center">Overall</h4>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <td>Name</td>
            <td>Description</td>
          </tr>
        </thead>
        <tbody>
          {diseases.map((disease, idx) => {
            return (
              <tr
                key={idx}
                className={diseaseId === disease.id ? 'table-success' : ''}
                onClick={() => {
                  dispatch(updateChosenId(disease.id));
                }}
              >
                <td>{disease.id}</td>
                <td>{disease.name}</td>
                <td>{disease.description}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <Button className="w-100" variant="outline-success">
        Add new disease
      </Button>
    </>
  );
};

export default OverallDisease;
