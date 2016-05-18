import React, { PropTypes } from 'react';
import { Alert, Panel } from 'react-bootstrap';


const AlertPropType = PropTypes.shape({
  message: PropTypes.string.isRequired,
  type: PropTypes.string,
});


function AlertsSection({ name, type, alerts }) {
  return (
    <Panel collapsible defaultExpanded header={`${name} (${alerts.length})`} bsStyle={type}>
      {alerts.map(alert =>
        <Alert bsStyle={type}>
          {alert.type && <strong>{alert.type}</strong>}
          <span>{alert.message}</span>
        </Alert>
      )}
    </Panel>
  );
}

AlertsSection.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  alerts: PropTypes.arrayOf(AlertPropType).isRequired,
};


function Alerts({ errors, warnings, success }) {
  return (
    <div className="Alerts">
      <AlertsSection name="Errors" type="danger" alerts={errors} />
      <AlertsSection name="Warnings" type="warning" alerts={warnings} />
      <AlertsSection name="Success" type="success" alerts={success} />
    </div>
  );
}

Alerts.propTypes = {
  errors: PropTypes.arrayOf(AlertPropType).isRequired,
  warnings: PropTypes.arrayOf(AlertPropType).isRequired,
  success: PropTypes.arrayOf(AlertPropType).isRequired,
};


export default Alerts;
