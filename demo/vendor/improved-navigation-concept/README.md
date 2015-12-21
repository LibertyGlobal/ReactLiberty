Improved navigation concept
===

Goal
---
Reduce key handling complexity, but be flexible enough to handle changing demands from design.

Note
---
Work In Progress - current version only handles Visual Navigation (not ideal yet).

Demo
---
`npm start` and go to `http://localhost:9999`

Example
---

```
class Button extends React.Component {
   onFocus() {
      // TODO: add button specific logic
      this.props.onFocus();
   }
   onBlur() {}
   render() {
      return <Focusable onFocus={()=>this.onFocus()} onBlur={()=>this.onBlur()} onSelect={this.props.onSelect}>
         <div>
            {this.props.children}
         </div>
      </Focusable>;
   }

}
```

```

import {RestoreStateNavigation, SpatialNavigation} from 'horizon4-navigation';

class App extends React.Component {

   onOkayButtonSelect() {
      // handle select thingy
   }

   render() {
      return <div>
         <NavigationContainer strategy={SpatialNavigation}>
            <NavigationContainer strategy={RestoreStateNavigation}>
               <ActionMenu>
                  <ActionMenuItem onSelect={()=>this.play()}>Play movie</ActionItemMenu>
                  <ActionMenuItem>Watch trailer</ActionItemMenu>
                  <ActionMenuItem>Add to watchlist</ActionItemMenu>
               </ActionMenu>
            </NavigationContainer>
            <Button onSelect={()=>this.onOkayButtonSelect()}>Okay</Button>
            <Button onSelect={()=>this.onCancelButtonSelect()}>Cancel</Button>
         </NavigationContainer>
      </div>
   }

}
```
Focus management algorithm
---

+ `FocusManager` finds the root `NavigationContainer` and asks its `NavigationStrategy` for the `preferredFocusedComponent`
+ root `NavigationContainer`'s `NavigationStrategy` returns its `preferredFocusedComponent`
+ if given `preferredFocusedComponent` is a `NavigationContainer` itself, `FocusManager` repeats the steps above with that Container
+ if given `preferredFocusedComponent` is a `Focusable`, `FocusManager` stores it as a `currentFocusable` and calls its `onFocus` method

Similar ideas:
- https://developer.apple.com/library/prerelease/tvos/documentation/General/Conceptual/AppleTV_PG/WorkingwiththeAppleTVRemote.html
- http://nerds.airbnb.com/tvos-focus-engine/
- http://www.slideshare.net/EvanMaloney/tvos-the-focus-engine-and-swift
- https://developer.mozilla.org/en-US/docs/Mozilla/Firefox_OS/TVs_connected_devices/TV_remote_control_navigation
