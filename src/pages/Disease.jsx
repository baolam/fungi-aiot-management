import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getDiseases } from '../apis/disease.api';
import { Col, Row, Tab } from 'react-bootstrap';
import ListGroups from '../components/ListGroups';
import OverallDisease from '../functions/disease/OverallDisease';

const functions = [
  {
    called: 'General',
    href: '',
    disabled: true,
  },
  {
    called: 'Overall',
    href: '#overall',
    disabled: false,
  },
  {
    called: 'Action',
    href: '',
    disabled: true,
  },
  {
    called: 'Create',
    href: '#create',
    disabled: true,
  },
  {
    called: 'Update',
    href: '#update',
    disabled: true,
  },
];

const Disease = () => {
  const fungiId = useSelector((state) => state.fungi.chosenFungiId);
  const [isLoading, setIsLoading] = useState(true);
  const [diseases, setDiseases] = useState(null);

  useEffect(() => {
    if (fungiId === null) return;

    setIsLoading(true);
    getDiseases(fungiId)
      .then((data) => {
        setIsLoading(false);
        setDiseases(data);
      })
      .catch((err) => {
        console.log(err);
        setDiseases([]);
      });
  }, [fungiId]);

  return (
    <>
      {isLoading && <p>Loading data...</p>}
      {!isLoading && (
        <Tab.Container defaultActiveKey="#overall">
          <Row>
            <Col xs={3}>
              <ListGroups functions={functions} />
            </Col>
            <Col xs={9}>
              <h5 className="text-center emphasize">
                You're doing tasks on your chosen fungi with id: {fungiId}
              </h5>
              <Tab.Content>
                <Tab.Pane eventKey="#overall">
                  <OverallDisease diseases={diseases} />
                </Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      )}
    </>
  );
};

export default Disease;
