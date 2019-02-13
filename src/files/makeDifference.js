import { getStrFromFile, makeResult, makeTree } from '..';


export default (fileBefore, fileAfter) => {
  const strBefore = getStrFromFile(fileBefore);
  const strAfter = getStrFromFile(fileAfter);
  const objBefore = JSON.parse(strBefore);
  const objAfter = JSON.parse(strAfter);
  const arr = makeTree(objBefore, objAfter);
  return makeResult(arr);
};
