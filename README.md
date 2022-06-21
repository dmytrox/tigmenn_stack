# TIG stack plus MongoDB, ElasticSearch, Node.js and Nginx (tigmenn_stack)

To run the app install docker engine on your machine and just type this command in your terminal:

```
docker-compose up --build -d
```

Open URL **http://127.0.0.1:3000/** and navigate to the dashboard.

Then to test it open this URL **http://localhost/** and press **Start** button.


## Tests

For testing purpouse was created while loop with 1k iteration of storing records to the MongoDB and searching in ElasticSearch

### Without load
![photo_2022-06-21_19-58-29](https://user-images.githubusercontent.com/39772493/174856366-72e32aeb-7867-49fa-839a-39773e71e39a.jpg)

### With load 
![photo_2022-06-21_19-58-23](https://user-images.githubusercontent.com/39772493/174856552-df1030c3-f9a1-4a40-978c-ba0d248e20aa.jpg)
