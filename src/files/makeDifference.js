#!/usr/bin/env node
import { makeArr, makeStr } from '..';

export default (before, after) => {
  const arr = makeArr(before, after);
  const str = makeStr(arr);
  return str;
};
