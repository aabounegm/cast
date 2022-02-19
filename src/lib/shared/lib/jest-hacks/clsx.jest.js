// This is required because `svelte-jester` doesn't play well with ES modules.
//   Track the issue here: https://github.com/mihar-22/svelte-jester/issues/16

/* eslint-disable */
// @ts-ignore
const clsx = require('clsx/dist/clsx.js');
module.exports.default = clsx;
