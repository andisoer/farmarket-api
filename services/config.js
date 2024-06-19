const config = {
  db: {
    /* don't expose password or any sensitive info, done only for demo */
    // host: 'farmarket-db.c3em8uegcnl8.ap-southeast-1.rds.amazonaws.com',
    // host: 'localhost',
    // host: '103.147.154.173',
    host: 'mysql-d782290-farmarket-db.d.aivencloud.com',
    // port: '3306',
    port: '21443',
    // user: 'digiappc_farmarket_user',
    user: 'avnadmin',
    // user: 'root',
    // password: '1234567890',
    password: 'BLBJ=*T8HJQ_',
    // password: 'AVNS_SRJUIBJuD4igWNfBlKB',
    // database: 'digiappc_farmarket_db',
    database: 'defaultdb',
    // database: 'farmarket_db',
    connectTimeout: 10000,
  },
  listPerPage: 10,
};

export default config;
