import Automerge from 'automerge';
import { nanoid } from 'nanoid';

//TODO figure out how to hook this up to a test so we don't mangle our 'real' data
export const upgradeDataFormat = (data) => {
  console.dir(data);
  if(data.version === 1) {
    //In version 1, has all 3 tables, `boards` is not set up properly
    data = Automerge.change(data, (d) => {
      d.version += 1;

      let boardId = nanoid();

      d.boards.byId[boardId] = {};
      d.boards.byId[boardId].id = boardId;
      d.boards.byId[boardId].title = "First Board";
      d.boards.byId[boardId].lists = [];
      data.lists.allIds.forEach((lists, i) => {
        d.boards.byId[boardId].lists.push(lists);
      });

      d.boards.allIds.push(boardId);
    });
  }
  if(data.version === 2) {
    data = Automerge.change(data, (d) => {
      d.version += 1;

      data.cards.allIds.forEach((cardId, i) => {
        d.cards.byId[cardId].title = data.cards.byId[cardId].cardTitle;
        delete d.cards.byId[cardId].cardTitle;
      });
      data.lists.allIds.forEach((list, i) => {
        d.lists.byId[list].title = data.lists.byId[list].listTitle;
        delete d.lists.byId[list].listTitle;
      });
    });
  }
  if(data.version === 3) { // s m h
    data = Automerge.change(data, (d) => {
      d.boards.byId["oN8Qv57UZE60PJUPmuPO4"].lists.deleteAt(3);
      d.version += 3;
    });
  }
  return data;
}
