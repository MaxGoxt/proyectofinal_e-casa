rm -R -f ./migrations &&
pipenv run init &&
dropdb -h localhost -U jorge example || true &&
createdb -h localhost -U jorge example || true &&
psql -h localhost example -U jorge -c 'CREATE EXTENSION unaccent;' || true &&
pipenv run migrate &&
pipenv run upgrade