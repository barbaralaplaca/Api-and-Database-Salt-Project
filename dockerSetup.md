## A few words on the Docker setup for the databases

This section is more if you want to know how the Docker stuff works internally.

In order to this to be reasonable to do in a weekend, and to only focus on the access code rather than the setup - we have created a `docker-compose.yml` file for you. This file will create the environment you will need:

* A PostGres server on port 5432
  * There's a single database, with a single table `salt_products`, seeded with all the products you will need for the exercise
  * You can use `pgAdmin` (installed on your computers) to access the database
  * The data is stored in `./data/psql`, in the same directory as this repository. And is not checked-in...
* A MongoDb server on the normal port, 27017
  * There's no database or collections created, these will be created for you as you write to the collection the first time
  * You can use `Robo 3T` (installed on your computers) to view and manipulate the documents
  * The data is stored in `./data/mongdb`, in the same directory as this repository. And is not checked-in...

### Credentials and .env files

We have supplied credentials for the databases in separate `.env` files. This is a good practice to ensure that secrets doesn't leak into the source code.

What is NOT a good practice is to check-in the `.env` files as we have done here. But that's the best way that I've found to share this with you.

* Mongo credentials found in `./containerConfig/mongodb.env`
* PSql credentials found in `./containerConfig/psql.env`

### Docker scripts

There are 3 scripts in the `package.json` file to help you handle the docker environment:

* `docker:init` - to be run the first time you start the environment. This script will remove the `./data/` directory, initialize the databases with seed data, and then start up both databases
* `docker:start` - starts  the environment without resetting the databases
* `docker:close` - shuts the docker environment down