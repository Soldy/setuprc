# Legacy Note

This is old legacy code. In the background, I am working on a modern version in this tool.
That branch works, fits well to the latest nodejs, Bun and Deno.
I am not publishing the branch for goods.
In my view, the RC collection never reached the production-ready state.
However, a lot of people started to use it. So when I made the decision to remove I got request not to do. 
So if I ever finish the updated version, it should not have any backward compatibility. 
Also I monitoring the Deno, Bun stds. Maybe the full RC collection will be pointless. 
Because I always prefer the std over any third-party tool. Even if I made the third party. 
So that stays here. I do some fun to update it sometimes. And that's all. Have fun, everyone.


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
