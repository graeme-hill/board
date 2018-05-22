import React from "react";
import Avatar from "./avatar";
import Board from "./board";

class GameFrame extends React.Component {
  render() {
    return (
      <div>
        <div>
          {this.props.frame.snakes.map((snake, i) => (
            <Avatar snake={snake} key={"avatar" + i} />
          ))}
        </div>

        <Board frame={this.props.frame} />
      </div>
    );
  }
}

export default GameFrame;
