this is a base nodejs project template

'src' -> Inside the src folder all the actual source code for project will reside, this will not include any tests

Inside src folder : 

config -> In this folder anything and everything regarding any configurations or setup of a library or module will be done. For example: setting up dotenv so that we can use the environment variables anywhere in a cleaner fashion, this is done in the server-config.js. One more example can be to setup you logging library that can help you to prepare meaningful logs, so configuration for this library should also be done here.

routes -> In the routes folder, we register a route and the corresponding middleware and controllers to it.

middlewares -> they are just going to intercept the incoming requests where we can write our validators, authenticators etc.

controllers -> they are kind of the last middlewares as post them you call you business layer to execute the budiness logic. In controllers we just receive the incoming requests and data and then pass it to the business layer, and once business layer returns an output, we structure the API response in controllers and send the output.

repositories -> this folder contains all the logic using which we interact the DB by writing queries, all the raw queries or ORM queries will go here.

services -> contains the buiness logic and interacts with repositories for data from the database

utils -> contains helper methods, error classes etc.

Setup the project
Download this template from github and open it in your favourite text editor.
Go inside the folder path and execute the following command:
npm install
In the root directory create a .env file and add the following env variables

    PORT=<port number of your choice>
ex:

    PORT=3000
go inside the src folder and execute the following command:

  npx sequelize init
By executing the above command you will get migrations and seeders folder along with a config.json inside the config folder.

If you're setting up your development environment, then write the username of your db, password of your db and in dialect mention whatever db you are using for ex: mysql, mariadb etc

If you're setting up test or prod environment, make sure you also replace the host with the hosted db url.

To run the server execute

node index.js

🚀 Description
Flight-Service manages all flight-related core data:

City, Airport, Airplane, Flight, Seat
Implements robust repository-service-controller patterns with Type-safe validation and structured logging.

🌐 Tech Stack
Node.js + Express

Sequelize ORM + MySQL

Winston for logging

RabbitMQ for inter-service messaging

🔧 Setup Instructions
bash
Copy
Edit
git clone https://github.com/JeevithP/Flight-service
cd Flight-service
npm install
Create .env with:

ini
Copy
Edit
PORT=3000
DB_USERNAME=...
DB_PASSWORD=...
DB_NAME=...
DB_HOST=...
Run migrations:

bash
Copy
Edit
npx sequelize db:migrate
Start server:

bash
Copy
Edit
npm run dev
📦 API Endpoints
City

GET /api/v1/cities

POST /api/v1/cities

PATCH /api/v1/cities/:id

Airport, Airplane, Flight

CRUD endpoints with /api/v1/airports, .../airplanes, /api/v1/flights

Complex filtering for flights with parameters like trips, price, travellers, tripDate, and sort

Seat Management

PATCH /api/v1/flights/:id/seats to increment/decrement seat count
