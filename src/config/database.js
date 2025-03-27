import mysql from "mysql2/promise";
import { env } from "./environment.js";

class DatabaseConnection {
  constructor() {
    this.pool = mysql.createPool({
      host: env.DB_HOST,
      user: env.DB_USER,
      port: parseInt(env.DB_PORT),
      password: env.DB_PASSWORD,
      database: env.DB_NAME,
      connectionLimit: 10,
      queueLimit: 0,
      waitForConnections: true,
    });
  }

  async query(sql, params = []) {
    try {
      const [rows] = await this.pool.execute(sql, params);
      return rows;
    } catch (error) {
      console.error("Database Query Error:", error);
      throw new Error("Database query failed");
    }
  }

  async getConnection() {
    return await this.pool.getConnection();
  }
}

export default new DatabaseConnection();
