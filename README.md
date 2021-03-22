# Meat Cheese Bread (MCB) [![Netlify Status](https://api.netlify.com/api/v1/badges/433a0176-1abf-403b-82ac-6fa7882900bf/deploy-status)](https://app.netlify.com/sites/tcl-16-smart-shopping-list/deploys)

Meat Cheese Bread is a React/Firestore web application that tcl-16 collaborated on as part of The Collab Lab's Winter 2021 cohort. Over an 8-week period we created a “smart” shopping list app that learns your buying habits and helps you remember what you will likely to need to buy on your next trip to the store.

<img width="1326" alt="Multi device mockup of Meat Cheese Bread" src="https://user-images.githubusercontent.com/62153993/111797842-e2222c00-889f-11eb-87f2-a47469b76c57.png">

#### How does it work?
As a user, you will enter items (e.g., “Greek yogurt” or “Paper towels”) into your list. Each time you buy the item, you mark it as purchased in the list. Over time, the app comes to understand the intervals at which you buy different items. If an item is likely to be due to be bought soon, it rises to the top of the shopping list.

#### Want to see more?
Interact with the [live site](https://meatcheesebread.xyz) and/or watch the [video demo](https://youtu.be/nDnrDOTV8zw)! You can join an existing list with: `mark marks swipe`

## Getting Started
### Download Node and NPM
* `npm` is distributed with Node.js which means that when you download Node.js, you automatically get `npm` installed on your computer.
* Follow the [instructions here to install Node.js and `npm`](https://nodejs.org/en/).

### Clone project locally
* On GitHub, click the green "Clone or download" button and copy the web URL.
![screenshot of how to copy the web URL for a GitHub repo](https://cdn.zappy.app/c5fa2c9e72f6cfbd15fb27f4ed2dc898.png)
* From your terminal, `cd` into the directory where you want this project to live.
![screenshot of how to navigate folders in terminal](https://cdn.zappy.app/8a4302d1262bc08fa61e8cd2f3b7c3b8.png)
* Once you’re in the directory, type `git clone` followed by the web URL you just copied to your clipboard from GitHub.
![screenshot of how to git clone](https://cdn.zappy.app/7a9553b7cc4949beecd8db6f32e631a4.png)
* Then navigate into the project by typing `cd` followed by the project directory’s name.
![screenshot of how to cd into the project directory](https://cdn.zappy.app/62e50c2658f91f01b22383d04c5a5e3a.png)

### Update dependencies
* Once you have the project locally and you are in the project directory, you’ll want to update all the project’s dependencies. To do so, type the following into your terminal: `npm update`
![screenshot of npm update in the terminal](https://cdn.zappy.app/b7619c19e38166329334430335746d3b.png)
* Maybe take a sip of coffee or check in on Twitter, this could take a minute -- don’t worry.

### Access the project in your browser
* After you’ve cloned the project locally and updated the dependencies, run the project by typing the following into your terminal: `npm start`. You should be able to see the project at `localhost:3000`

## Features
### User
* Join an existing list (log in)
* Create a new list (sign up)
* Switch lists (sign out)
* See their token to share and re-access their list
* Remain logged in if they never logged out

### List
* If there are no items on the list, prompts the user to add an item
* Add items with the name and how soon they plan on buying them
* Add items only if they are not present on the list (including different punctuation)
* See all of the items on their list
* Items are color-coded and sorted by the estimated number of days until next purchase, with the soonest at top and latest at the bottom except for if its “inactive”. Items with the same number of estimated days until next purchase are sorted alphabetically.
* When updating the item as "purchased", updates last purchase date and marks as "purchased" for 24 hours 
* Learns overtime when the user should anticipate when to buy items on their list based on how many times the user bought it and the intervals between purchase dates
* Delete items from the list

## Tech Stack
* [React](https://reactjs.org)
* [Google's Firestore](https://firebase.google.com/products/firestore)
* [SASS](https://sass-lang.com)

## Tools
* [react-firebase-hooks](https://github.com/CSFrequency/react-firebase-hooks)
* [React Router](https://reacttraining.com/react-router/web/guides/quick-start)
* [Sweet Alert](https://sweetalert.js.org)

## Contributors
<table>
  <tr>
    <td align="center">
      <a href="https://github.com/thekidnamedkd">
        <img src="https://avatars.githubusercontent.com/u/65736142?s=400&u=e2368bbd8c9e9490904579c72d06767a1b8b329b&v=4" width="200px;" alt=""/><br/>
        <sub><b>Kevin Davis</b></sub>
      </a>         
    </td>
  <td align="center">
      <a href="https://github.com/wlcreate">
        <img src="https://avatars0.githubusercontent.com/u/62153993?s=460&v=4" width="200px;" alt=""/><br/><sub><b>Waverley Leung</b></sub>
      </a>         
    </td>
    <td align="center">
        <a href="https://github.com/jessicasalbert">
            <img src="https://avatars.githubusercontent.com/u/66483878?s=400&u=3d103f9e42b19bfe18fb4b817ac148dc639acf39&v=4" width="200px;" alt=""/><br/>
            <sub><b>Jessica Salbert</b></sub>
        </a>         
    </td>
    <td align="center">
        <a href="https://github.com/Maeesha-Rahman">
            <img src="https://avatars.githubusercontent.com/u/46036289?s=400&v=4" width="200px;" alt=""/><br/>
            <sub><b>Maeesha Rahman</b></sub>
        </a>         
    </td>
  </tr>
</table>

## Acknowledgements
We would like to thank:
* Eddie Solar
* Melina Mejía Bedoya
* Skyler Shaw
* Andrew Hedges
* Stacie Taylor
* TCL Winter 2021 Cohort
* everyone at The Collab Lab  
