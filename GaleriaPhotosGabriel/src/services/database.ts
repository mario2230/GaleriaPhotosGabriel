import {
  CapacitorSQLite,
  SQLiteConnection,
  SQLiteDBConnection,
} from "@capacitor-community/sqlite";

const dbName = "AlbumGaleria";
let db: SQLiteDBConnection | null = null;
let initialized = false;

const sqliteConnection = new SQLiteConnection(CapacitorSQLite);

async function ensureDatabase() {
  if (initialized && db) {
    return;
  }

  if (!db) {
    db = await sqliteConnection.createConnection(
      dbName,
      false,
      "no-encryption",
      1,
      false,
    );
  }

  await db.open();

  await db.execute(`
    CREATE TABLE IF NOT EXISTS usuarios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    login TEXT NOT NULL UNIQUE,
    senha TEXT NOT NULL
    );

    `);


    initialized = true;
}

function getDb() {
    if (!db) {
        throw new Error("Banco de dados ainda não inicializado");
    }

    return db;
}

export async function initDatabase() {
    try {
        await ensureDatabase();
    } catch(error) {
        console.error("Erro ao inicia DB", error);
        throw error;
    }
}

export async function addUsuario(nome: string, login: string, senha: string) {
    await ensureDatabase();

    const query = `INSERT INTO usuarios (nome, login, senha)
    VALUES (?, ?, ?);`;

    await getDb().run(query, [nome, login, senha])
}


export async function listUsuarios() {
    await ensureDatabase();

    const result = await getDb().query(`SELECT * FROM usuarios;`);

    return result.values || [];
}

export async function updateUsuario(id: number, nome: string,
    login: string, senha: string
) {
    await ensureDatabase();

    const query = `UPDATE usuarios
    SET nome = ?, login = ?, senha = ?
    WHERE id = ?;`;

    await getDb().run(query, [nome, login, senha, id])
}


export async function deleteUsuario(id: number) {
    await ensureDatabase();

    const query = `DELETE FROM usuarios WHERE id = ?;`

    return await getDb().run(query, [id]);
}


export async function realizarLogin(login: string, senha: string) {
    await ensureDatabase();

    const result = await getDb().query(
    `
    SELECT *
    FROM usuarios
    WHERE login = ?
      AND senha = ?;
    `,
    [login.trim().toLowerCase(), senha],
    )

    return result.values || [];
}

export async function findUsuarioById(id: number) {
  await ensureDatabase();

  const query = `
    SELECT * FROM usuarios
    WHERE id = ?;
  `;

  const result = await getDb().query(query, [id]);
  return result.values || [];
}
