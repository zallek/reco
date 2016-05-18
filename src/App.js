import React, { Component } from 'react';
import BotifySDK from 'botify-sdk';
import Health from './components/Health';
import evolutions from './health/evolutions';
import * as config from './config';


BotifySDK.authToken(config.accessToken);
function aggregate(analysis, urlsAggsQueries) {
  return new Promise((resolve, reject) => {
    BotifySDK.AnalysisController.getUrlsAggs({
      username: config.username,
      projectSlug: config.project,
      analysisSlug: analysis,
      urlsAggsQueries,
    }, (err, response) => {
      if (err) {
        reject(err);
      } else {
        resolve(response);
      }
    });
  });
}


export class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      fromAnalysis: '20160515',
      toAnalysis: '20160516',
      evolutions: [],
    };
  }

  componentDidMount() {
    evolutions.forEach(evolution => {
      evolution.fetch(aggregate, this.state.fromAnalysis, this.state.toAnalysis).then(res => {
        this.setState({
          evolutions: this.state.evolutions.concat(res),
        });
      });
    });
  }

  render() {
    return (
      <div className="App">
        <Health
          evolutions={this.state.evolutions}
        />
      </div>
    );
  }
}

export default App;
