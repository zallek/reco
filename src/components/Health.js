import React, { PropTypes } from 'react';
import { Alert, Panel } from 'react-bootstrap';
import _ from 'lodash';
import numeral from 'numeral';


const AlertPropType = PropTypes.shape({
  status: PropTypes.number.isRequired,
  type: PropTypes.string,
  message: PropTypes.string.isRequired,
  weight: PropTypes.number.isRequired,
});


function HealthSection({ name, type, defaultExpanded, alerts }) {
  return (
    <Panel
      header={`${name} (${alerts.length})`}
      bsStyle={type}
      collapsible
      defaultExpanded={defaultExpanded}
    >
      {alerts.map((alert, i) =>
        <Alert key={i} bsStyle={type}>
          <span>{numeral(alert.weight * 100).format('0,0')} - </span>
          {alert.type && <strong>{alert.type} - </strong>}
          <span>{alert.message}</span>
        </Alert>
      )}
    </Panel>
  );
}

HealthSection.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  defaultExpanded: PropTypes.bool,
  alerts: PropTypes.arrayOf(AlertPropType).isRequired,
};


function Health({ evolutions }) {
  const { regressions, improvements, infos } = _
    .chain(evolutions)
    .sortBy('weight')
    .groupBy(evolution => {
      return evolution.status === 1 ? 'improvements'
           : evolution.status === -1 ? 'regressions'
           : 'infos';
    })
    .value();

  return (
    <div className="Health">
      <HealthSection name="Regression" type="danger" defaultExpanded alerts={regressions || []} />
      <HealthSection name="Improvements" type="success" defaultExpanded alerts={improvements || []} />
      <HealthSection name="Info" type="info" alerts={infos || []} />
    </div>
  );
}

Health.propTypes = {
  evolutions: PropTypes.arrayOf(AlertPropType).isRequired,
};


export default Health;
