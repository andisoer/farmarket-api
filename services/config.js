const config = {
  db: {
    /* don't expose password or any sensitive info, done only for demo */
    // host: 'farmarket-db.c3em8uegcnl8.ap-southeast-1.rds.amazonaws.com',
    // host: 'localhost',
    host: '170.187.228.163',
    // host: 'localhost',
    port: '3306',
    user: 'digiappc_farmarket_user',
    // user: 'root',
    // password: '1234567890',
    password: 'BLBJ=*T8HJQ_',
    database: 'digiappc_farmarket_db',
    // database: 'farmarket_db',
    connectTimeout: 10000,
  },
  listPerPage: 10,
};

export default config;
