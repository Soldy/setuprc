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
        if(typeof _setup[name] === 'undefined')
            return Error(
                'Undefined setup option'
            );
        return $clonerc.faster(
            _setup[name]
        );
    };
    /*
     * set multiple options interface
     * @param {object} settings
     * @public
     * @return {any}
     */
    this.setup = function(settings){
        let out = true;
        if(typeof settings.all === 'function')
            settings = settings.all();
        for(let i in settings)
            if(_set(i, settings[i]) === false)
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
        return _set(type,value);
    };
    /*
     * @public
     * @return {object}
     */
    this.all = function(){
        let out = {};
        for(let i in _setup)
            out[i] = $clonerc.faster(
                _setup[i]
            );
        return out;
    };
    /*
     * set on option function
     * @param {string} type 
     * @param {any} value
     * @private
     * @return {any}
     */
    const _set = function(type, value){
        // set not exist
        if ( typeof _setup_types[type] === 'undefined')
            throw Error('Setup option not exist');
        // is constant ? 
        if (
            ( _setup_types[type]['set'] ) &&
            ( _setup_types[type]['const'] )
        )
            return Error('');

        // type check 
        if (
            $typeHardening.check(
                _setup_types[type],
                value
            ) === false
        )
            throw TypeError(
                'The type is  "'+
                (typeof value)+
                '" but "'+
                _setup_types[type]+
                '" requested'
            );
        // type set
        _setup[type] = $clonerc.faster(value);
        _setup_types[type]['set'] = true;
        return true;
    };
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
    let _setup_types = setup_in;
    /*
     * @private
     * @var {object}
     */
    for (let i in _setup_types){
        _setup_types[i] = _typeExtend(
            _setup_types[i]
        );
        if(typeof _setup_types[i]['default'] !== 'undefined')
            _setup[i] = _setup_types[i]['default'];
    }
};

exports.base = SetupBase;
