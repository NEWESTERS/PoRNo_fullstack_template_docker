import * as React from 'react';
import './App.css';

import logo from './logo.svg';

interface IState {
  now: string;
}

class App extends React.Component<{}, IState> {
  public state = {
    now: ""
  } as IState

  componentDidMount() {
    fetch(`${process.env.REACT_APP_API}/now`)
      .then(res => {
        res.json()
          .then(data => {
            this.setState({
              now: data[0].now
            })
          })
      })
  }

  public render() {
    const { now } = this.state;

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
          <h4>Now is { now }</h4>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.tsx</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
