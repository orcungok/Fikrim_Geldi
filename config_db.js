//.env dosyasına yazdığımız bilgier ile bir config objesi oluşturuyoruz. bu objeyi database'e bağlanırken kullanınız.


const config = {
  db_fg: {
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    database: process.env.DATABASE_NAME,
    password: process.env.DATABASE_PASS,
    port: process.env.DATABASE_PORT,
  },

};

module.exports = config;
