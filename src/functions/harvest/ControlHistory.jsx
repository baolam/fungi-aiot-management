import React from 'react';
import { Table } from 'react-bootstrap';
import { format } from 'date-fns';

const ControlHistory = ({ history }) => {
  return (
    <>
      <h4 className="text-center">Control history</h4>
      <Table striped hover bordered>
        <thead>
          <tr>
            <th>Time</th>
            <th>Brightness (%)</th>
            <th>Fan (%)</th>
            <th>Wate (%)</th>
          </tr>
        </thead>
        <tbody>
          {history.map((data, idx) => {
            return (
              <tr key={idx}>
                <td>{format(new Date(data.createdAt), 'HH:mm:ss')}</td>
                <td>{data.brightness}</td>
                <td>{data.fan}</td>
                <td>{data.water}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
};

export default ControlHistory;
