# Application BEMs (Block, Element, Modifiers)

To provide the best user experience with graceful degradation for older browsers, we will focus on creating a front-end that adheres to the BEM design methodology (https://en.bem.info/methodology/quick-start/). To achieve this goal while maintaining framework agnostisicm, we will use Material Design Lite (https://getmdl.io/index.html)

Material Design: https://material.io/design/introduction/#

MD Development: https://codelabs.developers.google.com/codelabs/mdc-101-web/#0

MD Development General: https://material.io/collections/developer-tutorials/#

MDLite: https://getmdl.io/index.html (no dependencies just js/css)

Deck on MDL: https://speakerdeck.com/gauntface/material-design-lite-preview?slide=2

Materialize Framework (maybe): https://materializecss.com/about.html

Icons: https://material.io/tools/icons/?style=baseline

General Material Info: https://material.io/

Angular JS (JS framework, like react): https://codelabs.developers.google.com/codelabs/angular-codelab/index.html?index=..%2F..index#0 this will let us code for mobile, and even native apps easily.

Angular Site: https://angular.io/

TypeScript (Javascript, but ECMA2015 which transpiles to ES3 for any browser) https://www.typescriptlang.org/ - we will need this for angular and general modern web dev (less code more sense)

I looked more into MDB, and I understand why we couldn't grok the view-source... because the whole point is to drag/drop compoenents from a builder. It's actually amazing... BUT https://mdbootstrap.com/general/license/ says we can NEVER embed in an Open-Source project, so it's out for us.

Node.js/NPM - looks like this is a big part of how people build MD style pages and apps. There's a lot of importing (like python) and code reuse... So it's a learning curve again, but might really make our lives so much better if we invest the effort.

The following is a short list of the Views, Blocks, Elements, and Modifiers we will be creating and managing.

## Views

* / (root)
* /about
* /login
* /add_rating_target (needs new name, profile desires, goals, plan, objectives)
* /add_first_experience

### Blocks

* Page Head Block
    * Logo Block
    * Main Navigation Block
    * Search Block
* Content Frame Block
    * Page Description Block
        * Streams Block
            * Stream Block
            * Stream Logo Block
            * Stream Description Block
            * Stream Practices Chips Block
            * Stream Menu Block
* Page Menu Block
    * TBD
* Footer Block
    * Footer Desription Block
    * Core Link Block
    * Social Media Link Block

### Elements

* TBD

### Modifiers

* TBD
