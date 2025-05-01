import React, { useEffect, useState } from 'react';
import { getBriefHarvests } from '../apis/harvest.api';
import { Button, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { updateChosenId } from '../store/harvest.store';
import { useNavigate } from 'react-router-dom';

const HarvestOverview = () => {
  const [harvest, setHarvest] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const harvestId = useSelector((state) => state.harvest.chosenHarvestId);
  const harvests = useSelector((state) => state.harvest.onlineDevices);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (harvest !== null) return;

    setIsLoading(true);
    getBriefHarvests()
      .then((data) => {
        setIsLoading(false);
        setHarvest(data);
      })
      .catch((err) => {
        console.log(err);
        setHarvest([]);
      });
  }, [harvest]);

  return (
    <>
      {isLoading && <p>Loading data...</p>}
      {!isLoading && (
        <>
          <h4 className="text-center">All harvests</h4>
          <Table striped hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Fungi</th>
                <th>Stage</th>
                <th>Disease</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {harvest.map((point, idx) => {
                return (
                  <tr
                    key={idx}
                    className={harvestId === point.id ? 'table-success' : ''}
                    onClick={() => {
                      dispatch(updateChosenId(point.id));
                    }}
                  >
                    <td>{point.id}</td>
                    <td>{point.fungi}</td>
                    <td>{point.stage}</td>
                    <td>{point.disease}</td>
                    <td>
                      {harvests[point.id] === undefined
                        ? 'Not initalized'
                        : harvests[point.id]
                          ? 'Online'
                          : 'Offline'}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
          <Button
            variant="outline-success"
            className="w-100"
            onClick={() => {
              if (harvestId === null) return;
              navigate(`/harvest/${harvestId}`);
            }}
          >
            Go to harvest!
          </Button>
        </>
      )}
    </>
  );
};

export default HarvestOverview;
