import Ember from 'ember';

export default Ember.Component.extend({
    /**
     * The tasks service.
     *
     * @property _tasksService
     * @type {Services.Tasks}
     * @private
     */
    _tasksService: Ember.inject.service('tasks'),

    /**
     * The steps to complete.
     *
     * @property steps
     * @type {Object[]}
     */
    steps: Ember.computed(function () {
        return this.get('_tasksService').getTodaysList();
    }),

    /**
     * The step currently being worked on.
     *
     * @property currentStep
     * @type {Number}
     */
    currentStep: Ember.computed('steps.@each.isComplete', function () {
        let completeSteps = this.get('steps').filterBy('isComplete');
        if (completeSteps.length) {
            return completeSteps.get('lastObject.stepNumber') + 1;
        }
        return 0;
    }),

    actions: {
        /**
         * Activate the step.
         *
         * @method activateStep
         * @param {Object} step
         * @return {Void}
         */
        activateStep(step) {
            if (step.stepNumber !== this.get('currentStep')) {
                return;
            }
            if (step.task.get('timer') && !step.get('showTimer')) {
                step.set('showTimer', true);
            } else if (step.task.get('timer')) {
                step.setProperties({
                    showTimer: false,
                    isComplete: true
                });
            } else {
                step.set('isComplete', true);
            }
        },

        /**
         * Handle when a timer has ended.
         *
         * @method timerEnded
         * @param {Object} step
         * @return {Void}
         */
        timerEnded(step) {
            step.setProperties({
                showTimer: false,
                isComplete: true
            });
        },

        /**
         * Edit a step.
         *
         * @method editStep
         * @param {Object} step
         * @return {Void}
         */
        editStep(step) {
            step.set('isEditing', true);
        }
    }
});
