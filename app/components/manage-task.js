import Ember from 'ember';

export default Ember.Component.extend({
    /**
     * The step being edited.
     *
     * @property step
     * @type {Object}
     */
    step: null,

    /**
     * The timer being set (ms).
     *
     * @property timer
     * @type {Number}
     */
    timer: Ember.computed.oneWay('step.task.timer'),

    /**
     * The displayed timer being set (minutes).
     *
     * @property displaytimer
     * @type {Number}
     */
    displayTimer: Ember.computed('timer', {
        get() {
            return this.get('timer') / 1000 / 60;
        },
        set(key, value) {
            value = parseInt(value);
            this.set('timer', value * 1000 * 60);
            return value;
        }
    }),

    /**
     * The weight being edited.
     *
     * @property weight
     * @type {Nunber|String}
     */
    weight: Ember.computed.oneWay('step.task.weight'),

    setup: Ember.on('didInsertElement', function () {
        Ember.$('body:not(.modal-open)').addClass('modal-open');
    }),

    teardown: Ember.on('willDestroyElement', function () {
        Ember.$('body.modal-open').removeClass('modal-open');
    }),

    actions: {
        /**
         * Close the modal.
         *
         * @method actions.close
         * @return {Void}
         */
        close() {
            this.set('step.isEditing', false);
        },

        /**
         * Save changes to local storage then close.
         *
         * @method save
         * @return {Void}
         */
        save() {
            // Get configs from local storage
            let configs = localStorage.configs ? Ember.makeArray(JSON.parse(localStorage.configs)) : Ember.makeArray();

            // Set up the specific configuration
            let config = configs.findBy('taskid', this.get('step.task.id')) || {taskid: this.get('step.task.id')};
            if (this.get('step.task.timer') && this.get('timer')) {
                this.set('step.task.timer', this.get('timer'));
                config.timer = this.get('timer');
            }
            if (this.get('step.task.hasWeight')) {
                let weight = parseInt(this.get('weight'));
                this.set('step.task.weight', weight);
                config.weight = weight;
            }

            // Add the config back into the group of configs if it wasn't already there
            if (!configs.findBy('taskid', this.get('step.task.id'))) {
                configs.push(config);
            }

            // Save
            localStorage.configs = JSON.stringify(configs);

            // Close panel
            this.set('step.isEditing', false);
        }
    }
});
