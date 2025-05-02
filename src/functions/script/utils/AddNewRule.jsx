import React, { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { addRule } from '../../../apis/script.api';
import { updateRefreshCode } from '../../../store/script.store';

const AddNewRule = ({ open, onClose }) => {
  const scriptId = useSelector((state) => state.script.chosenScriptId);
  const [name, setName] = useState('');
  const [inputRule, setInputRule] = useState('');
  const [outputRule, setOutputRule] = useState('');
  const [description, setDescription] = useState('');
  const dispatch = useDispatch();

  const onCloseModal = () => {
    setName('');
    setInputRule('');
    setOutputRule('');
    setDescription('');
    onClose();
  };

  const onAddNewRule = () => {
    /// Validate not perfect
    if (name === '' || inputRule === '' || outputRule === '' || description === '') {
      alert('Some fields are null!');
      return;
    }

    const data = {
      scriptId,
      name,
      description,
      input_rule: inputRule,
      output_rule: outputRule,
    };

    addRule(data).then(({ err, message }) => {
      if (err) {
        alert(message);
        return;
      }

      dispatch(updateRefreshCode(2));
      onCloseModal();
    });
  };

  return (
    <Modal show={open} size="lg">
      <Modal.Header>
        <Modal.Title>Add rule</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>ScriptID</Form.Label>
            <Form.Control type="text" disabled value={scriptId} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Input's Rule</Form.Label>
            <Form.Control
              as="textarea"
              rows={1}
              value={inputRule}
              onChange={(e) => setInputRule(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Output's Rule (just 1 component)</Form.Label>
            <Form.Control
              as="textarea"
              rows={1}
              value={outputRule}
              onChange={(e) => setOutputRule(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-success" onClick={() => onAddNewRule()}>
          Add
        </Button>
        <Button variant="danger" onClick={() => onCloseModal()}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddNewRule;
