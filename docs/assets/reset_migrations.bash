rm -R -f ./migrations &&
pipenv run init &&
dropdb -h localhost -U agustin1 example || true &&
createdb -h localhost -U agustin1 example || true &&
psql -h localhost example -U agustin1 -c 'CREATE EXTENSION unaccent;' || true &&
pipenv run migrate &&
pipenv run upgrade
