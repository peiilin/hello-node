// 想到需要用switch, if/else的時候
// 就用「查表法」來簡化程式，容易擴充，很有效率
// O(1)
export const STATUS_WORD = {
  A: "進行中",
  B: "已完成",
  C: "已暫停",
};

export const STATUS_COLOR = {
  A: "is-info",
  B: "is-success",
  C: "is-danger",
};
