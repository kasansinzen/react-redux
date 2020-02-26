export const classRoomList = () => {
  let phatom = [];
  let matthayom = [];
  let level = 1;
  for (let i = 1; i <= 6; i++) {
    if (i == 4) level = 1;
    phatom.push({ 'name': `ป. ${i}`, 'value': `${i <= 3 ? 1 : 2}${level}` });
    matthayom.push({ 'name': `ม. ${i}`, 'value': `${i <= 3 ? 3 : 4}${level}` });
    level++;
  }
  let res = [...phatom, ...matthayom];

  return res;
}
export const prefixNameList = () => {
  let prefixnames = ['ด.ช.', 'ด.ญ.', 'นาย', 'นางสาว', 'นาง'];
  let res = [];
  prefixnames.forEach(val => res.push({ prefix_th: val }));

  return res;
}
export const roomList = () => {
  let room = [];
  for (let i = 1; i <= 20; i++) {
    room.push({ 'name': i, 'value': i });
  }
  let res = room;

  return res;
}