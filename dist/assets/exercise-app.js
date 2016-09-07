"use strict";
/* jshint ignore:start */

/* jshint ignore:end */

define('exercise-app/app', ['exports', 'ember', 'ember/resolver', 'ember/load-initializers', 'exercise-app/config/environment'], function (exports, _ember, _emberResolver, _emberLoadInitializers, _exerciseAppConfigEnvironment) {

  var App = undefined;

  _ember['default'].MODEL_FACTORY_INJECTIONS = true;

  App = _ember['default'].Application.extend({
    modulePrefix: _exerciseAppConfigEnvironment['default'].modulePrefix,
    podModulePrefix: _exerciseAppConfigEnvironment['default'].podModulePrefix,
    Resolver: _emberResolver['default']
  });

  (0, _emberLoadInitializers['default'])(App, _exerciseAppConfigEnvironment['default'].modulePrefix);

  exports['default'] = App;
});
define('exercise-app/components/app-version', ['exports', 'ember-cli-app-version/components/app-version', 'exercise-app/config/environment'], function (exports, _emberCliAppVersionComponentsAppVersion, _exerciseAppConfigEnvironment) {

  var name = _exerciseAppConfigEnvironment['default'].APP.name;
  var version = _exerciseAppConfigEnvironment['default'].APP.version;

  exports['default'] = _emberCliAppVersionComponentsAppVersion['default'].extend({
    version: version,
    name: name
  });
});
define('exercise-app/components/manage-task', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({});
});
define('exercise-app/components/task-item', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({});
});
define('exercise-app/components/task-list', ['exports', 'ember'], function (exports, _ember) {
    exports['default'] = _ember['default'].Component.extend({
        /**
         * The tasks service.
         *
         * @property _tasksService
         * @type {Services.Tasks}
         * @private
         */
        _tasksService: _ember['default'].inject.service('tasks'),

        /**
         * The steps to complete.
         *
         * @property steps
         * @type {Object[]}
         */
        steps: _ember['default'].computed(function () {
            return this.get('_tasksService').getTodaysList();
        }),

        /**
         * The step currently being worked on.
         *
         * @property currentStep
         * @type {Number}
         */
        currentStep: _ember['default'].computed('steps.@each.isComplete', function () {
            var completeSteps = this.get('steps').filterBy('isComplete');
            if (completeSteps.length) {
                return completeSteps.get('lastObject.stepNumber') + 1;
            }
            return 0;
        }),

        actions: {
            activateStep: function activateStep(step) {
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

            timerEnded: function timerEnded(step) {
                step.setProperties({
                    showTimer: false,
                    isComplete: true
                });
            }
        }
    });
});
define('exercise-app/components/task-timer', ['exports', 'ember'], function (exports, _ember) {
    exports['default'] = _ember['default'].Component.extend({
        /**
         * The duration of the timer (ms).
         *
         * @property duration
         * @type {Number}
         */
        duration: null,

        _duration: _ember['default'].computed.oneWay('duration'),

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
        readableTimeLeft: _ember['default'].computed('timeLeft', function () {
            var timeLeft = this.get('timeLeft');
            var minutes = Math.floor(timeLeft / 60);
            var seconds = timeLeft - minutes * 60;
            seconds = seconds > 9 ? seconds : '0' + seconds;
            return minutes + ':' + seconds;
        }),

        /**
         * Evaluate the amount of time left in the timer.
         *
         * @method evaluateTimeLeft
         * @return {Void}
         */
        evaluateTimeLeft: _ember['default'].on('didInsertElement', function () {
            var _this = this;

            // Set time left based on duration
            this.set('timeLeft', Math.floor(this.get('_duration') / 1000));

            // If we are out of time, send the action with the step
            if (!this.get('timeLeft')) {
                this.sendAction('onComplete', this.get('step'));
                return;
            }

            // Update again in one second
            _ember['default'].run.later(function () {
                if (_this.get('isDestroyed')) {
                    return;
                }
                _this.set('_duration', _this.get('_duration') - 1000);
                _this.evaluateTimeLeft();
            }, 1000);
        })
    });
});
define('exercise-app/controllers/array', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Controller;
});
define('exercise-app/controllers/object', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Controller;
});
define('exercise-app/helpers/and', ['exports', 'ember', 'ember-truth-helpers/helpers/and'], function (exports, _ember, _emberTruthHelpersHelpersAnd) {

  var forExport = null;

  if (_ember['default'].Helper) {
    forExport = _ember['default'].Helper.helper(_emberTruthHelpersHelpersAnd.andHelper);
  } else if (_ember['default'].HTMLBars.makeBoundHelper) {
    forExport = _ember['default'].HTMLBars.makeBoundHelper(_emberTruthHelpersHelpersAnd.andHelper);
  }

  exports['default'] = forExport;
});
define('exercise-app/helpers/eq', ['exports', 'ember', 'ember-truth-helpers/helpers/equal'], function (exports, _ember, _emberTruthHelpersHelpersEqual) {

  var forExport = null;

  if (_ember['default'].Helper) {
    forExport = _ember['default'].Helper.helper(_emberTruthHelpersHelpersEqual.equalHelper);
  } else if (_ember['default'].HTMLBars.makeBoundHelper) {
    forExport = _ember['default'].HTMLBars.makeBoundHelper(_emberTruthHelpersHelpersEqual.equalHelper);
  }

  exports['default'] = forExport;
});
define('exercise-app/helpers/gt', ['exports', 'ember', 'ember-truth-helpers/helpers/gt'], function (exports, _ember, _emberTruthHelpersHelpersGt) {

  var forExport = null;

  if (_ember['default'].Helper) {
    forExport = _ember['default'].Helper.helper(_emberTruthHelpersHelpersGt.gtHelper);
  } else if (_ember['default'].HTMLBars.makeBoundHelper) {
    forExport = _ember['default'].HTMLBars.makeBoundHelper(_emberTruthHelpersHelpersGt.gtHelper);
  }

  exports['default'] = forExport;
});
define('exercise-app/helpers/gte', ['exports', 'ember', 'ember-truth-helpers/helpers/gte'], function (exports, _ember, _emberTruthHelpersHelpersGte) {

  var forExport = null;

  if (_ember['default'].Helper) {
    forExport = _ember['default'].Helper.helper(_emberTruthHelpersHelpersGte.gteHelper);
  } else if (_ember['default'].HTMLBars.makeBoundHelper) {
    forExport = _ember['default'].HTMLBars.makeBoundHelper(_emberTruthHelpersHelpersGte.gteHelper);
  }

  exports['default'] = forExport;
});
define('exercise-app/helpers/is-array', ['exports', 'ember', 'ember-truth-helpers/helpers/is-array'], function (exports, _ember, _emberTruthHelpersHelpersIsArray) {

  var forExport = null;

  if (_ember['default'].Helper) {
    forExport = _ember['default'].Helper.helper(_emberTruthHelpersHelpersIsArray.isArrayHelper);
  } else if (_ember['default'].HTMLBars.makeBoundHelper) {
    forExport = _ember['default'].HTMLBars.makeBoundHelper(_emberTruthHelpersHelpersIsArray.isArrayHelper);
  }

  exports['default'] = forExport;
});
define('exercise-app/helpers/lt', ['exports', 'ember', 'ember-truth-helpers/helpers/lt'], function (exports, _ember, _emberTruthHelpersHelpersLt) {

  var forExport = null;

  if (_ember['default'].Helper) {
    forExport = _ember['default'].Helper.helper(_emberTruthHelpersHelpersLt.ltHelper);
  } else if (_ember['default'].HTMLBars.makeBoundHelper) {
    forExport = _ember['default'].HTMLBars.makeBoundHelper(_emberTruthHelpersHelpersLt.ltHelper);
  }

  exports['default'] = forExport;
});
define('exercise-app/helpers/lte', ['exports', 'ember', 'ember-truth-helpers/helpers/lte'], function (exports, _ember, _emberTruthHelpersHelpersLte) {

  var forExport = null;

  if (_ember['default'].Helper) {
    forExport = _ember['default'].Helper.helper(_emberTruthHelpersHelpersLte.lteHelper);
  } else if (_ember['default'].HTMLBars.makeBoundHelper) {
    forExport = _ember['default'].HTMLBars.makeBoundHelper(_emberTruthHelpersHelpersLte.lteHelper);
  }

  exports['default'] = forExport;
});
define('exercise-app/helpers/not-eq', ['exports', 'ember', 'ember-truth-helpers/helpers/not-equal'], function (exports, _ember, _emberTruthHelpersHelpersNotEqual) {

  var forExport = null;

  if (_ember['default'].Helper) {
    forExport = _ember['default'].Helper.helper(_emberTruthHelpersHelpersNotEqual.notEqualHelper);
  } else if (_ember['default'].HTMLBars.makeBoundHelper) {
    forExport = _ember['default'].HTMLBars.makeBoundHelper(_emberTruthHelpersHelpersNotEqual.notEqualHelper);
  }

  exports['default'] = forExport;
});
define('exercise-app/helpers/not', ['exports', 'ember', 'ember-truth-helpers/helpers/not'], function (exports, _ember, _emberTruthHelpersHelpersNot) {

  var forExport = null;

  if (_ember['default'].Helper) {
    forExport = _ember['default'].Helper.helper(_emberTruthHelpersHelpersNot.notHelper);
  } else if (_ember['default'].HTMLBars.makeBoundHelper) {
    forExport = _ember['default'].HTMLBars.makeBoundHelper(_emberTruthHelpersHelpersNot.notHelper);
  }

  exports['default'] = forExport;
});
define('exercise-app/helpers/or', ['exports', 'ember', 'ember-truth-helpers/helpers/or'], function (exports, _ember, _emberTruthHelpersHelpersOr) {

  var forExport = null;

  if (_ember['default'].Helper) {
    forExport = _ember['default'].Helper.helper(_emberTruthHelpersHelpersOr.orHelper);
  } else if (_ember['default'].HTMLBars.makeBoundHelper) {
    forExport = _ember['default'].HTMLBars.makeBoundHelper(_emberTruthHelpersHelpersOr.orHelper);
  }

  exports['default'] = forExport;
});
define('exercise-app/helpers/xor', ['exports', 'ember', 'ember-truth-helpers/helpers/xor'], function (exports, _ember, _emberTruthHelpersHelpersXor) {

  var forExport = null;

  if (_ember['default'].Helper) {
    forExport = _ember['default'].Helper.helper(_emberTruthHelpersHelpersXor.xorHelper);
  } else if (_ember['default'].HTMLBars.makeBoundHelper) {
    forExport = _ember['default'].HTMLBars.makeBoundHelper(_emberTruthHelpersHelpersXor.xorHelper);
  }

  exports['default'] = forExport;
});
define('exercise-app/initializers/app-version', ['exports', 'ember-cli-app-version/initializer-factory', 'exercise-app/config/environment'], function (exports, _emberCliAppVersionInitializerFactory, _exerciseAppConfigEnvironment) {
  exports['default'] = {
    name: 'App Version',
    initialize: (0, _emberCliAppVersionInitializerFactory['default'])(_exerciseAppConfigEnvironment['default'].APP.name, _exerciseAppConfigEnvironment['default'].APP.version)
  };
});
define('exercise-app/initializers/export-application-global', ['exports', 'ember', 'exercise-app/config/environment'], function (exports, _ember, _exerciseAppConfigEnvironment) {
  exports.initialize = initialize;

  function initialize() {
    var application = arguments[1] || arguments[0];
    if (_exerciseAppConfigEnvironment['default'].exportApplicationGlobal !== false) {
      var value = _exerciseAppConfigEnvironment['default'].exportApplicationGlobal;
      var globalName;

      if (typeof value === 'string') {
        globalName = value;
      } else {
        globalName = _ember['default'].String.classify(_exerciseAppConfigEnvironment['default'].modulePrefix);
      }

      if (!window[globalName]) {
        window[globalName] = application;

        application.reopen({
          willDestroy: function willDestroy() {
            this._super.apply(this, arguments);
            delete window[globalName];
          }
        });
      }
    }
  }

  exports['default'] = {
    name: 'export-application-global',

    initialize: initialize
  };
});
define('exercise-app/initializers/truth-helpers', ['exports', 'ember', 'ember-truth-helpers/utils/register-helper', 'ember-truth-helpers/helpers/and', 'ember-truth-helpers/helpers/or', 'ember-truth-helpers/helpers/equal', 'ember-truth-helpers/helpers/not', 'ember-truth-helpers/helpers/is-array', 'ember-truth-helpers/helpers/not-equal', 'ember-truth-helpers/helpers/gt', 'ember-truth-helpers/helpers/gte', 'ember-truth-helpers/helpers/lt', 'ember-truth-helpers/helpers/lte'], function (exports, _ember, _emberTruthHelpersUtilsRegisterHelper, _emberTruthHelpersHelpersAnd, _emberTruthHelpersHelpersOr, _emberTruthHelpersHelpersEqual, _emberTruthHelpersHelpersNot, _emberTruthHelpersHelpersIsArray, _emberTruthHelpersHelpersNotEqual, _emberTruthHelpersHelpersGt, _emberTruthHelpersHelpersGte, _emberTruthHelpersHelpersLt, _emberTruthHelpersHelpersLte) {
  exports.initialize = initialize;

  function initialize() /* container, application */{

    // Do not register helpers from Ember 1.13 onwards, starting from 1.13 they
    // will be auto-discovered.
    if (_ember['default'].Helper) {
      return;
    }

    (0, _emberTruthHelpersUtilsRegisterHelper.registerHelper)('and', _emberTruthHelpersHelpersAnd.andHelper);
    (0, _emberTruthHelpersUtilsRegisterHelper.registerHelper)('or', _emberTruthHelpersHelpersOr.orHelper);
    (0, _emberTruthHelpersUtilsRegisterHelper.registerHelper)('eq', _emberTruthHelpersHelpersEqual.equalHelper);
    (0, _emberTruthHelpersUtilsRegisterHelper.registerHelper)('not', _emberTruthHelpersHelpersNot.notHelper);
    (0, _emberTruthHelpersUtilsRegisterHelper.registerHelper)('is-array', _emberTruthHelpersHelpersIsArray.isArrayHelper);
    (0, _emberTruthHelpersUtilsRegisterHelper.registerHelper)('not-eq', _emberTruthHelpersHelpersNotEqual.notEqualHelper);
    (0, _emberTruthHelpersUtilsRegisterHelper.registerHelper)('gt', _emberTruthHelpersHelpersGt.gtHelper);
    (0, _emberTruthHelpersUtilsRegisterHelper.registerHelper)('gte', _emberTruthHelpersHelpersGte.gteHelper);
    (0, _emberTruthHelpersUtilsRegisterHelper.registerHelper)('lt', _emberTruthHelpersHelpersLt.ltHelper);
    (0, _emberTruthHelpersUtilsRegisterHelper.registerHelper)('lte', _emberTruthHelpersHelpersLte.lteHelper);
  }

  exports['default'] = {
    name: 'truth-helpers',
    initialize: initialize
  };
});
define('exercise-app/models/task', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Object.extend({
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
    days: _ember['default'].A(),

    /**
     * The order in which the task should be completed.
     * Task will appear once for each ordering number.
     *
     * @property order
     * @type {Number[]}
     */
    order: _ember['default'].A(),

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
    readableTime: _ember['default'].computed('timer', function () {
      return this.get('timer') ? this.get('timer') / 1000 / 60 + ' minutes' : null;
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
    hasWeight: _ember['default'].computed('weight', function () {
      return typeof this.get('weight') === 'number';
    })
  });
});
define('exercise-app/router', ['exports', 'ember', 'exercise-app/config/environment'], function (exports, _ember, _exerciseAppConfigEnvironment) {

  var Router = _ember['default'].Router.extend({
    location: _exerciseAppConfigEnvironment['default'].locationType
  });

  Router.map(function () {});

  exports['default'] = Router;
});
define('exercise-app/services/tasks', ['exports', 'ember', 'exercise-app/util/tasks', 'exercise-app/models/task'], function (exports, _ember, _exerciseAppUtilTasks, _exerciseAppModelsTask) {
    exports['default'] = _ember['default'].Service.extend({
        /**
         * The raw task items.
         *
         * @property _rawTasks
         * @type {Object[]}
         * @private
         */
        _rawTasks: _exerciseAppUtilTasks['default'],

        /**
         * The saved configurations.
         *
         * @property _savedConfigurations
         * @type {Object[]}
         */
        _savedConfigurations: _ember['default'].computed(function () {
            return localStorage.configs ? _ember['default'].makeArray(JSON.parse(localStorage.configs)) : _ember['default'].makeArray();
        }),

        /**
         * The list of task items.
         *
         * @property _tasks
         * @type {Models.Task[]}
         * @private
         */
        _tasks: _ember['default'].computed('_rawTasks.@each', function () {
            var _this = this;

            return this.get('_rawTasks').map(function (task) {
                var config = _this.get('_savedConfigurations').findBy('taskId', task.id);
                var newTask = _exerciseAppModelsTask['default'].create(task);
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
        getTodaysList: function getTodaysList() {
            var today = 1; //new Date().getDay();
            var list = _ember['default'].makeArray();
            this.get('_tasks').filter(function (task) {
                return task.get('days').indexOf(today) > -1;
            }).forEach(function (task) {
                if (task.get('order').length === 1) {
                    list.push(_ember['default'].Object.create({
                        stepNumber: task.get('order')[0],
                        task: task
                    }));
                } else {
                    task.get('order').forEach(function (stepNumber) {
                        list.push(_ember['default'].Object.create({
                            stepNumber: stepNumber,
                            task: task
                        }));
                    });
                }
            });
            return list.sortBy('stepNumber');
        }
    });
});
define("exercise-app/templates/application", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "revision": "Ember@1.13.12",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 2,
            "column": 0
          }
        },
        "moduleName": "exercise-app/templates/application.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        dom.insertBoundary(fragment, 0);
        return morphs;
      },
      statements: [["content", "task-list", ["loc", [null, [1, 0], [1, 13]]]]],
      locals: [],
      templates: []
    };
  })());
});
define("exercise-app/templates/components/manage-task", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "revision": "Ember@1.13.12",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 2,
            "column": 0
          }
        },
        "moduleName": "exercise-app/templates/components/manage-task.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        dom.insertBoundary(fragment, 0);
        return morphs;
      },
      statements: [["content", "yield", ["loc", [null, [1, 0], [1, 9]]]]],
      locals: [],
      templates: []
    };
  })());
});
define("exercise-app/templates/components/task-item", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "revision": "Ember@1.13.12",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 2,
            "column": 0
          }
        },
        "moduleName": "exercise-app/templates/components/task-item.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        dom.insertBoundary(fragment, 0);
        return morphs;
      },
      statements: [["content", "yield", ["loc", [null, [1, 0], [1, 9]]]]],
      locals: [],
      templates: []
    };
  })());
});
define("exercise-app/templates/components/task-list", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      var child0 = (function () {
        var child0 = (function () {
          return {
            meta: {
              "revision": "Ember@1.13.12",
              "loc": {
                "source": null,
                "start": {
                  "line": 7,
                  "column": 16
                },
                "end": {
                  "line": 9,
                  "column": 16
                }
              },
              "moduleName": "exercise-app/templates/components/task-list.hbs"
            },
            arity: 0,
            cachedFragment: null,
            hasRendered: false,
            buildFragment: function buildFragment(dom) {
              var el0 = dom.createDocumentFragment();
              var el1 = dom.createTextNode("                    ");
              dom.appendChild(el0, el1);
              var el1 = dom.createComment("");
              dom.appendChild(el0, el1);
              var el1 = dom.createTextNode("\n");
              dom.appendChild(el0, el1);
              return el0;
            },
            buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
              var morphs = new Array(1);
              morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
              return morphs;
            },
            statements: [["inline", "task-timer", [], ["duration", ["subexpr", "@mut", [["get", "step.task.timer", ["loc", [null, [8, 42], [8, 57]]]]], [], []], "step", ["subexpr", "@mut", [["get", "step", ["loc", [null, [8, 63], [8, 67]]]]], [], []], "onComplete", "timerEnded"], ["loc", [null, [8, 20], [8, 93]]]]],
            locals: [],
            templates: []
          };
        })();
        return {
          meta: {
            "revision": "Ember@1.13.12",
            "loc": {
              "source": null,
              "start": {
                "line": 5,
                "column": 12
              },
              "end": {
                "line": 10,
                "column": 12
              }
            },
            "moduleName": "exercise-app/templates/components/task-list.hbs"
          },
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("                ");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("p");
            var el2 = dom.createTextNode("for ");
            dom.appendChild(el1, el2);
            var el2 = dom.createComment("");
            dom.appendChild(el1, el2);
            var el2 = dom.createTextNode(".");
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            var el1 = dom.createComment("");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(2);
            morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1]), 1, 1);
            morphs[1] = dom.createMorphAt(fragment, 3, 3, contextualElement);
            dom.insertBoundary(fragment, null);
            return morphs;
          },
          statements: [["content", "step.task.readableTime", ["loc", [null, [6, 23], [6, 49]]]], ["block", "if", [["get", "step.showTimer", ["loc", [null, [7, 22], [7, 36]]]]], [], 0, null, ["loc", [null, [7, 16], [9, 23]]]]],
          locals: [],
          templates: [child0]
        };
      })();
      var child1 = (function () {
        var child0 = (function () {
          var child0 = (function () {
            return {
              meta: {
                "revision": "Ember@1.13.12",
                "loc": {
                  "source": null,
                  "start": {
                    "line": 11,
                    "column": 46
                  },
                  "end": {
                    "line": 11,
                    "column": 101
                  }
                },
                "moduleName": "exercise-app/templates/components/task-list.hbs"
              },
              arity: 0,
              cachedFragment: null,
              hasRendered: false,
              buildFragment: function buildFragment(dom) {
                var el0 = dom.createDocumentFragment();
                var el1 = dom.createTextNode(" at ");
                dom.appendChild(el0, el1);
                var el1 = dom.createComment("");
                dom.appendChild(el0, el1);
                var el1 = dom.createTextNode(" lbs");
                dom.appendChild(el0, el1);
                return el0;
              },
              buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
                var morphs = new Array(1);
                morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
                return morphs;
              },
              statements: [["content", "step.task.weight", ["loc", [null, [11, 77], [11, 97]]]]],
              locals: [],
              templates: []
            };
          })();
          return {
            meta: {
              "revision": "Ember@1.13.12",
              "loc": {
                "source": null,
                "start": {
                  "line": 10,
                  "column": 12
                },
                "end": {
                  "line": 12,
                  "column": 12
                }
              },
              "moduleName": "exercise-app/templates/components/task-list.hbs"
            },
            arity: 0,
            cachedFragment: null,
            hasRendered: false,
            buildFragment: function buildFragment(dom) {
              var el0 = dom.createDocumentFragment();
              var el1 = dom.createTextNode("                ");
              dom.appendChild(el0, el1);
              var el1 = dom.createElement("p");
              var el2 = dom.createTextNode("for ");
              dom.appendChild(el1, el2);
              var el2 = dom.createComment("");
              dom.appendChild(el1, el2);
              var el2 = dom.createTextNode(" reps");
              dom.appendChild(el1, el2);
              var el2 = dom.createComment("");
              dom.appendChild(el1, el2);
              var el2 = dom.createTextNode(".");
              dom.appendChild(el1, el2);
              dom.appendChild(el0, el1);
              var el1 = dom.createTextNode("\n            ");
              dom.appendChild(el0, el1);
              return el0;
            },
            buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
              var element0 = dom.childAt(fragment, [1]);
              var morphs = new Array(2);
              morphs[0] = dom.createMorphAt(element0, 1, 1);
              morphs[1] = dom.createMorphAt(element0, 3, 3);
              return morphs;
            },
            statements: [["content", "step.task.reps", ["loc", [null, [11, 23], [11, 41]]]], ["block", "if", [["get", "step.task.hasWeight", ["loc", [null, [11, 52], [11, 71]]]]], [], 0, null, ["loc", [null, [11, 46], [11, 108]]]]],
            locals: [],
            templates: [child0]
          };
        })();
        return {
          meta: {
            "revision": "Ember@1.13.12",
            "loc": {
              "source": null,
              "start": {
                "line": 10,
                "column": 12
              },
              "end": {
                "line": 12,
                "column": 12
              }
            },
            "moduleName": "exercise-app/templates/components/task-list.hbs"
          },
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createComment("");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(1);
            morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
            dom.insertBoundary(fragment, 0);
            dom.insertBoundary(fragment, null);
            return morphs;
          },
          statements: [["block", "if", [["get", "step.task.reps", ["loc", [null, [10, 22], [10, 36]]]]], [], 0, null, ["loc", [null, [10, 12], [12, 12]]]]],
          locals: [],
          templates: [child0]
        };
      })();
      return {
        meta: {
          "revision": "Ember@1.13.12",
          "loc": {
            "source": null,
            "start": {
              "line": 2,
              "column": 4
            },
            "end": {
              "line": 14,
              "column": 4
            }
          },
          "moduleName": "exercise-app/templates/components/task-list.hbs"
        },
        arity: 1,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("        ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("li");
          var el2 = dom.createTextNode("\n            ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("p");
          var el3 = dom.createElement("strong");
          var el4 = dom.createComment("");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("        ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element1 = dom.childAt(fragment, [1]);
          var morphs = new Array(4);
          morphs[0] = dom.createAttrMorph(element1, 'class');
          morphs[1] = dom.createElementMorph(element1);
          morphs[2] = dom.createMorphAt(dom.childAt(element1, [1, 0]), 0, 0);
          morphs[3] = dom.createMorphAt(element1, 3, 3);
          return morphs;
        },
        statements: [["attribute", "class", ["concat", [["subexpr", "if", [["subexpr", "eq", [["get", "step.stepNumber", ["loc", [null, [3, 28], [3, 43]]]], ["get", "currentStep", ["loc", [null, [3, 44], [3, 55]]]]], [], ["loc", [null, [3, 24], [3, 56]]]], "current"], [], ["loc", [null, [3, 19], [3, 68]]]], " ", ["subexpr", "if", [["get", "step.isComplete", ["loc", [null, [3, 74], [3, 89]]]], "complete"], [], ["loc", [null, [3, 69], [3, 102]]]]]]], ["element", "action", ["activateStep", ["get", "step", ["loc", [null, [3, 128], [3, 132]]]]], [], ["loc", [null, [3, 104], [3, 134]]]], ["content", "step.task.title", ["loc", [null, [4, 23], [4, 42]]]], ["block", "if", [["get", "step.task.timer", ["loc", [null, [5, 18], [5, 33]]]]], [], 0, 1, ["loc", [null, [5, 12], [12, 19]]]]],
        locals: ["step"],
        templates: [child0, child1]
      };
    })();
    return {
      meta: {
        "revision": "Ember@1.13.12",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 16,
            "column": 0
          }
        },
        "moduleName": "exercise-app/templates/components/task-list.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("ul");
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(dom.childAt(fragment, [0]), 1, 1);
        return morphs;
      },
      statements: [["block", "each", [["get", "steps", ["loc", [null, [2, 12], [2, 17]]]]], [], 0, null, ["loc", [null, [2, 4], [14, 13]]]]],
      locals: [],
      templates: [child0]
    };
  })());
});
define("exercise-app/templates/components/task-timer", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "revision": "Ember@1.13.12",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 2,
            "column": 0
          }
        },
        "moduleName": "exercise-app/templates/components/task-timer.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        dom.insertBoundary(fragment, 0);
        return morphs;
      },
      statements: [["content", "readableTimeLeft", ["loc", [null, [1, 0], [1, 20]]]]],
      locals: [],
      templates: []
    };
  })());
});
define('exercise-app/util/tasks', ['exports'], function (exports) {
    exports['default'] = [{
        id: 0,
        title: 'Stretch',
        days: [1, 3, 5], // Represents days in which this task should be performed. Sunday = 0, Monday = 1, etc
        order: [0] // The ordering in shich this item should be completed. Will be duplicated if multiple numbers provided
    }, {
        id: 1,
        title: 'Warm Up with Cardio',
        days: [1, 3, 5],
        order: [1],
        timer: 5 * 60 * 1000 // Run for 5 minutes by default
    }, {
        id: 2,
        title: 'One-arm Dumbbell Military Press',
        days: [1],
        order: [2, 4],
        reps: 6,
        weight: 0 // No default weight
    }, {
        id: 3,
        title: 'Lateral Pulldown',
        days: [1, 5],
        order: [3, 5],
        reps: 6,
        weight: 0
    }, {
        id: 4,
        title: 'Barbell Deadlift',
        days: [1, 5],
        order: [6, 8],
        reps: 3,
        weight: 0
    }, {
        id: 5,
        title: 'Slow and Controlled Sit-Ups',
        days: [1],
        order: [7, 9],
        reps: 10
    }, {
        id: 6,
        title: 'Double Dumbbell Military Press',
        days: [3],
        order: [2, 4],
        reps: 6,
        weight: 0
    }, {
        id: 7,
        title: 'One-arm Dumbbell Bent-over Row (each side)',
        days: [3],
        order: [3, 5],
        reps: 6,
        weight: 0
    }, {
        id: 8,
        title: 'Dumbbell Squat',
        days: [3],
        order: [6, 8],
        reps: 6,
        weight: 0
    }, {
        id: 9,
        title: 'Dumbbell Lunge (each side)',
        days: [3],
        order: [7, 9],
        reps: 6,
        weight: 0
    }, {
        id: 10,
        title: 'Bench Press',
        days: [5],
        order: [2, 4],
        reps: 6,
        weight: 0
    }, {
        id: 11,
        title: 'Hanging Leg Raise',
        days: [5],
        order: [7, 9],
        reps: 5
    }];
});
/* jshint ignore:start */

/* jshint ignore:end */

/* jshint ignore:start */

define('exercise-app/config/environment', ['ember'], function(Ember) {
  var prefix = 'exercise-app';
/* jshint ignore:start */

try {
  var metaName = prefix + '/config/environment';
  var rawConfig = Ember['default'].$('meta[name="' + metaName + '"]').attr('content');
  var config = JSON.parse(unescape(rawConfig));

  return { 'default': config };
}
catch(err) {
  throw new Error('Could not read config from meta tag with name "' + metaName + '".');
}

/* jshint ignore:end */

});

if (!runningTests) {
  require("exercise-app/app")["default"].create({"name":"exercise-app","version":"0.0.0+949f3841"});
}

/* jshint ignore:end */
//# sourceMappingURL=exercise-app.map