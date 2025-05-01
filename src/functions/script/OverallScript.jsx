import React from 'react';
import { Button, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { updateChosenId } from '../../store/script.store';

const OverallScript = ({ script }) => {
  const scriptId = useSelector((state) => state.script.chosenScriptId);
  const dispatch = useDispatch();

  return (
    <>
      <h4 className="text-center">Overall</h4>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Stage Id</th>
            <th>Disease Id</th>
            <th className="name">Name</th>
            <th className="long-description">Description</th>
          </tr>
        </thead>
        <tbody>
          {script.map((record, idx) => {
            return (
              <tr
                className={scriptId === record.id ? 'table-success' : ''}
                key={idx}
                onClick={() => {
                  dispatch(updateChosenId(record.id));
                }}
              >
                <td>{record.id}</td>
                <td>{record.stageId}</td>
                <td>{record.diseaseId === -1 ? 'No' : record.diseaseId}</td>
                <td className="name">{record.name}</td>
                <td className="long-description">{record.description}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <Button variant="outline-success" className="w-100">
        Add new script
      </Button>
    </>
  );
};

export default OverallScript;
