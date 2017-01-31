module.exports = function() {

    this.setConfig = function(name, value) {
        this[name] = value;
    }

    this.config = function(name) {
        return this[name];
    }

}