import React, { useState } from 'react';
import { Alert, Button, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { updateChosenId } from '../../store/script.store';
import AddNewScriptModal from './utils/AddNewScriptModal';

const OverallScript = ({ script, fungiId }) => {
  const scriptId = useSelector((state) => state.script.chosenScriptId);
  const stageId = useSelector((state) => state.fungi.chosenStageId);
  const diseaseId = useSelector((state) => state.disease.chosenDiseaseId);

  const [openAddNewScript, setOpenAddNewScript] = useState(false);

  const dispatch = useDispatch();
  const existedBefore = (() => {
    for (let i = 0; i < script.length; i++) {
      if (script[i].diseaseId === diseaseId && script[i].stageId === stageId) return true;
    }
    return false;
  })();

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
      {!existedBefore && (
        <Alert variant="danger">
          There're no script assigned for your chosen, DiseaseId: {diseaseId}, StageId: {stageId}
        </Alert>
      )}
      <Button
        variant="outline-success"
        className="w-100"
        disabled={existedBefore}
        onClick={() => {
          setOpenAddNewScript(true);
        }}
      >
        Add new script
      </Button>
      <AddNewScriptModal
        open={openAddNewScript}
        onClose={() => {
          setOpenAddNewScript(false);
        }}
        diseaseId={diseaseId}
        stageId={stageId}
        fungiId={fungiId}
      />
    </>
  );
};

export default OverallScript;
