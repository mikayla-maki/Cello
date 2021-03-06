import { useSelector } from "react-redux";
import { SimpleTextProperty } from "../utils/SimpleTextProperty";
import { changeTitle } from "./boardSlice";

export function BoardTitle(props) {
  let state = useSelector((state) => state);
  let tutorialEl = null;

  if(state.boards.allIds.length === 1 && state.cards.allIds.length === 0 && state.lists.allIds.length === 0 && state.boards.byId[state.boards.allIds[0]].title === "New Board") {
    tutorialEl = (
      <span style={{color: "gray", fontSize: "1.25em"}}>&nbsp;← Click any text to edit it</span>
    )
  }
  if(props.boardId) {
    let board = state.boards.byId[props.boardId];
    return (
      <>
      <SimpleTextProperty prop={board.title} action={changeTitle} id={board.id} />
      {tutorialEl}
      </>
    );
  } else {
    return null;
  }
}
