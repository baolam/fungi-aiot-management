import React, { useEffect, useState } from 'react';
import { getFungiInfor } from '../apis/fungi.api';
import { Col, Row, Tab } from 'react-bootstrap';
import ListGroups from '../components/ListGroups';
import OverallFungi from '../functions/fungi/OverallFungi';
import DetailFungi from '../functions/fungi/DetailFungi';

const functions = [
  {
    called: 'General Infor',
    href: '',
    disabled: true,
  },
  {
    called: 'Overall',
    href: '#overall',
    disabled: false,
  },
  {
    called: 'Detail',
    href: '#detail',
    disabled: false,
  },
  {
    called: 'Actions',
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
  {
    called: 'Delete',
    href: '#delete',
    disabled: true,
  },
];

const Fungi = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [fungiInfor, setFungiInfor] = useState(null);

  useEffect(() => {
    if (fungiInfor !== null) return;
    setIsLoading(true);

    getFungiInfor()
      .then((data) => {
        setIsLoading(false);
        setFungiInfor(data);
      })
      .catch((err) => console.log(err));
  }, [fungiInfor]);

  return (
    <div>
      {isLoading && <p>Loading data...</p>}
      {!isLoading && (
        <Tab.Container defaultActiveKey="#overall">
          <Row>
            <Col xs={3}>
              <ListGroups functions={functions} />
            </Col>
            <Col xs={9}>
              <Tab.Content>
                <Tab.Pane eventKey="#overall">
                  <OverallFungi fungis={fungiInfor} />
                </Tab.Pane>
                <Tab.Pane eventKey="#detail">
                  <DetailFungi />
                </Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      )}
    </div>
  );
};

export default Fungi;
