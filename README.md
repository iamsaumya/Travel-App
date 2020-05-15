## Travel App

We all do travelling at some point in our life. This application helps you to manage your travel details
. It will look for the Boarding city, Destination City, Date. It will show the expected whether of the destition station on the travel date.


## APIs Used

1. Pixabay
1. GeoNames
1. WeatherBit

###  Architecture of the Project

```shell script
- Root:
  - `package.json`
  - `readme.md`
  - `webpack.dev.js`
  - `webpack.prod.js`
  - src folder
    - server folder
      - `server.js` 
      - `app.js` 
    - client folder
      - `index.js`
      - html/views folder
        - img
          - `background.png`
          - `earth.svg`
        - `index.html`
      - js folder
        - `app.js` 
        - `handleSubmit.js` 
      - styles folder
        - `style.scss` 
        - `footer.scss` 
        - `header.scss` 
        - `reset.scss` 
```

### Install

```shell script
    npm run build-dev
    npm run build-prod
    npm start
```

### References

1. [Initial Inspiration](https://github.com/liminjun/travel-app)
2. [Background](https://www.freepik.com/freepik)
3. [Icons](https://www.flaticon.com/authors/freepik)