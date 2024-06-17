const config = {
  db: {
    /* don't expose password or any sensitive info, done only for demo */
    host: 'localhost',
    user: 'root',
    password: '1234567890',
    database: 'farmarket_db',
    connectTimeout: 60000,
  },
  listPerPage: 10,
};

export default config;
