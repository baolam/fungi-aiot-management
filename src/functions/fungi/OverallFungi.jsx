import React from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { updateChosenId } from '../../store/fungi.store';

const FakeCard = () => {
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Title>Fungi Name</Card.Title>
      <Card.Subtitle>...</Card.Subtitle>
      <Card.Text>...</Card.Text>
      <Card.Link href="#">Go to detail</Card.Link>
    </Card>
  );
};

const MAX_COLS = 3;

const OverallFungi = ({ fungis }) => {
  const n = fungis.length;
  const totalRows = parseInt(n / MAX_COLS) + (n % MAX_COLS) === 0 ? 0 : 1;
  const dispatch = useDispatch();

  const generateOneRow = (pos) => {
    const tmp = [];
    for (let i = 0; i < Math.min(pos + MAX_COLS, n); i++) {
      const paragraph = String(fungis[i].description).substring(0, 150);
      const description = fungis[i].description.length > 150 ? paragraph + '...' : paragraph;

      tmp.push(
        <>
          <Card style={{ width: '18rem' }}>
            <Card.Title>{fungis[i].name}</Card.Title>
            <Card.Subtitle>ID : {fungis[i].id}</Card.Subtitle>
            <Card.Text>{description}</Card.Text>
            <Card.Link href="#detail">Go to detail</Card.Link>
          </Card>
        </>
      );
    }

    const remanining = pos + MAX_COLS - n;
    if (remanining > 0) {
      for (let i = 0; i < remanining; i++) tmp.push(<FakeCard />);
    }

    return tmp;
  };

  const onClickDetail = (id) => {
    if (id > n) return;
    dispatch(updateChosenId(id));
  };

  return (
    <>
      <h4 className="text-center">Overall</h4>
      {(() => {
        const tmp = [];
        var pos = 0;
        for (let i = 0; i < totalRows; i++) {
          tmp.push(
            <Row style={{ marginRight: '5px' }} key={`row_${i}`}>
              {generateOneRow(pos).map((data_shown, i) => {
                return (
                  <Col
                    key={`col_${pos + i}`}
                    xs="auto"
                    onClick={() => onClickDetail(pos + i - MAX_COLS + 1)}
                  >
                    {data_shown}
                  </Col>
                );
              })}
            </Row>
          );
          pos += MAX_COLS;
        }
        return tmp;
      })()}
    </>
  );
};

export default OverallFungi;
