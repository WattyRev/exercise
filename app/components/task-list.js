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

        timerEnded(step) {
            step.setProperties({
                showTimer: false,
                isComplete: true
            });
        }
    }
});
