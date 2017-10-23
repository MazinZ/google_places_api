## Setting up the project
From the zenefits_project directory:

$ `npm install -g gulp`
$ `npm install && bower install`
$ `gulp`
$ `open index.html`

## Ideas for improvement

I left a few things out to keep the scope of this task small. Here are a couple areas where this could be built upon:

- **Building out the mobile experience.** For this task I focused only on the desktop experience.
- **Anchor scrolling** in the sidebar list when a list item's corresponding marker is clicked. Or, better yet, a detail view that appears when a marker/list item is selected.
- **More clearly indicate ability to scroll** in the sidebar list. One way to do this is to add more content in each list item to make the visual cut off of the bottom item a bit more noticeable.
- **Pagintion** to view more results in manageable quantities. Currently, a max of 20 results are shown.
- **Loading indicators**
  - When fetching results
  - When initializing the map. Currently, the search bar is disabled to prevent interaction before the map is initialized. This should be communicated to the user and a loading indicator would one way to do so.
- **Handling more user cases**
  - Communicate to user that no results were found.
- **Tests**
