import Ember from 'ember';

export default Ember.Component.extend({
    /**
     * The duration of the timer (ms).
     *
     * @property duration
     * @type {Number}
     */
    duration: null,

    /**
     * An internally edited duration.
     *
     * @property _duration
     * @type {Number}
     * @private
     */
    _duration: Ember.computed.oneWay('duration'),

    /**
     * The step the timer belongs to.
     *
     * @property step
     * @type {Ember.Object}
     */
    step: null,

    /**
     * The amount of time left in the timer (seconds).
     *
     * @property timeLeft
     * @type {Number}
     */
    timeLeft: null,

    /**
     * The readable time left remaining.
     *
     * @property readableTimeLeft
     * @type {String}
     */
    readableTimeLeft: Ember.computed('timeLeft', function () {
        let timeLeft = this.get('timeLeft');
        let minutes = Math.floor(timeLeft / 60);
        let seconds = timeLeft - (minutes * 60);
        seconds = seconds > 9 ? seconds : '0' + seconds;
        return `${minutes}:${seconds}`;
    }),

    /**
     * Evaluate the amount of time left in the timer.
     *
     * @method evaluateTimeLeft
     * @return {Void}
     */
    evaluateTimeLeft: Ember.on('didInsertElement', function () {

        // Set time left based on duration
        this.set('timeLeft', Math.floor(this.get('_duration') / 1000));

        // If we are out of time, send the action with the step
        if (!this.get('timeLeft')) {
            this.sendAction('onComplete', this.get('step'));
            return;
        }

        // Update again in one second
        Ember.run.later(() => {
            if (this.get('isDestroyed')) {
                return;
            }
            this.set('_duration', this.get('_duration') - 1000);
            this.evaluateTimeLeft();
        }, 1000);
    })
});
