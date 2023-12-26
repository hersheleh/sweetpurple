## Sweetgreen coding challenge
This is a basic e-commerce application built to implement three requirements:
1. Allow the user to view a menu at two different locations.
2. Allow the user to add an item from the menu to a shopping cart.
3. Allow the user to reach a checkout page displaying items from the bag and a sub-total.

### Installing and running the project
Instructions for running the application on [localhost:3000](http://localhost:3000)
#### Requirements
Make sure you have [Node.js](https://nodejs.org/en) version 18.17.0 or later installed on you machine. [Nextjs](https://nextjs.org) requires at least this version to run.
### Instructions

#### Install
```bash
# clone the repo
git clone https://github.com/hersheleh/sweetpurple.git

# cd into the directory
cd sweetpurple

# install dependencies
npm install
```
#### Run
```bash
# run the development server
npm run dev
```
#### Test
```bash
# run the tests
npm run test
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the project.

### Prompts

#### A paragraph about why you picked the language/framework you did.
This app is built using React, Nextjs, Typescript, and vitest. I decided to make a fully front-end application to make running the app simple. I chose Typescript both as a learning exercise and because type annotation helps make the app more robust and makes it more clear what your intentions are with the code. Typescript also opens up features of your code editor and linter which reduces typos and mistakes and makes discovering methods and properties easier. I chose Nextjs because it was the top framework suggested on the Reactjs website which may indicate something about its robustness and usability. I chose React because it's a wide spread and popular framework and this project seemed like a good excuse to delve deeper into it's functionality. I chose vitest for unit testing because I read that it is easier to configure and run than jest.

#### A paragraph about how it works? What is going on behind the scenes?

This e-commerce application is built using React. The app is split into 3 pages. And each page is responsible for managing the state and functionality of each of the 3 features laid out in the requirements. In designing the app I wanted it to be as easy as possible to add new locations and menus. The menus at each location may differ by the items availale and the price. In order to minimize repetition and have a single source of truth I decided to have a json file of `all the produce` offered with the name being a key into the default description, price, and calories of the item. Each `menu` is a json file containing the sections of the menu and the items offered at that location. The store owner can override the default price of an item by adding it to the menu of a particular location. The owner can then add the location to the app by adding an entry to the `menu_location_data.ts` file. All the data for the app is located in the `src/data` directory. To persist the state of the application, I save the current location and the cart to the browser's localStorage under the 'current_location' and 'cart' key respectively. When a page is loaded it retrives these keys and uses them to set it's state.

#### A paragraph about how you approached solving this problem.

The first challenge I ran into in designing this project was to figure out how to manage the state of the application. There are two state objects to worry about: the current state of the user's cart, and the menu for the selected location. In keeping with the React philosophy I tried to componentize the features as much as possible. So I decided that the `Add to Cart` button and the `Shopping Cart Counter` would each be components. I initially thought that the state of the shopping cart should be inside those components, however in reading the React documentation they suggest ["lifting the state up"](https://react.dev/learn/sharing-state-between-components#lifting-state-up-by-example) to the nearest parent. Since the `Shopping Cart Counter` was in the `Header` and the `Add to Cart` button was inside the `Menu Item` component this meant that the state needed to be managed at the top level of the application. This didn't feel very componentized to me so I looked into other solutions such as using a [Reducer](https://react.dev/learn/extracting-state-logic-into-a-reducer) and a [Context](context). However these solutions seemed possibly over-engineered and after reading Reacts [guidelines on using context](https://react.dev/learn/passing-data-deeply-with-context#before-you-use-context) the idea that the state should be managed at the top level started to make more sense. I ultimately implemented the state at the top level using [prop drilling](https://react.dev/learn/passing-data-deeply-with-context#the-problem-with-passing-props). The next challenge was trying to reconcile the react philosophy on state management and compontization with the architecture of Nextjs. Nextjs is a javascript framework which has both a front and back end component. Nextjs's [App Router](https://nextjs.org/docs/app/building-your-application/routing) automatically creates routes when page.jsx files are put into folders in the `app` directory, and layout.jsx files are used to share layout among pages. Initially I thought to put the state management in the top level layout file, however these layout files are not meant to handle state. Since React sees the DOM as a tree, and each page represents an entire tree in itself, each page would need to manage the `cart` and `location` state at its top level. There is a rule of 3 when it comes to keeping code [DRY](https://en.wikipedia.org/wiki/Don't_repeat_yourself) and this app repeats this pattern exactly 3 times. I think if another page is added it makes sense to refactor this application to use [Reducer and Context](https://react.dev/learn/scaling-up-with-reducer-and-context) to make it easier to implement pages.

### A paragraph about how you might extend this if you were building a more robust instance of the same application.

I hope that using Typescript adds a level of robustness to the code as it minimizes bugs and ensures that type errors are handled gracefully. However there are other considerations. I did not add any exception handling to the code and I'm not familiar with how exception handling is meant to be used with React components, but having good errors and exceptions in your code makes it much easier for developers to understand how to use and maintain your software. One of the other glaring issues is that it's very easy for a user to mess with the application by changing the localStorage values in the browser. Some level of validation of these values would help to make the application more robust or better yet storing this data on an authenticated server instead of on the client. Lastly, I added unit tests for each of the components and the checkout page. Basically anywhere that the code had some logic or functionality. The Home and Menu pages don't really have functionality outside of displaying components, managing stae, and routing to other pages. All of these features would need to be mocked so I don't know what I would really be testing. However it might be good to write tests for these pages even with mocks just to make sure nothing is wrong.
