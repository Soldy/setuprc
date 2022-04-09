# About 

The SetuprRC is a hard typed setup object holder. Nothing more.

# init 

```javascript 

const setup = new  (require('setuprc')).base({
    'testString':{ // setup option
        'type'    : 'string', //  typeHardening type 
        'default' : 'value'   // default value
       // ... optional typehardening limiters
    },
    'testList':{
        'type'    : 'list',
        'list'    : ['tarray','parray','give','me','blue','bird','6array','7array'],
        'default' : ['tarray','parray']
    }
});


```

# basic usage 


## Set a value 

```javascript 

setup.set(
    'testString',
    'new value'
);

// return with boolean true or false

```

## Get a value

```javascript


setup.get(
    'testString'
);

// return  with the setting option.

```

## all value 

```javascript


setup.all();

// return  fill setup option

```
## Reset all value to default 

```javascript


setup.reset();


```
