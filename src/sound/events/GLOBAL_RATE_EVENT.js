/**
 * @author       Richard Davey <rich@phaser.io>
 * @copyright    2013-2025 Phaser Studio Inc.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */

/**
 * The Sound Manager Global Rate Event.
 *
 * This event is dispatched by the Base Sound Manager, or more typically, an instance of the Web Audio Sound Manager,
 * or the HTML5 Audio Manager. It is dispatched when the `rate` property of the Sound Manager is changed, which globally
 * adjusts the playback rate of all active sounds.
 *
 * Listen to it from a Scene using: `this.sound.on('rate', listener)`.
 *
 * @event Phaser.Sound.Events#GLOBAL_RATE
 * @type {string}
 * @since 3.0.0
 *
 * @param {Phaser.Sound.BaseSoundManager} soundManager - A reference to the sound manager that emitted the event.
 * @param {number} rate - The updated rate value.
 */
module.exports = 'rate';
