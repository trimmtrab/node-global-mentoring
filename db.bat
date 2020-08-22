pg_ctl -D "C:\Program Files\PostgreSQL\12\data" restart
psql -U postgres -d ngm -f .\populateTable.sql