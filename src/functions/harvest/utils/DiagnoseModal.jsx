import React, { useEffect, useState } from 'react';
import { Button, Form, Modal, Table } from 'react-bootstrap';
import { useSocket } from '../../../hooks/useSocket';
import { useDispatch } from 'react-redux';
import { updateChosenId } from '../../../store/disease.store';
import { updateDisease } from '../../../apis/harvest.api';
import { updateRefreshCode } from '../../../store/harvest.store';

const DiagnoseModal = ({ open, onClose, harvestId }) => {
  const [nextStep, setNextStep] = useState(0);
  const [symptons, setSymptons] = useState('');
  const [responseSymptons, setResponseSymptons] = useState(null);
  const [selectedDisease, setSeletectedDisease] = useState(0);
  const dispatch = useDispatch();

  const socket = useSocket();

  const onCloseModal = () => {
    onClose();
    setNextStep(0);
    setSymptons('');
    setResponseSymptons(null);
  };

  useEffect(() => {
    if (socket === null) return;

    socket.on('diagnose-disease', (data) => {
      setResponseSymptons(data);
      if (data.length > 0) {
        setSeletectedDisease(data[0].id);
      }
    });

    return () => {
      socket.off('diagnose-disease');
    };
  }, [socket]);

  const onAcceptDisease = () => {
    updateDisease({
      id: harvestId,
      current_disease: selectedDisease,
    }).then(({ err, message }) => {
      if (err) {
        alert(message);
        return;
      }

      dispatch(updateChosenId(selectedDisease));
      dispatch(updateRefreshCode(1));
      onCloseModal();
    });
  };

  return (
    <Modal show={open} size="lg">
      <Modal.Header>
        <Modal.Title>Diagnose disease</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {nextStep === 0 && (
          <>
            <Form>
              <Form.Group>
                <Form.Label>Type your symptons</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={5}
                  value={symptons}
                  onChange={(e) => setSymptons(e.target.value)}
                />
              </Form.Group>
            </Form>
          </>
        )}
        {nextStep === 1 && responseSymptons === null && <p>Waiting response!</p>}
        {nextStep === 1 && responseSymptons !== null && (
          <Table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Description</th>
                <th>Confidence (%)</th>
              </tr>
            </thead>
            <tbody>
              {responseSymptons.length === 0 && <p>Database no stored this disease!</p>}
              {responseSymptons.length > 0 &&
                responseSymptons.map((response, index) => {
                  return (
                    <tr
                      key={index}
                      className={selectedDisease === response.id ? 'table-success' : ''}
                      onClick={() => {
                        setSeletectedDisease(response.id);
                      }}
                    >
                      <td>{response.id}</td>
                      <td>{response.name}</td>
                      <td>{response.description}</td>
                      <td>{response.score}</td>
                    </tr>
                  );
                })}
            </tbody>
          </Table>
        )}
      </Modal.Body>
      <Modal.Footer>
        {nextStep === 0 && (
          <Button
            variant="outline-success"
            onClick={() => {
              socket.emit('diagnose-disease', {
                harvestId,
                symptons,
              });
              setNextStep(1);
            }}
          >
            Diagnose
          </Button>
        )}
        {nextStep === 1 && (
          <Button variant="outline-success" onClick={() => onAcceptDisease()}>
            Accept this disease
          </Button>
        )}
        <Button variant="danger" onClick={onCloseModal}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DiagnoseModal;
