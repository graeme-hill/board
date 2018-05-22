import React from "react";
import ReactDOM from "react-dom";
import Board from "./board";
import gifshot from "gifshot";

class Screenshot extends React.Component {
  constructor() {
    super();
    this.captured = [];
  }

  render() {
    return (
      <svg width="1000" height="1000">
        <Board frame={this.props.frame} />
      </svg>
    );
  }

  componentDidMount() {
    this.capture();
  }

  componentDidUpdate() {
    this.capture();
  }

  capture() {
    const el = ReactDOM.findDOMNode(this);

    const canvas = document.createElement("canvas");
    canvas.width = 500;
    canvas.height = 500;
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.onload = () => {
      ctx.drawImage(img, 0, 0, 500, 500);
      const result = canvas.toDataURL("image/png");
      this.captured.push(result);
      if (this.captured.length === 100) {
        this.makeGif();
      }
    };
    img.src = "data:image/svg+xml;base64," + btoa(el.innerHTML);
  }

  makeGif() {
    console.log("MAKING GIF");
    gifshot.createGIF(
      {
        gifWidth: 500,
        gifHeight: 500,
        images: this.captured,
        interval: 0.1,
        numFrames: 10,
        frameDuration: 1,
        fontWeight: "normal",
        fontSize: "16px",
        fontFamily: "sans-serif",
        fontColor: "#ffffff",
        textAlign: "center",
        textBaseline: "bottom",
        sampleInterval: 10,
        numWorkers: 2
      },
      function(obj) {
        console.log("DONE");
        debugger;
        if (!obj.error) {
          var image = obj.image,
            animatedImage = document.createElement("img");
          animatedImage.src = image;
          document.body.appendChild(animatedImage);
        }
      }
    );
  }
}

export default Screenshot;
