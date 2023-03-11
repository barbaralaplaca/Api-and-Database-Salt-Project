/* global db */
db.createUser(
  {
    user: 'saltadmin',
    pwd: 'episalt',
    roles: [
      {
        role: 'readWrite',
        db: 'saltcarts',
      },
    ],
  },
);
