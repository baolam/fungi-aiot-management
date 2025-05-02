import React, { useCallback, useEffect, useState } from 'react';
import { Col, Row, Tab } from 'react-bootstrap';
import ListGroups from '../components/ListGroups';
import { useParams } from 'react-router-dom';
import { getHarvest } from '../apis/harvest.api';
import { useSocket } from '../hooks/useSocket';
import OverviewHarvest from '../functions/harvest/OverviewHarvest';
import DataHarvest from '../functions/harvest/DataHarvest';
import ControlHistory from '../functions/harvest/ControlHistory';
import ManualControl from '../functions/harvest/ManualControl';
import HarvestAssistant from '../functions/harvest/HarvestAssistant';
import { useDispatch, useSelector } from 'react-redux';
import { updateRefreshCode } from '../store/harvest.store';

const functions = [
  {
    called: 'General',
    href: '',
    disabled: true,
  },
  {
    called: 'Overview',
    href: '#overview',
    disabled: false,
  },
  {
    called: 'Assistant',
    href: '#assistant',
    disabled: false,
  },
  {
    called: 'Information',
    href: '',
    disabled: true,
  },
  {
    called: 'Data',
    href: '#data',
    disabled: false,
  },
  {
    called: 'Control history',
    href: '#control-history',
    disabled: false,
  },
  {
    called: 'Notification',
    href: '#notification',
    disabled: false,
  },
  {
    called: 'Actions',
    href: '',
    disabled: true,
  },
  {
    called: 'Manual control',
    href: '#manual-control',
    disabled: false,
  },
];

const HarvestImpor = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [harvestData, setHarvestData] = useState(null);
  const [data, setData] = useState([]);
  const [control, setControl] = useState([]);
  const refreshCode = useSelector((state) => state.harvest.refreshCode);
  const dispatch = useDispatch();
  const socket = useSocket();

  const __update_harvest = useCallback(() => {
    setIsLoading(true);
    getHarvest(id)
      .then((data) => {
        setIsLoading(false);
        setHarvestData(data);
        setData(data.data);
        setControl(data.control);
      })
      .catch((err) => {
        setHarvestData(null);
        console.log(err);
      });
  }, [id]);

  useEffect(() => {
    __update_harvest();
  }, [__update_harvest]);

  useEffect(() => {
    if (refreshCode !== -1) {
      __update_harvest();
      dispatch(updateRefreshCode(-1));
    }
  }, [dispatch, refreshCode, __update_harvest]);

  useEffect(() => {
    if (socket === null) return;

    socket.on('new-data', (_data) => {
      const tmp = [_data, ...data];
      setData(tmp);
    });

    socket.on('new-control', (_data) => {
      const tmp = [_data, ...control];
      setControl(tmp);
    });

    return () => {
      socket.off('new-data');
      socket.off('new-control');
    };
  }, [socket, data, control]);

  return (
    <>
      {isLoading && <p>Loading data...</p>}
      {!isLoading && (
        <Tab.Container defaultActiveKey="#overview">
          <Row>
            <Col xs={3}>
              <ListGroups functions={functions} />
            </Col>
            <Col xs={9}>
              <Tab.Content>
                <Tab.Pane eventKey="#overview">
                  <OverviewHarvest harvest={harvestData} />
                </Tab.Pane>
                <Tab.Pane eventKey="#data">
                  <DataHarvest data={data} />
                </Tab.Pane>
                <Tab.Pane eventKey="#control-history">
                  <ControlHistory history={control} />
                </Tab.Pane>
                <Tab.Pane eventKey="#assistant">
                  <HarvestAssistant />
                </Tab.Pane>
                <Tab.Pane eventKey="#manual-control">
                  <ManualControl
                    harvestId={id}
                    latest={
                      control.length > 0
                        ? control[0]
                        : {
                            water: 0,
                            fan: 0,
                            brightness: 0,
                          }
                    }
                  />
                </Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      )}
    </>
  );
};

export default HarvestImpor;
