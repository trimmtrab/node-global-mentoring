CREATE TABLE IF NOT EXISTS users
(
  id text PRIMARY KEY,
  login text,
  password text,
  age integer,
  is_deleted boolean
);

INSERT INTO users (id, login, password, age, is_deleted)
VALUES
  ('c7494d91-4201-4ceb-86c5-6e7a828df742', 'test1', 'admin', 21, false),
  ('e5996d91-c749-4bbe-8be9-ed05344b4c2f', 'test2', 'admin', 21, false),
  ('53156934-8436-46db-9930-5e9fa42d0e61', 'test3', 'admin', 21, false),
  ('02b30d34-860f-410d-8370-8d816cfd653c', 'bad_guy', 'admin', 21, false)
ON CONFLICT DO NOTHING;