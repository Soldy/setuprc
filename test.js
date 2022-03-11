#!/usr/bin/nodejs

'use strict';

const nanoTest  = new (require('nanoTest')).test({
    'progress_bar' : false,
    'debug_print' : 'short'
});

const setupBase =  (require('./index.js')).base;


const setup = new  setupBase({
    'testNoDefault':{
        'type'    : 'string'
    },
    'testString':{
        'type'    : 'string',
        'default' : 'value'
    },
    'testInteger':{
        'type'    : 'integer',
        'default' : 3
    },
    'testFloat':{
        'type'    : 'float',
        'default' : 3.14
    },
    'testArray':{
        'type'    : 'array',
        'default' : ['tarray','parray']
    },
    'testSelect':{
        'type'    : 'select',
        'list'    : ['tarray','parray','give','me','blue','2array','bird'],
        'default' : 'tarray'
    },
    'testList':{
        'type'    : 'list',
        'list'    : ['tarray','parray','give','me','blue','bird','6array','7array'],
        'default' : ['tarray','parray']
    }

});

console.log('Should be 5 error messages in here:');

nanoTest.add(
    'empty setup call',
    {
        'function': ()=>{
            new setupBase();
            return false;
        },
        'options' :[
        ]
    },
    '===',
    false 
);


nanoTest.add(
    'check no type',
    {
        'function':setup.get,
        'options' :[
        ]
    },
    'error'
);

nanoTest.add(
    'check set no type and value',
    {
        'function':setup.set,
        'options' :[
        ]
    },
    '===',
    false 
);

nanoTest.add(
    'check set no type and value',
    {
        'function':setup.set,
        'options' :[
            'testList'
        ]
    },
    '===',
    false 
);


nanoTest.add(
    'check set not exist type',
    {
        'function':setup.set,
        'options' :[
            'not exist type',
            'ff'
        ]
    },
    'error'
);

nanoTest.add(
    'check set not correct type',
    {
        'function':setup.set,
        'options' :[
            'testInteger',
            'hopp that string'
        ]
    },
    'error'
);

nanoTest.add(
    'check not exist type',
    {
        'function':setup.get,
        'options' :[
            'some nothing'
        ]
    },
    'error'
);

nanoTest.add(
    'check get string',
    {
        'function':setup.get,
        'options' :[
            'testString'
        ]
    },
    '===',
    'value'
);


nanoTest.add(
    'check get integer',
    {
        'function':setup.get,
        'options' :[
            'testInteger'
        ]
    },
    '===',
    3
);

nanoTest.add(
    'check get float',
    {
        'function':setup.get,
        'options' :[
            'testFloat'
        ]
    },
    '===',
    3.14
);

nanoTest.add(
    'check get array',
    {
        'function':setup.get,
        'options' :[
            'testArray'
        ]
    },
    'j==',
    ['tarray', 'parray']
);

nanoTest.add(
    'check get select',
    {
        'function':setup.get,
        'options' :[
            'testSelect'
        ]
    },
    '===',
    'tarray'
);


nanoTest.add(
    'check get list',
    {
        'function':setup.get,
        'options' :[
            'testList'
        ]
    },
    'j==',
    ['tarray','parray']
);


nanoTest.add(
    'check set string',
    {
        'function':setup.set,
        'options' :[
            'testString',
            'othervalddue'
        ]
    },
    '===',
    true
);


nanoTest.add(
    'check set integer',
    {
        'function':setup.set,
        'options' :[
            'testInteger',
            6
        ]
    },
    '===',
    true
);

nanoTest.add(
    'check set float',
    {
        'function':setup.set,
        'options' :[
            'testFloat',
            4.14
        ]
    },
    '===',
    true
);

nanoTest.add(
    'check set array',
    {
        'function':setup.set,
        'options' :[
            'testArray',
            ['4array', '5array']
        ]
    },
    '===',
    true
);

nanoTest.add(
    'check set select',
    {
        'function':setup.set,
        'options' :[
            'testSelect',
            '2array'
        ]
    },
    '===',
    true
);


nanoTest.add(
    'check set list',
    {
        'function':setup.set,
        'options' :[
            'testList',
            ['6array','7array']
        ]
    },
    '===',
    true
);



nanoTest.add(
    'check get string',
    {
        'function':setup.get,
        'options' :[
            'testString'
        ]
    },
    '===',
    'othervalddue'
);


nanoTest.add(
    'check get integer',
    {
        'function':setup.get,
        'options' :[
            'testInteger'
        ]
    },
    '===',
    6
);

nanoTest.add(
    'check get float',
    {
        'function':setup.get,
        'options' :[
            'testFloat'
        ]
    },
    '===',
    4.14
);

nanoTest.add(
    'check get array',
    {
        'function':setup.get,
        'options' :[
            'testArray'
        ]
    },
    'j==',
    ['4array', '5array']
);

nanoTest.add(
    'check get select',
    {
        'function':setup.get,
        'options' :[
            'testSelect'
        ]
    },
    '===',
    '2array'
);


nanoTest.add(
    'check get list',
    {
        'function':setup.get,
        'options' :[
            'testList'
        ]
    },
    'j==',
    ['6array','7array']
);

nanoTest.add(
    'check get list',
    {
        'function':setup.get,
        'options' :[
            'testList'
        ]
    },
    'j==',
    ['6array','7array']
);

nanoTest.add(
    'check set list',
    {
        'function':setup.setup,
        'options' :[
            {
                'testFloat'  : 7.8,
                'testString' : 'hu'
            }
        ]
    },
    '===',
    true

);


nanoTest.add(
    'check set list fail',
    {
        'function':setup.setup,
        'options' :[
            {
                'testFloat'  : 'fail',
                'testString' : 'hu'
            }
        ]
    },
    'error'
);




nanoTest.run();


