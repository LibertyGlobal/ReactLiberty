React Liberty
=============

![LGI slogan](https://media.licdn.com/media/p/5/000/1c7/0ee/0b3c8ed.png)

Be free to choose between WebGL / Canvas / DOM / Native or any other UI renderer
---------------------------------------------------------------------------------

This is a React library designed to abstract renderer by presenting three kinds of entities. They are Image, Text and Container.

React Liberty uses [CSS Layout](https://github.com/facebook/css-layout) for laying components out, [ReactMotion](https://github.com/chenglou/react-motion) for declarative animations and [Sunbeam](https://github.com/LibertyGlobal/sunbeam) for focus management.



Motivation
----------
As a TV company LibertyGlobal support a few generations of TV devices: Horizon, Dawn, EOS exposing HTML UI, every of them have some specifity and nobody knows which shift we may expect in next few years. Let`s be prepared for the future by providing UI abstraction which allows to switch between renderers. So for example if we switch to Android we do not need to remake all apps we have, but use the same markup with a new Android renderer.

How it looks like at app developer level?
-----------------------------------------
```html
		<main>
          <Div>
            <List cyclic={false} orientation="vertical">
              <Div>
                <P>News</P>
                <List itemClass={AppAsset}
                      data={appService.getApplicationsByCategory('news')}/>
              </Div>
              <Div>
                <P>Music</P>
                <List itemClass={AppAsset}
                      data={appService.getApplicationsByCategory('music')}/>
              </Div>
              <BackToTopButton onSelect={this.goTop}/>
            </List>
          </Div>
        </main>
```

Just have a look at [demo](https://github.com/LibertyGlobal/ReactLiberty/tree/master/demo).


Usage
-----

Inherit your root component component from React.Component and use Div, P and Img (capitalized) to declare UI. You may append ReactLiberty components to regular ReactDOM components.

Switch between DOM and WebGL by setting `window.libertyRender = 'gl'` or `'dom'`


Build from sources
------------------

You will need npm v3.0 or higher.
Then do: `npm install`, `npm run compile` in order to compile library or `npm run appdev` in order to compile demo from demo folder.

Performance hints
-----------------
- Set images dimensions via component properties initially to prevent relayouting when their loading is complete

Classes tree
------------

This is a set of base components every ReactLiberty renderer should support:


![ReactLiberty classes tree](https://github.com/LibertyGlobal/ReactLiberty/blob/master/figures/inhertitance-scheme.png)