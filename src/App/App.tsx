import React from 'react';
import './App.css';
import State from './App.types';
import LakeComponent from '../components/Lake';
import GameEngine from '../models/GameEngine';
import Field from '../models/Field';

// eslint-disable-next-line @typescript-eslint/ban-types
class App extends React.Component<object, State> {
  private gameEngine: GameEngine;

  // eslint-disable-next-line
  constructor(props: any) {
    super(props);

    this.state = { lake: null };
    this.gameEngine = new GameEngine(this.updateLake);
  }

  componentDidMount(): void {
    this.gameEngine.startGame(10, 8);
  }

  handleFieldClick = (x: number, y: number):void => {
    this.gameEngine.handleFieldClick(x, y);
  }

  updateLake = (lake: Field[][]): void => {
    this.setState({ lake });
  }

  handleUnselect = (): void => {
    this.gameEngine.unselect();
  }

  render(): JSX.Element | string {
    const { lake } = this.state;

    return lake ? (
      <>
        <LakeComponent
          fields={lake}
          onFieldClick={this.handleFieldClick}
          selectedFrog={this.gameEngine.getSelected()}
          availableMoves={this.gameEngine.getAvailableMoves()}
        />
        <div className="legend">
          <h3>Legend</h3>
          <ul>
            <li>
              <span className="frog male" />
              <strong>Frog male</strong>
            </li>
            <li>
              <span className="frog female" />
              <strong>Frog female</strong>
            </li>
          </ul>
          Frogs counter: {this.gameEngine.getFrogsCount()} / {this.gameEngine.getLakeSize()} 🐸
        </div>
      </>
    ) : 'Start The Game';
  }
}

export default App;
