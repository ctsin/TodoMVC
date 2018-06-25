/**
 * @typedef {!{id: number, completed: boolean, title: string}}
 */
export let Item;

/**
 * @typedef {!Array<Item>}
 */
export let ItemList;

/**
 * @enum {Object}
 */
const Empty = {
  Record: {}
};

/**
 * @typedef {Empty}
 */
export let EmptyItemQuery;

/**
 * @type {EmptyItemQuery}
 */
export const emptyItemQuery = Empty.Record;

/**
 * @typedef {!({id: number}|{completed: boolean}|{EmptyItemQuery})}
 */
export let ItemQuery;

/**
 * @typedef {!({id: number, title: string}|{id: number, completed: boolean})}
 */
export let ItemUpdate;
