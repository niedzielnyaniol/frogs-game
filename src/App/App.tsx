import React from 'react';
import './App.css';
import State from './App.types';
import LakeComponent from '../components/Lake';
import GameEngine from '../models/GameEngine';
import Field from '../models/Field';

class App extends React.Component<object, State> {
  private gameEngine: GameEngine;

  // eslint-disable-next-line
  constructor(props: any) {
    super(props);

    this.state = { lake: null };
    this.gameEngine = new GameEngine(this.updateLake);
  }

  componentDidMount(): void {
    this.gameEngine.startGame(30, 10);
  }

  handleFieldSelect = (x: number, y: number):void => {
    this.gameEngine.selectField(x, y);
  }

  updateLake = (lake: Field[][]): void => {
    this.setState({ lake });
  }

  handleJump = (): void => {
    const selected = this.gameEngine.getSelected();
    const nextMove = this.gameEngine.getNextMove();

    if (selected && nextMove) {
      this.gameEngine.moveFrog(selected, nextMove);
    }
  }

  handleReproduce = (): void => {
    const selected = this.gameEngine.getSelected();
    const nextMove = this.gameEngine.getNextMove();

    if (selected && nextMove) {
      this.gameEngine.reproduce(selected, nextMove);
    }
  }

  handleUnselect = (): void => {
    this.gameEngine.unselect();
  }

  render(): JSX.Element | string {
    const { lake } = this.state;

    return lake ? (
      <>
        <LakeComponent fields={lake} onFieldSelect={this.handleFieldSelect} />
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
          {
            this.gameEngine.isNextMove && (
              <>
                <h3>Actions</h3>
                {
                  this.gameEngine.getCanReproduce() ? (
                    <button type="button" id="reproduce" onClick={this.handleReproduce}>Reproduce</button>
                  ) : (
                    <button type="button" id="jump" onClick={this.handleJump}>Jump</button>
                  )
                }
              </>
            )
          }
          {
            this.gameEngine.isSelected && (
            <button type="button" id="reproduce" onClick={this.handleUnselect}>Unselect</button>
            )
          }
        </div>
      </>
    ) : 'Start The Game';
  }
}

export default App;
