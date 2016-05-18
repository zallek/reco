import React, { Component } from 'react';
import BotifySDK from 'botify-sdk';
import Alerts from './components/Alerts';
import * as alerts from './alerts';
import * as config from './config';


function aggregate(urlsAggsQueries) {
  BotifySDK.AnalysisController.getUrlsAggs({
    username: config.username,
    project: config.project,
    analysis: config.analysis,
    urlsAggsQueries,
  });
}

function compareAggregate(urlsAggsQueries) {
  BotifySDK.ProjectController.getProjectUrlsAggs({
    username: config.username,
    project: config.project,
    last_analysis_slug: config.analysis,
    nb_analyses: 2,
    urlsAggsQueries,
  });
}


export class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      success: [],
      warnings: [],
      errors: [],
    };
  }

  componentDidMount() {
    console.log('boo', alerts);
    ['success', 'warnings', 'errors'].forEach(alertCat => {
      alerts[alertCat].compute(aggregate, compareAggregate).then(res => {
        if (res.active) {
          this.setState({
            [alertCat]: this.state[alertCat].concat({
              type: alert.type,
              message: alert.message(res),
            }),
          });
        }
      });
    });
  }

  render() {
    return (
      <div className="App">
        <Alerts
          success={this.state.success}
          warnings={this.state.warnings}
          errors={this.state.errors}
        />
      </div>
    );
  }
}

export default App;
