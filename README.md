# traveltile_2

## content
git clone https://github.com/yingw787/traveltile_open_source.git
npm install
replace postgreSQL url in config/applicationConfig.js with your postgreSQL url
replace Google Maps API key in public/js/config/apiKeys.js with your Google Maps API key
replace FileStack API key in public/js/models/EditorTilesModel.js with your FileStack API key
npm start

## client
To run:
git clone https://github.com/yingw787/traveltile_2.github
git checkout --track origin/devel
npm install
npm run start

go to https://localhost:8080 to see it in action!

## server
To run:
Install Postgres.app and ensure $PATH is properly set in .bash_profile
cd traveltile_2/server
npm install

psql -f traveltile.sql
npm start

test GET all tiles:
go to browser, type in http://localhost:3000/api/tiles

test GET one tile:
go to browser, type in http://localhost:3000/api/tiles/id, where id is an integer and valid id

test POST one tile:
curl --data "notes=Hi&itinerary={5/5/2016}" http://127.0.0.1:3000/api/tiles

test PUT:
curl -X PUT --data "notes=Hi&itinerary={5/5/2016}" http://127.0.0.1:3000/api/tiles/id,
where id is an integer and valid id

test DELETE
curl -X DELETE http://127.0.0.1:3000/api/tiles/id,
where id is an integer and valid id
