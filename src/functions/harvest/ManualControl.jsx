import React, { useEffect, useState } from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import CircularProgress from '../../components/CircularProgress';
import { useSelector } from 'react-redux';
import { useSocket } from '../../hooks/useSocket';

const ManualControl = ({ latest, harvestId }) => {
  const { water, fan, brightness } = latest;
  const [brightnessControl, setBrightnessControl] = useState(brightness);
  const [fanControl, setFanControl] = useState(fan);
  const [waterControl, setWaterControl] = useState(water);

  useEffect(() => {
    setBrightnessControl(latest.brightness);
    setFanControl(latest.fan);
    setWaterControl(latest.water);
  }, [latest]);

  const socket = useSocket();
  const isOnline = useSelector((state) => state.harvest.onlineDevices)[harvestId] === true;

  const onConfirmMessage = () => {
    if (!isOnline) {
      alert('Device offline!');
      return;
    }

    const message = {
      harvestId,
      brightness: brightnessControl,
      fan: fanControl,
      water: waterControl,
    };

    /// Send event to server
    socket.emit('manual-control', message);
    // alert('Sent to server successfully!');
  };

  return (
    <>
      <h4 className="text-center">Latest commands</h4>
      <Row>
        <Col>
          <CircularProgress
            min={0}
            max={100}
            value={brightness}
            label={'Brightness'}
            text={`${brightness}%`}
            color="red"
          />
        </Col>
        <Col>
          <CircularProgress
            min={0}
            max={100}
            value={water}
            label={'Water'}
            text={`${water}%`}
            color="blue"
          />
        </Col>
        <Col>
          <CircularProgress
            min={0}
            max={100}
            value={fan}
            label={'Fan'}
            text={`${fan}%`}
            color="green"
          />
        </Col>
      </Row>
      <h4 className="text-center">Control</h4>
      <Form>
        <Form.Group>
          <Form.Label>Brightness level: {brightnessControl}%</Form.Label>
          <Form.Range
            min={0}
            max={100}
            value={brightnessControl}
            onChange={(e) => setBrightnessControl(Number(e.target.value))}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Water control: {waterControl}%</Form.Label>
          <Form.Range
            color="blue"
            min={0}
            max={100}
            value={waterControl}
            onChange={(e) => setWaterControl(Number(e.target.value))}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Fan control: {fanControl}%</Form.Label>
          <Form.Range
            color="green"
            min={0}
            max={100}
            value={fanControl}
            onChange={(e) => setFanControl(Number(e.target.value))}
          />
        </Form.Group>
        <Button variant="outline-danger" className="w-100" onClick={() => onConfirmMessage()}>
          Confirm
        </Button>
      </Form>
    </>
  );
};

export default ManualControl;
