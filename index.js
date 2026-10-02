/*
 *  @Soldy\setuprc\2021.02.04\GPL3
 */
'use strict';

const $clonerc = new (require('clonerc')).base();
const $typeHardening =  new (require('typehardeningrc')).base();
/*
 * @prototype
 */
const SetupBase = function (setup_in){
    /*
     * get option value
     * @param {string} value
     * @public
     * @return {ann}
     */
    this.get = function(name){
        if(typeof name === 'undefined')
            throw Error(
                'Undefined setup option name'
            );
        if(!_setup.hasOwnProperty(name))
            throw Error(
                'Undefined setup option "'+name+'"'
            );
        return $clonerc.faster(
            _setup[name]
        );
    };
    /*
     * set multiple options interface
     * @param {object} settings
     * @public
     * @return {bool}
     */
    this.setup = function(settings){
        for(let i in settings)
            if(settings.hasOwnProperty(i))
                _check(i, settings[i]);
        for(let i in settings)
            if(settings.hasOwnProperty(i))
                _set(i, settings[i]);
        return true
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
            throw Error('Setuprs set type undefined');
        if(typeof value === 'undefined')
            throw Error('Setuprs set value undefined');
        _check(type,value);
        return _set(type,value);
    };
    /*
     * @public
     * @return {object}
     */
    this.all = function(){
        let out = {};
        for(let i in _setup)
            if(_setup.hasOwnProperty(i))
                out[i] = this.get(i);
        return out;
    };
    /*
     * @public
     * @return {void}
     */
    this.reset = function(){
        return _reset();
    };
    /*
     * set on option function
     * @param {string} type 
     * @param {any} value
     * @private
     * @return {any}
     */
    const _check = function(type, value){
        // set not exist
        if ( typeof _setup_types[type] === 'undefined')
            throw Error('Setup option not exist');
        // is constant ? 

        // type check and validation
        if (
            $typeHardening.check(
                _setup_types[type],
                value
            ) === false
        )
            throw TypeError(
                'The "'+
                type
                +'" type is  "'+
                (typeof value)+
                '" but "'+
                _setup_types[type].type+
                '" requested'
            );
        if (
            ( _setup_types[type]['set'] ) &&
            ( _setup_types[type]['const'] )
        )
            throw Error('Option "'+type+'" is constant.');
    }
    /*
     * set on option function
     * @param {string} type 
     * @param {any} value
     * @private
     * @return {any}
     */
    const _set = function(type, value){
        // type set
        _setup[type] = $clonerc.faster(value);
        _setup_types[type]['set'] = true;
        return true;
    };
    /*
     * @private
     * @return {void}
     */
    const _reset = function(){
        for (let i in _setup_types)
            if(_setup_types.hasOwnProperty(i))
                _set(
                    i,
                    $typeHardening.getDefault(
                        _setup_types[i]
                    )
                );
    }
    /*
     * short deffination extender
     * @param {object} type
     * @private
     */
    const _typeExtend = function(type){
        if ( typeof type['const'] !== 'boolean' )
            type['const'] = false;
        if ( typeof type['set'] !== 'boolean' )
            type['set'] = false;
        type['default'] = $typeHardening.getDefault(type);
        return type;
    };
    /*
     * @private
     * @var {object}
     */
    let _setup = {};
    /*
     * @private
     * @var {object}
     */
    let _setup_types = $clonerc.faster(setup_in);
    /*
     * @private
     * @var {object}
     */
    for (let i in _setup_types){
        if(!_setup_types.hasOwnProperty(i))
            throw Error('Setuprc init type extend error');
        _setup_types[i] = _typeExtend(
            _setup_types[i]
        );
        if(typeof _setup_types[i]['default'] !== 'undefined')
            _setup[i] = $clonerc.faster(_setup_types[i]['default']);
    }
};

exports.base = SetupBase;
