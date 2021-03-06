import React from "react";
import Avatar from "./avatar";

class Scoreboard extends React.Component {
  render() {
    const aspectRatio = this.props.maxWidth / this.props.maxHeight;
    const viewBoxWidth = 100;
    const viewBoxHeight = viewBoxWidth / aspectRatio;
    const viewBox = `0 0 ${viewBoxWidth} ${viewBoxHeight}`;

    return (
      <svg
        x={this.props.x}
        y={this.props.y}
        width={this.props.maxWidth}
        height={this.props.maxHeight}
        viewBox={viewBox}
        style={{ border: "1px solid black" }}
      >
        {this.props.snakes
          ? this.props.snakes.map((snake, i) => (
              <Avatar snake={snake} key={"avatar" + i} x="0" y={i * 16} />
            ))
          : undefined}
      </svg>
    );
  }
}

export default Scoreboard;
