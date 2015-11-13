React Liberty
=============

Connect, discover, be free to choose between PIXI / DOM and any other renderer when put your components on the screen
---------------------------------------------------------------------------------------------------------------------

This is a React binding for Pixi which does not have React hacked and backed-in. Also supports https://github.com/facebook/css-layout for layouting.

Inherit your root component component from React.Component and use ReactPixi.Container, ReactPixi.Text and ReactPixi.Image in your components.

Render root node via `ReactPixi.render(React.createElement(MyRootComponent));`

Performance hints
-----------------
- Set images dimensions via component properties initially to prevent relayouting when they complete loading

Classes tree
------------
![ReactLiberty classes tree](https://raw.githubusercontent.com/LibertyGlobal/ReactLiberty/master/figures/inhertitance-scheme.png?token=AAxer4RGVCjtZHBtM6Xl2ni4Rq5jE1sRks5WTzRJwA%3D%3D)