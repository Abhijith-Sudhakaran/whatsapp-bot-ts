import pool from "./pool";

export const createStudyTable = async () => {
  await pool.query(
    `CREATE TABLE IF NOT EXISTS studynews(
      news TEXT PRIMARY KEY
    );`
  );
};

export const storeNewsStudy = async (news: string): Promise<boolean> => {
  try {
    await pool.query("INSERT INTO studynews VALUES($1);", [news]);

    return true;
  } catch (err) {
    // console.log(err);
    return false;
  }
};
