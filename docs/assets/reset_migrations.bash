rm -R -f ./migrations &&
pipenv run init &&
<<<<<<< HEAD
dropdb -h localhost -U agustin1 example || true &&
createdb -h localhost -U agustin1 example || true &&
psql -h localhost example -U agustin1 -c 'CREATE EXTENSION unaccent;' || true &&
=======
dropdb -h localhost -U jorge example || true &&
createdb -h localhost -U jorge example || true &&
psql -h localhost example -U jorge -c 'CREATE EXTENSION unaccent;' || true &&
>>>>>>> cda70dfdd531346436e871c7373c989ac75271a7
pipenv run migrate &&
pipenv run upgrade
