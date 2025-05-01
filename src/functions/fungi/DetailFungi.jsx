import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getFungiDetail } from '../../apis/fungi.api';
import { Alert, Button, Table } from 'react-bootstrap';

const DetailFungi = () => {
  const fungiId = useSelector((state) => state.fungi.chosenFungiId);

  const [detailInfor, setDetailInfor] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);

    if (fungiId !== null) {
      getFungiDetail(fungiId)
        .then((data) => {
          setDetailInfor(data);
          setIsLoading(false);
        })
        .catch((err) => console.log(err));
    }
  }, [fungiId]);

  // if (detailInfor !== null) {
  //   console.log(detailInfor);
  // }

  return (
    <div>
      {isLoading && <p>Loading...</p>}
      {!isLoading && (
        <>
          <h5 className="text-center emphasize">
            You're doing actions on fungi with ID: {fungiId}
          </h5>
          <h4 className="text-center">Detail information</h4>
          <Alert variant="success">{detailInfor.description}</Alert>
          <Alert variant="primary">
            Total stages assigned with this fungi: {detailInfor.stages.length}
          </Alert>
          <Alert variant="danger">
            Total diseases assigned with this fungi: {detailInfor.diseases}
          </Alert>
          <h4 className="text-center">Stages</h4>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Time</th>
                <th className="long-description">Description</th>
              </tr>
            </thead>
            <tbody>
              {detailInfor.stages.map((stage, idx) => {
                return (
                  <tr key={idx}>
                    <td>{stage.id}</td>
                    <td>{stage.name}</td>
                    <td>{stage.time}</td>
                    <td className="long-description">{stage.description}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
          <hr />
          <Button variant="outline-success" className="w-100">
            Add new stage
          </Button>
        </>
      )}
    </div>
  );
};

export default DetailFungi;
