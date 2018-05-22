import React from "react";
import BlankState from "./blank-state";
import GameFrame from "./game-frame";
import Screenshot from "./screenshot";

class Game extends React.Component {
  componentWillMount() {
    if (this.props.options.game && this.props.options.engine) {
      this.props.fetchFrames(
        this.props.options.game,
        this.props.options.engine
      );
    } else {
      this.invalidArgs = true;
    }
  }

  render() {
    if (this.invalidArgs) {
      return <BlankState />;
    } else if (this.props.frame) {
      return (
        <div>
          <GameFrame frame={this.props.frame} />
          <Screenshot frame={this.props.frame} />
        </div>
      );
    } else {
      return <div>loading...</div>;
    }
  }
}

export default Game;
