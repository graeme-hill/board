// import client from "./engine-client";
// client.streamAll = function() {};
import * as client from "./engine-client";
import streamAll from "./websocket";
// jest.mock("./websocket");

jest.mock("./websocket", () => {
  const frame0 = {
    Turn: 0,
    Food: [{ X: 1, Y: 2 }],
    Snakes: [
      {
        ID: "abc",
        Name: "abc",
        URL: "http://localhost:5000",
        Body: [{ X: 3, Y: 3 }, { X: 3, Y: 4 }, { X: 3, Y: 5 }]
      }
    ]
  };

  const gameResponse = {
    Game: {
      ID: "123",
      Status: "stopped",
      Width: 20,
      Height: 20,
      SnakeTimeout: 1000,
      TurnTimeout: 200
    },
    LastFrame: frame0
  };

  const framesResponse = [frame0];

  const resources = {
    "http://localhost/games/123": gameResponse,
    "ws://localhost/socket/123": framesResponse
  };

  return {
    streamAll: jest.fn(mockStreamAll(resources))
  };
});

function sum(a, b) {
  return a + b;
}

// Runs the given action in a future event loop iteration to make it act async
function next(action) {
  return new Promise((resolve, reject) => setTimeout(0, resolve));
}

function mockFetch(resources) {
  return url =>
    Promise.resolve({
      json: () => resources[url]
    });
}

function mockStreamAll(resources) {
  return (url, receive) => {
    let chain = Promise.resolve();
    let things = resources[url];
    if (things && things.length) {
      for (const thing of things) {
        chain = chain.then(() => next(() => receive(thing)));
      }
    }
    return chain;
  };
}

function setupFetchMock() {
  const frame0 = {
    Turn: 0,
    Food: [{ X: 1, Y: 2 }],
    Snakes: [
      {
        ID: "abc",
        Name: "abc",
        URL: "http://localhost:5000",
        Body: [{ X: 3, Y: 3 }, { X: 3, Y: 4 }, { X: 3, Y: 5 }]
      }
    ]
  };

  const gameResponse = {
    Game: {
      ID: "123",
      Status: "stopped",
      Width: 20,
      Height: 20,
      SnakeTimeout: 1000,
      TurnTimeout: 200
    },
    LastFrame: frame0
  };

  const framesResponse = [frame0];

  const resources = {
    "http://localhost/games/123": gameResponse,
    "ws://localhost/socket/123": framesResponse
  };

  window.fetch = mockFetch(resources);
}

it("sums numbers", () => {
  expect(sum(1, 2)).toEqual(3);
  expect(sum(2, 2)).toEqual(4);
});

it("gets frames", () => {
  setupFetchMock();

  let received = 0;
  client.streamAllFrames("http://localhost", "123", (game, frame) => {
    received++;
    expect(game.ID).toEqual("1234");
  });

  expect(received).toEqual(1);
});
