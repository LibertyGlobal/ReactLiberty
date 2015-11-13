ReactPixi made right
====================

This is a React binding for Pixi which does not have React hacked and backed-in. Also supports https://github.com/facebook/css-layout for layouting.

Inherit your root component component from React.Component and use ReactPixi.Container, ReactPixi.Text and ReactPixi.Image in your components.

Render root node via `ReactPixi.render(React.createElement(MyRootComponent));`

Performance hints
-----------------
- Set images dimensions via properties

Classes tree
------------
![ReactLiberty classes tree](https://raw.github.com/LibertyGlobal/ReactLiberty/master/figures/inheritance scheme.png)