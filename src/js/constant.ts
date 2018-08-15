/**
 * 按键映射
 */
export const ENTER_KEY = 13;
export const ESCAPE_KEY = 27;

/**
 * 动词开头，表示用于数据模型，持久化数据。
 * 名词开头，表示用于用户视图，渲染页面。
 */
export enum RENDER {
  ADD_TODO,
  TODO_ADDED,
  COMPLETE_TODO,
  TODO_COMPLETED,
  DELETE_TODO,
  TODO_DELETED
}
