# Simple App

## Short description

In this simple application which loads movies, series, cartoons etc. data from OMDB API and displays them in a table with the possibility to view details (by clicking the row) of each element on separate page.

I've used couple technologies which may look a little like "overkill" in such simple application, but I wanted to show that there are many possibilities.

I'm using `react-query` to load data from open API. This library has nice features for fetching and caching data. Developers may easily use hooks from that library instead of repeating the same code each time or creating some custom utilities to get loading or error states. Even though, this library would be enough to keep the data in organized manner in this small app, I've also added `@reduxjs/toolkit` to show other good and popular library to keep a client state in a bigger application in readable way. Redux allows to force on developers to write the code in the same way when and with the "toolkit" there is less boilerplate. It also have `@reduxjs/toolkit/query` which may be an alternative for react-query. As already mentioned, this app is quite simple and it would be enough to organize the whole client state with usage of `React.useState` and some custom hook to avoid keeping the state code directly inside a component. Additionally, I'm using `React.Context` to keep the information about window size, to show that context is a nice way to avoid prop drilling.

I've separated API interfaces (src/api/contracts) and application entities (src/entities), so if in the future anything will be changed in API contract, there will be possibility to either encapsulate the change only inside the entity or propagate it through all app components if needed.

I've added `eslint`, because thanks to this library even during development the code is checked some bugs may be already omitted, also the code will be written in more similar way, so it would be easier during code review to read the code.

I'm using `Tailwind CSS`, to write components styles fast and easily with CSS classes already defined by library, so the developer do not need to write a lot of same CSS code.

I've also added library `react-i18next` for internationalization as nowadays almost always it is good thos have in mind that different translations may be used in the application.

While writing tests, I've used `jest` and `@testing-library/react`, a popular library used to write tests for React apps. I'm also writing test in such a way that it is easier to read what test does (the technique of GIVEN-WHEN-THEN).

## Possible Improvements

It would be good to add full end-to-end tests in `cypress` (or similar library) with most important scenarios.

API errors may be handled in nicer way, also depending if it would be useful to e.g. display more details info for the users.

For basic components (like button or input) I only extracted a common styles into constants, however in bigger application it would be probably more convenient to either build whole shared components or use some library like `Material UI`, `Bootstrap` etc. .

It would be good to dockerize the application as it allows easier deployment to remote environments.

## Getting Started

### Install

First install all dependencies with command `yarn install`.

### Run app

In order to start app, run command `yarn start`, the application will start on port 3000.

### Run tests

In order to start app, run command `yarn test`.
