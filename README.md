# news-app

This app displays a list of headlines and various sources and uses the data from https://newsapi.org/ . The user
will be able to view the different headlines on the home page. When clicking on the headline, the user will be redirected
to a page to display more information. From there, the user can select the different headline in the side panel. There is also
a history option where the user can view all the headlines that he/she visited.

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Lints and fixes files

```
npm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

### Features implemented

Create a Vue.js app & use Vuetify component framework to create the UI - done

Create in a first page the UI displaying the different headlines - done

Create another page using Vue Router displaying more information about a selected headline - done

Create a toolbar in a child functional component linked to each headline. - done

One button will redirect the user to the selected headline page - done

A second button opens a popup/dialog with a text field to modify the headline's title. A validator is expected to prevent the new title to be too long. - done (partly)

Display a history of the visited headlines - done

Show off your CSS skills by making it look good & responsive - done (partly)

Make an API call to this URL https://newsapi.org/v2/top-headlines?country=us&apiKey=API_KEY to get the latest headlines from different sources - done

Show the headlines in the UI - done

Make another API call to this URL https://newsapi.org/v2/sources?apiKey=API_KEY to get the list of sources - done
Allow the user to select a source to display the filtered headlines - done (partly )

Add a search bar to be able to fetch and display only headlines with the included text. You will ll call this URL https://newsapi.org/v2/top-headlines?q=SEARCH_TEXT&apiKey=API_KEY , Please note the api should be called as and when the user types or press the key. - done
Add a spinner when the headlines are fetching - done

Make a wrong API call to this URL https://newsapi.org/v2/sources?apiKey and display an error message - done
Use Vuex for the state management - done
