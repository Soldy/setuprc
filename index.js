'use strict';

const typeHardening =  new (require('typeHardening')).typeHardeningBase();

const setupBase = function (setupIn){
    this.get = function(type){
        if(typeof type === 'undefined')
            return false;
        if(typeof setup[type] === 'undefined')
            return false;
        return setup[type];
    };
    this.setup = function(settings){
        for(let i in settings)
            set(i, settings[i]);
    };
    this.set = function(type, value){
        if(typeof type === 'undefined')
            return false;
        if(typeof value === 'undefined')
            return false;
        return set(type,value);
    };
    let set = function(type, value){
        if(typeof setupTypes[type] === 'undefined')
            return false;
        if(typeHardening.check(setupTypes[type], value) === false)
            return false;
        setup[type] = value;
        return true;
    };
    let setup = {};
    let setuTypes = setupIn;
    for (let i in setupTypes)
        setup[i] = setupTypes[i]['default'];
};

exports.setupBase = setupBase;
