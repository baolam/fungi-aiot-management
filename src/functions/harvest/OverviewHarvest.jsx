import React, { useState } from 'react';
import { Alert, Button } from 'react-bootstrap';
import { format, differenceInDays } from 'date-fns';
import { useSelector } from 'react-redux';
import DiagnoseModal from './utils/DiagnoseModal';

const MS_PER_DAY = 24 * 60 * 60 * 1000;

const OverviewHarvest = ({ harvest }) => {
  const { fungi, stage, disease } = harvest.additional;
  const harvests = useSelector((state) => state.harvest.onlineDevices);
  const [openDiagnoseModal, setOpenDiagnoseModal] = useState(false);

  const createdAt = new Date(harvest.createdAt);
  const overDueDated = new Date(createdAt.getTime() + stage.time * MS_PER_DAY);

  return (
    <>
      <h4 className="text-center">Overview</h4>
      <Alert variant="success">Date of planting: {format(createdAt, 'dd/MM/yyyy')}</Alert>
      <Alert variant="danger">
        Deadline for the next stage: {format(overDueDated, 'dd/MM/yyyy')}
      </Alert>
      <Alert>Time left: {differenceInDays(overDueDated, new Date())}</Alert>
      <Alert>
        Online status:{' '}
        {harvests[harvest.id] === undefined
          ? 'Not initalized'
          : harvests[harvest.id]
            ? 'Online'
            : 'Offline'}
      </Alert>
      <h4 className="text-center">Fungi information</h4>
      <Alert variant="success">{fungi.name}</Alert>
      <Alert variant="primary">{fungi.description}</Alert>
      <h4 className="text-center">Fungi's stage</h4>
      {stage.name !== undefined && (
        <>
          <Alert variant="success">{stage.name}</Alert>
          <Alert variant="primary">{stage.description}</Alert>
        </>
      )}
      {stage.name === undefined && <p>No stage found!</p>}
      <Button variant="outline-success" className="w-100">
        Update stage
      </Button>
      <h4 className="text-center">Disease</h4>
      {disease.name !== undefined && (
        <>
          <Alert variant="success">{disease.name}</Alert>
          <Alert>{disease.description}</Alert>
        </>
      )}
      {disease.name === undefined && <p>No disease found!</p>}
      <Button variant="outline-danger" className="w-100" onClick={() => setOpenDiagnoseModal(true)}>
        Diagnose disease
      </Button>
      <DiagnoseModal
        open={openDiagnoseModal}
        onClose={() => setOpenDiagnoseModal(false)}
        harvestId={harvest.id}
      />
    </>
  );
};

export default OverviewHarvest;
