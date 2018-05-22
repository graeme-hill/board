import { formatFrame } from "../utils/game-state";

const frames = (state = {}, action) => {
  switch (action.type) {
    case "RECEIVE_FRAME":
      return {
        ...state,
        frame: formatFrame(action.game.Game, action.frame)
      };
    case "REQUEST_FRAMES":
      return { ...state };
    case "FETCH_FRAMES":
      return { ...state };
    default:
      return { ...state };
  }
};

export default frames;
