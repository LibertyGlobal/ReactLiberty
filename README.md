ReactPixi made right
====================

This is a React binding for Pixi which does not have React hacked and backed-in. Also supports https://github.com/facebook/css-layout for layouting.

Inherit your root component component from React.Component and use ReactPixi.Container, ReactPixi.Text and ReactPixi.Image in your components.

Render root node via `ReactPixi.render(React.createElement(MyRootComponent));`

Look into `figures/inheritance scheme.png` to understand how components inherit from each other.