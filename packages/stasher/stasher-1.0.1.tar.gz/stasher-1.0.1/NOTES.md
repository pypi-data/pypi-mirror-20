STASH_URL=http://localhost:8000 \
STASH_TOKEN=1 \
stash -d push 1 ~/Downloads/bug.png

STASH_URL=http://localhost:8000 \
STASH_TOKEN=1 \
stash -d pull 1 -c 2 -w

dropdb stash; createdb stash

$ DATABASE_URL="postgresql://localhost/stash" DEBUG=1 STASH_SECRET=1 python server.py

$ curl -H "X-Secret: 1" -X POST -F "file=@Downloads/bug.png" "localhost:8000/stash?box=1&key=2"

https://travis-stash.herokuapp.com
366231df81f9d3d348546d2b691c97c1442aecd4

STASH_URL=https://travis-stash.herokuapp.com \
STASH_TOKEN=366231df81f9d3d348546d2b691c97c1442aecd4 \
stash -d push 1 ~/Downloads/bug.png

$ heroku pg:psql
> SELECT id,timestamp,box,name FROM stash ORDER BY timestamp DESC limit 10

$ heroku pg:psql -c "SELECT id,timestamp,box,name FROM stash ORDER BY timestamp DESC limit 10"



https://packaging.python.org/distributing/

MANIFEST.in
setup.cfg (universal)
pip install twine wheel flake8
flake8

python setup.py sdist bdist_wheel
twine upload dist/*


export STASH_URL=https://travis-stash.herokuapp.com
export STASH_TOKEN=366231df81f9d3d348546d2b691c97c1442aecd4
