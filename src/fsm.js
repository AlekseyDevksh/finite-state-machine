class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {
        this.config = config;
        this.state = config.initial;
        this.states = config.states;
        this.prev = null;
        this.next = null;
        if (!config) { throw new Error() }
    }

    /**
     * Returns active state.
     * @returns {String}
     */
    getState() {
        return this.state;
    }

    /**
     * Goes to specified state.
     * @param state
     */
    changeState(state) {
        if (this.states.hasOwnProperty(state)) {
            this.prev = this.state;
            this.state = state;
        } else {
            throw new Error();
        }
    }

    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {
        if (this.states[this.state].transitions.hasOwnProperty(event)) {
            this.prev = this.state;
            this.state = this.states[this.state].transitions[event];
        } else {
            throw new Error();
        }
    }

    /**
     * Resets FSM state to initial.
     */
    reset() {
        this.state = this.config.initial;
    }

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {
        this.statesArr = [];

        if (event) {
            for (var property in this.states) {
                if (this.states[property].transitions.hasOwnProperty(event))
                    this.statesArr.push(property);
            }
            return this.statesArr;
        } else {
            return Object.keys(this.states);
        }
    }

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {
        if (this.prev) {
            this.next = this.state;
            this.state = this.prev;
            this.prev = null;
            return true;
        } else {
            return false;
        }
    }

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {
        if (this.next) {
            this.prev = this.state;
            this.state = this.next;
            this.next = null;
            return true;
        } else {
            return false;
        }
    }

    /**
     * Clears transition history
     */
    clearHistory() {
        this.prev = null;
        this.next = null;
    }
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
