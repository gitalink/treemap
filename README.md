# NYC Treemap

## About the project

This is my Grace Hopper Stackathon project. I had 2 days to work on anything my heart desired. I knew I wanted to explore react-native, and that I wanted to work with data. While browsing the NYC open data portal (https://opendata.cityofnewyork.us/), I came across the 2015 NYC Tree Census dataset (https://dev.socrata.com/foundry/data.cityofnewyork.us/5rq2-4hqu), and knew immediately that I wanted to visualize it. Who would not want to see all the trees on their block, and their names?

## The App

NYC Treemap is a mobile app for New Yorkers who are curious to know more about the trees around them. The app detects the user's location, opens up a map centered around that location, and displays all trees within a mile radius as markers. By hovering on the marker, users can see metadata about the tree, such as common name and latin name.

<img src="https://github.com/gitalink/treemap/blob/master/images/mockup1.png" width="800px"/>
<img src="https://github.com/gitalink/treemap/blob/master/images/mockup2.png" width="800px"/>

## Dataset
https://dev.socrata.com/foundry/data.cityofnewyork.us/5rq2-4hqu

## Tech Stack
- apple maps 
- react native on expo platform 

## Web App Version

I have built a web version of this application, utilizing Mapbox GL JS and vector tiles.
- [new repository](https://github.com/gitalink/trees)
- [live app](https://trees-nine.vercel.app/)

