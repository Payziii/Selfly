import { DatabaseSync } from 'node:sqlite';

const db = new DatabaseSync(process.env.DB_PATH);

db.exec('PRAGMA foreign_keys = ON;');

db.exec(`
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL UNIQUE,
        bio TEXT
    );

    CREATE TABLE IF NOT EXISTS user_widgets (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        widget_type TEXT NOT NULL,
        config TEXT NOT NULL DEFAULT '{}',
        position INTEGER NOT NULL DEFAULT 0
    );
    CREATE INDEX IF NOT EXISTS idx_user_widgets_user ON user_widgets(user_id);

    CREATE TABLE IF NOT EXISTS user_files (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        file_type TEXT NOT NULL CHECK (file_type IN ('avatar')),
        extension TEXT NOT NULL,
        data TEXT NOT NULL 
    );
    CREATE INDEX IF NOT EXISTS idx_user_files_user ON user_files(user_id);

    CREATE TABLE IF NOT EXISTS linked_accounts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        provider TEXT NOT NULL,    -- 'github', 'telegram', 'duolingo' и т.д.
        provider_user_id TEXT,     -- id аккаунта у провайдера, если есть
        provider_username TEXT,    -- username у провайдера
        extra TEXT,                -- JSON: доп. кэш-данные (кол-во подписчиков и т.п.)
        UNIQUE(user_id, provider)
    );
    CREATE INDEX IF NOT EXISTS idx_linked_accounts_user ON linked_accounts(user_id);
`);

export default db;