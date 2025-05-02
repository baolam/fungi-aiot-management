import React, { useState } from 'react';
import { Button, Col, Form, Modal, Row } from 'react-bootstrap';
import { addScript } from '../../../apis/script.api';
import { useDispatch } from 'react-redux';
import { updateRefreshCode } from '../../../store/script.store';

const AddNewScriptModal = ({ open, onClose, fungiId, stageId, diseaseId }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const dispatch = useDispatch();

  const onCloseModal = () => {
    setName('');
    setDescription('');
    onClose();
  };

  const onAddScript = () => {
    if (name === '') {
      alert('Name is null!');
      return;
    }

    if (description === '') {
      alert('Description is null!');
    }

    const data = {
      name,
      description,
      fungiId,
      stageId,
      diseaseId,
    };

    addScript(data).then(({ err, message }) => {
      if (err) {
        alert(message);
        return;
      }

      onCloseModal();
      dispatch(updateRefreshCode(2));
    });
  };

  return (
    <Modal show={open}>
      <Modal.Header>
        <Modal.Title>Add script</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Row>
            <Col>
              <Form.Group>
                <Form.Label>FungiId</Form.Label>
                <Form.Control type="number" disabled value={fungiId} />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>StageID</Form.Label>
                <Form.Control type="number" disabled value={stageId} />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>DiseaseID</Form.Label>
                <Form.Control type="number" disabled value={diseaseId} />
              </Form.Group>
            </Col>
          </Row>
          <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control
              as="textarea"
              rows={2}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={5}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-primary" onClick={() => onAddScript()}>
          Add
        </Button>
        <Button variant="danger" onClick={() => onCloseModal()}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddNewScriptModal;
