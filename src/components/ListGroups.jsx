import React from 'react';
import { ListGroup } from 'react-bootstrap';

const ListGroups = ({ functions }) => {
  const n = functions.length;

  return (
    <ListGroup>
      {(() => {
        const temp = [];
        for (let i = 0; i < n; i++) {
          if (functions[i].href !== '') {
            temp.push(
              <ListGroup.Item
                action
                href={functions[i].href}
                disabled={functions[i].disabled}
                key={i}
              >
                {functions[i].called}
              </ListGroup.Item>
            );
          } else {
            temp.push(
              <ListGroup.Item action disabled={functions[i].disabled} key={i}>
                <h5 className="text-center">{functions[i].called}</h5>
              </ListGroup.Item>
            );
          }
        }
        return temp;
      })()}
    </ListGroup>
  );
};

export default ListGroups;
