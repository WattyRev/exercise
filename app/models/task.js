import Ember from 'ember';

export default Ember.Object.extend({
    /**
     * The title of the task.
     *
     * @property title
     * @type {String}
     */
    title: null,

    /**
     * The days in which the task should be completed.
     * 0 = Sunday, 1 = Monday, etc...
     *
     * @property days
     * @type {Number[]}
     */
    days: Ember.A(),

    /**
     * The order in which the task should be completed.
     * Task will appear once for each ordering number.
     *
     * @property order
     * @type {Number[]}
     */
    order: Ember.A(),

    /**
     * The amount of time to provide for completing the task (ms).
     *
     * @property timer
     * @type {Number}
     */
    timer: null,

    /**
     * The timer in readable text.
     *
     * @property readableTimer
     * @type {String}
     */
    readableTime: Ember.computed('timer', function () {
        return this.get('timer') ? `${this.get('timer') / 1000 / 60} minutes` : null;
    }),

    /**
     * The number of repetitions that the user should make to complete the exercise.
     *
     * @property reps
     * @type {Number}
     */
    reps: null,

    /**
     * The amount of weight to apply to the exercise (lbs).
     * This value may get overwritten by one saved in local storage.
     *
     * @property weight
     * @type {Number}
     */
    weight: null,

    /**
     * Does the task have a weight?
     *
     * @property hasWeight
     * @type {Boolean}
     */
    hasWeight: Ember.computed('weight', function () {
        return typeof this.get('weight') === 'number';
    })
});
