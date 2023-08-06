Python port of redux library

Simple example app:

```
from pyredux import create_store, actiontypes, frozenbunch

action_types = actiontypes('myapp', 'increment decrement')

def app_reducer(state, action):
    if state is None:
        return frozenbunch(counter=0)
    if action.type == action_types.increment:
        return state.copy(counter=state.counter + 1)
    elif action.type == action_types.decrement:
        return state.copy(counter=state.counter - 1)
    return state

store = create_store(app_reducer)
```

The frozenbunch type is an immutable version of the Bunch pattern, whose members can be accessed by item or by attribute. For example:

```
x = frozenbunch(foo=12, bar=7)
x['foo']
x.foo
x['foo'] = 17
x.foo = 17
x = x.copy(bar=17)
```


