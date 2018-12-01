# systematic

a higher-order design system

```js
module.exports = {
  settings: {
    // version of your design system
    version: '0.1.2',

    // add !important to all CSS rules
    important: true,

    // add default namespace
    namespace: true,
    // no namespace
    namespace: false,
    // customize namespacing
    namespace: {
      prefix: 'hi-',
      parentClass: 'parent',
      peerClass: 'wow'
    }
  },

  colors: {
    primary: '#fa4040'
  }
};
```
