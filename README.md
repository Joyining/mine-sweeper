# mine-sweeper
Created with CodeSandbox

**Demo Link**
https://codesandbox.io/s/mine-sweeper-vs2zj

**Built With**
* [react 17.0.1](https://www.npmjs.com/package/react)
* [styled-components 5.2.1](https://styled-components.com/)
* [TypeScript](https://www.typescriptlang.org/)

**Code Structure**
* /src/components
1. In components folder you can find Container and Square. Square is a presentation component while Container is more like a container component.
2. Square receives props in order to render the UI correctly. There is no complex data logic here. I use react.memo to optimize the performance. Since SquareProps is an object, to avoid unnecessary re-render, I specified the re-render condition with react.memo.
3. Container component handles more complex logic and interactions. And it also manages all the important game data. However I think it takes too many tasks now. I should take some part out from it. (For example the Actions component.)
* /src/libs
1. I put some re-usable logics, or logics which are not related to react states here. 
