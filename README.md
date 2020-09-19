# About 

The SteuprRC is a hard typed setup object holder. Nothinng more.

# init 

```javascript 

const setup = new  setupBase({
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

#basic usage 


set value 

```javascript 

setup.set(
    'testString',
    'new value'
);

// return with boolean true or false

```
get value

```javascript


setup.get(
    'testString'
);

// return  with the setting option.

```
