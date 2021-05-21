/*
 *  @Soldy\setuprc\2021.02.04\GPL3
 */
'use strict';

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
    this.get = function(type){
        if(typeof type === 'undefined')
            return false;
        if(typeof _setup[type] === 'undefined')
            return false;
        return _setup[type];
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
            out[i] = _setup[i];
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
        if ( typeof _setup_types[type] === 'undefined')
            return false;
        if (
            ( _setup_types[type]['set'] ) &&
            ( _setup_types[type]['const'] )
        )
            return false;
        if (
            $typeHardening.check(
                _setup_types[type], 
                value
            ) === false
        )
            return false;
        _setup[type] = value;
        _setup_types[type]['set'] = true;
        return true;
    };
    /*
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
