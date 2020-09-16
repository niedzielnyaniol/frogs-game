import React from 'react';
import './App.css';
import LakeComponent from './components/Lake';
import GameEngine from './models/GameEngine';

class App extends React.Component {
  constructor(props) {
    super(props);


    this.state = { lake: null };
    this.gameEngine = new GameEngine(this.updateLake);
  }

  componentDidMount() {
    this.gameEngine.startGame();
  }

  handleFieldSelect = (x, y) => {
    this.gameEngine.selectField(x, y);
  }

  updateLake = (lake) => {
    this.setState({ lake })
  }

  handleJump = () => {
    this.gameEngine.moveFrog();
  }

  handleReproduce = () => {
    this.gameEngine.reproduce();
  }

  handleUnselect = () => {
    this.gameEngine.unselect();
  }

  render() {
    const { lake } = this.state;

    return lake ? (
      <>
        <LakeComponent lake={lake} onFieldSelect={this.handleFieldSelect} />
        <div className="legend">
          <h3>Legend</h3>
          <ul>
            <li>
              <span className="frog male"></span>
              <strong>Frog male</strong>
            </li>
            <li>
              <span className="frog female"></span>
              <strong>Frog female</strong>
            </li>
          </ul>
          {
            this.gameEngine.nextMove && (
              <>
                <h3>Actions</h3>
                {
                  this.gameEngine.canReproduce ? (
                    <button type="button" id="reproduce" onClick={this.handleReproduce}>Reproduce</button>
                  ): (
                    <button button type="button" id="jump" onClick={this.handleJump}>Jump</button>
                  )
                }
              </>
            )
          }
          {
            this.gameEngine.selected && (
                <button type="button" id="reproduce" onClick={this.handleUnselect}>Unselect</button>
            )
          }
        </div>
      </>
    ) : 'Start The Game'
  }
}

export default App;
