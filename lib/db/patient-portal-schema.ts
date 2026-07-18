/**
 * Patient Portal database schema — creates tables for clinic accounts,
 * patient accounts, and survey responses in the local SQLite database.
 */

import Database from "better-sqlite3";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const DB_PATH = path.join(process.cwd(), "data", "opera_local.db");

let _db: Database.Database | null = null;

export function getDb(): Database.Database {
  if (!_db) {
    try {
      _db = new Database(DB_PATH);
      _db.pragma("journal_mode = WAL");
      _db.pragma("foreign_keys = ON");
      initSchema(_db);
    } catch {
      // Serverless (Netlify/Lambda): the deploy filesystem is read-only, so
      // copy the bundled DB to the instance's writable tmp dir. Writes persist
      // only for the life of the instance — fine for the demo portal; real
      // clinic accounts move to Dynamo.
      const tmpPath = path.join(os.tmpdir(), "opera_local.db");
      if (!fs.existsSync(tmpPath)) fs.copyFileSync(DB_PATH, tmpPath);
      _db = new Database(tmpPath);
      _db.pragma("journal_mode = MEMORY");
      _db.pragma("foreign_keys = ON");
      initSchema(_db);
    }
  }
  return _db;
}

function initSchema(db: Database.Database) {
  db.exec(`
    CREATE TABLE IF NOT EXISTS clinic_accounts (
      id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
      clinic_name TEXT NOT NULL,
      clinic_address TEXT NOT NULL,
      clinic_phone TEXT,
      clinic_email TEXT NOT NULL UNIQUE,
      clinic_logo_url TEXT,
      password_hash TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS patient_accounts (
      id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
      clinic_id TEXT NOT NULL REFERENCES clinic_accounts(id),
      first_name TEXT NOT NULL,
      last_name TEXT NOT NULL,
      email TEXT NOT NULL,
      date_of_birth TEXT NOT NULL,
      phone TEXT,
      access_code TEXT NOT NULL,
      video_url TEXT,
      video_title TEXT,
      treatment_type TEXT,
      consulting_provider TEXT,
      consultation_date TEXT,
      video_watched BOOLEAN DEFAULT 0,
      video_watched_at DATETIME,
      video_watch_duration_seconds INTEGER DEFAULT 0,
      survey_completed BOOLEAN DEFAULT 0,
      survey_completed_at DATETIME,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      UNIQUE(email, clinic_id)
    );

    CREATE TABLE IF NOT EXISTS patient_videos (
      id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
      patient_id TEXT NOT NULL REFERENCES patient_accounts(id),
      clinic_id TEXT NOT NULL REFERENCES clinic_accounts(id),
      video_url TEXT,
      video_title TEXT,
      treatment_type TEXT NOT NULL,
      provider_notes TEXT,
      render_job_id TEXT,
      render_status TEXT DEFAULT 'pending' CHECK(render_status IN ('pending', 'rendering', 'completed', 'failed')),
      render_started_at DATETIME,
      render_completed_at DATETIME,
      render_error TEXT,
      duration_seconds INTEGER,
      watched BOOLEAN DEFAULT 0,
      watched_at DATETIME,
      watch_duration_seconds INTEGER DEFAULT 0,
      is_active BOOLEAN DEFAULT 1,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS survey_responses (
      id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
      patient_id TEXT NOT NULL REFERENCES patient_accounts(id),
      clinic_id TEXT NOT NULL REFERENCES clinic_accounts(id),
      q_consultation_clarity INTEGER NOT NULL CHECK(q_consultation_clarity BETWEEN 1 AND 5),
      q_comfort_level INTEGER NOT NULL CHECK(q_comfort_level BETWEEN 1 AND 5),
      q_staff_friendliness INTEGER NOT NULL CHECK(q_staff_friendliness BETWEEN 1 AND 5),
      q_video_helpfulness INTEGER CHECK(q_video_helpfulness BETWEEN 1 AND 5),
      q_understanding_before INTEGER CHECK(q_understanding_before BETWEEN 1 AND 5),
      q_understanding_after INTEGER CHECK(q_understanding_after BETWEEN 1 AND 5),
      q_video_would_recommend BOOLEAN,
      q_most_helpful_resource TEXT CHECK(q_most_helpful_resource IN (
        'in_person_consultation',
        'personalized_video',
        'written_materials',
        'online_research',
        'friend_family',
        'other'
      )),
      q_likelihood_to_proceed INTEGER NOT NULL CHECK(q_likelihood_to_proceed BETWEEN 1 AND 10),
      q_primary_concern TEXT CHECK(q_primary_concern IN (
        'cost',
        'time_commitment',
        'pain_discomfort',
        'unsure_if_needed',
        'want_second_opinion',
        'no_concerns',
        'other'
      )),
      q_additional_feedback TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS api_keys (
      id TEXT PRIMARY KEY,
      key_prefix TEXT NOT NULL,
      key_hash TEXT NOT NULL UNIQUE,
      org_name TEXT NOT NULL,
      org_id TEXT,
      rate_limit_per_minute INTEGER NOT NULL DEFAULT 10,
      rate_limit_per_day INTEGER NOT NULL DEFAULT 500,
      is_active BOOLEAN NOT NULL DEFAULT 1,
      last_used_at DATETIME,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // Migration: per-clinic API key for the public video-generation API
  const clinicCols = db
    .prepare("PRAGMA table_info(clinic_accounts)")
    .all() as { name: string }[];
  if (!clinicCols.some((c) => c.name === "api_key")) {
    db.exec("ALTER TABLE clinic_accounts ADD COLUMN api_key TEXT");
  }
  if (!clinicCols.some((c) => c.name === "specialties")) {
    db.exec("ALTER TABLE clinic_accounts ADD COLUMN specialties TEXT");
  }
}
