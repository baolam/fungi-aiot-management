import React, { useCallback, useEffect, useState } from 'react';
import { Col, Row, Tab } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getScript } from '../apis/script.api';
import ListGroups from '../components/ListGroups';
import OverallScript from '../functions/script/OverallScript';
import RuleScript from '../functions/script/RuleScript';
import { updateRefreshCode } from '../store/script.store';

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
    called: 'Actions',
    href: '',
    disabled: true,
  },
  {
    called: 'Add',
    href: '#',
    disabled: true,
  },
  {
    called: 'Update',
    href: '#',
    disabled: true,
  },
  {
    called: 'Rule',
    href: '',
    disabled: true,
  },
  {
    called: 'Overall',
    href: '#overall-rules',
    disabled: false,
  },
  {
    called: 'Actions',
    href: '',
    disabled: true,
  },
  {
    called: 'Add',
    href: '#add',
    disabled: true,
  },
];

const Script = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [scriptData, setScriptData] = useState(null);

  const fungiId = useSelector((state) => state.fungi.chosenFungiId);
  const scriptId = useSelector((state) => state.script.chosenScriptId);
  const refreshCode = useSelector((state) => state.script.refreshCode);
  const dispatch = useDispatch();

  const __update_script = useCallback(() => {
    if (fungiId === null) return;

    setIsLoading(true);
    getScript(fungiId)
      .then((data) => {
        setScriptData(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setScriptData({});
      });
  }, [fungiId]);

  useEffect(() => {
    __update_script();
  }, [__update_script]);

  useEffect(() => {
    if (refreshCode !== -1) {
      __update_script();
      dispatch(updateRefreshCode(-1));
    }
  }, [dispatch, refreshCode, __update_script]);

  const rules = [];
  if (scriptData !== null && scriptId !== null) {
    for (let i = 0; i < scriptData.length; i++) {
      if (scriptId === scriptData[i].id) {
        for (let j = 0; j < scriptData[i].rules.length; j++) {
          rules.push(scriptData[i].rules[j]);
        }
        break;
      }
    }
  }

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
              <h5 className="text-center emphasize">
                You're doing tasks on your chosen fungi with id: {fungiId}
              </h5>
              <Tab.Content>
                <Tab.Pane eventKey="#overall">
                  <OverallScript script={scriptData} fungiId={fungiId} />
                </Tab.Pane>
                <Tab.Pane eventKey="#overall-rules">
                  <h5 className="text-center emphasize">
                    You're doing tasks on your chosen script with id: {scriptId}
                  </h5>
                  <RuleScript rules={rules} />
                </Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      )}
    </div>
  );
};

export default Script;
