/**
 * @author       Richard Davey <rich@phaser.io>
 * @copyright    2013-2025 Phaser Studio Inc.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */

var PropertyValueInc = require('./PropertyValueInc');

/**
 * Takes an array of Game Objects, or any objects that have a public `rotation` property,
 * and then adds the given value to each of their `rotation` properties.
 *
 * The optional `step` property is applied incrementally, multiplied by each item in the array.
 *
 * To use this with a Group: `Rotate(group.getChildren(), value, step)`
 *
 * @function Phaser.Actions.Rotate
 * @since 3.0.0
 *
 * @generic {Phaser.GameObjects.GameObject[]} G - [items,$return]
 *
 * @param {(array|Phaser.GameObjects.GameObject[])} items - The array of items to be updated by this action.
 * @param {number} value - The amount to be added to the `rotation` property (in radians).
 * @param {number} [step=0] - This is added to the `value` amount, multiplied by the iteration counter.
 * @param {number} [index=0] - An optional offset to start searching from within the items array.
 * @param {number} [direction=1] - The direction to iterate through the array. 1 is from beginning to end, -1 from end to beginning.
 *
 * @return {(array|Phaser.GameObjects.GameObject[])} The array of objects that were passed to this Action.
 */
var Rotate = function (items, value, step, index, direction)
{
    return PropertyValueInc(items, 'rotation', value, step, index, direction);
};

module.exports = Rotate;
