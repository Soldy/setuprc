'use strict';

const typeHardening =  new (require('typehardeningrc')).typeHardeningBase();

const setupBase = function (setupIn){
    /*
     * get option value
     * @param {string} value
     * @public
     * @return {ann}
     */
    this.get = function(type){
        if(typeof type === 'undefined')
            return false;
        if(typeof setup[type] === 'undefined')
            return false;
        return setup[type];
    };
    /*
     * set multiple options interface
     * @param {object} settings
     * @public
     * @return {any}
     */
    this.setup = function(settings){
        let out = true;
        for(let i in settings)
            if(set(i, settings[i]) === false)
                out = false;
        return out;
    };
    /*
     * set on option interface
     * @param {string} type 
     * @param {any} value
     * @public
     * @return {any}
     */
    this.set = function(type, value){
        if(typeof type === 'undefined')
            return false;
        if(typeof value === 'undefined')
            return false;
        return set(type,value);
    };
    /*
     * set on option function
     * @param {string} type 
     * @param {any} value
     * @private
     * @return {any}
     */
    let set = function(type, value){
        if(typeof setupTypes[type] === 'undefined')
            return false;
        if(typeHardening.check(setupTypes[type], value) === false)
            return false;
        setup[type] = value;
        return true;
    };
    /*
     * @private
     * @var {object}
     */
    let setup = {};
    /*
     * @private
     * @var {object}
     */
    let setupTypes = setupIn;
    /*
     * @private
     * @var {object}
     */
    for (let i in setupTypes)
        if(typeof setupTypes[i]['default'] !== 'undefined')
            setup[i] = setupTypes[i]['default'];
};

exports.setupBase = setupBase;
