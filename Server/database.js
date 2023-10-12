const sql = require("mssql");

const config = {
  user: "HYF-DIGITAL",
  password: "HYF@DIGITAL01",
  server: "localhost",
  database: "naiapi",
  options: {
    encrypt: false,
    trustServerCertificate: true,
  },
};

const isConnected = async () => {
  try {
    await sql.connect(config);
    return "Connected to MSSQL database";
  } catch (error) {
    return "MSSQL database connection error:" + error;
  }
};

const getTankAll = async (pagination, type) => {
  const { page, perPage } = pagination;
  const typeFormat = type == "null" || type == "All" ? null : type;
  try {
    const pool = await sql.connect(config);
    const result = await pool
      .request()
      .input("skip", (page - 1) * perPage)
      .input("take", perPage)
      .input("type", typeFormat) //can be null
      .query(
        `SELECT * FROM tank where (@type IS NULL OR type = @type) ORDER BY id OFFSET @skip ROWS FETCH NEXT @take ROWS ONLY`
      );
    const count = await pool
      .request()
      .input("type", typeFormat) //can be null
      .query(
        `SELECT count(id) FROM tank where (@type IS NULL OR type = @type)`
      );
    return { result: result, count: count.recordset[0][""] };
  } catch (error) {
    return "MSSQL database connection error:" + error;
  }
};
const getTankAll2 = async () => {
  try {
    const pool = await sql.connect(config);
    const result = await pool.query(`SELECT * FROM tank ORDER BY id`);
    return result;
  } catch (error) {
    return "MSSQL database connection error:" + error;
  }
};

const getTypeGroup = async () => {
  try {
    const pool = await sql.connect(config);
    const result = await pool.query(
      `SELECT type FROM tank group by type ORDER BY type`
    );
    return result;
  } catch (err) {
    return err;
  }
};

module.exports = {
  sql,
  isConnected,
  getTankAll,
  getTypeGroup,
  getTankAll2,
};
