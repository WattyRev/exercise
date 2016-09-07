import Ember from 'ember';
import Tasks from '../util/tasks';
import TaskModel from '../models/task';

export default Ember.Service.extend({
    /**
     * The raw task items.
     *
     * @property _rawTasks
     * @type {Object[]}
     * @private
     */
    _rawTasks: Tasks,

    /**
     * The saved configurations.
     *
     * @property _savedConfigurations
     * @type {Object[]}
     */
    _savedConfigurations: Ember.computed(function () {
        return localStorage.configs ? Ember.makeArray(JSON.parse(localStorage.configs)) : Ember.makeArray();
    }),

    /**
     * The list of task items.
     *
     * @property _tasks
     * @type {Models.Task[]}
     * @private
     */
    _tasks: Ember.computed('_rawTasks.@each', function () {
        return this.get('_rawTasks').map(task => {
            let config = this.get('_savedConfigurations').findBy('taskid', task.id);
            let newTask = TaskModel.create(task);
            if (config) {
                newTask.setProperties(config);
            }
            return newTask;
        });
    }),

    /**
     * Get the list of tasks for today.
     *
     * @method getTodaysList
     * @return {Object[]}
     */
    getTodaysList() {
        let today = new Date().getDay();
        let list = Ember.makeArray();
        this.get('_tasks').filter(task => {
            return task.get('days').indexOf(today) > -1;
        }).forEach(task => {
            if (task.get('order').length === 1) {
                list.push(Ember.Object.create({
                    stepNumber: task.get('order')[0],
                    task: task
                }));
            } else {
                task.get('order').forEach(stepNumber => {
                    list.push(Ember.Object.create({
                        stepNumber,
                        task: task
                    }));
                });
            }
        });
        return list.sortBy('stepNumber');
    }
});
