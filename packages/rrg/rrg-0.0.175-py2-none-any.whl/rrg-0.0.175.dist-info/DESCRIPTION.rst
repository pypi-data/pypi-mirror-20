
Keyczar Use demonstated here - http://www.saltycrane.com/blog/2011/10/notes-using-keyczar-and-python/



/usr/local/bin/python2.7 setup.py install
installs scripts to /usr/local/bin/

Keyczar - efforts from fogtest server

keys built in ~/.keyczar, using virtualenv source ~/envs/p27-dj1.7/bin/activate

run web server
bash-4.3# gunicorn rrg.app:app
[2017-02-06 01:24:04 +0000] [9978] [INFO] Starting gunicorn 19.6.0
[2017-02-06 01:24:04 +0000] [9978] [INFO] Listening at: http://127.0.0.1:8000 (9978)
[2017-02-06 01:24:04 +0000] [9978] [INFO] Using worker: sync
[2017-02-06 01:24:04 +0000] [9991] [INFO] Booting worker with pid: 9991

running the container 

docker run -v /src/python-source:/src/python-source \
    -v /datadir:/datadir \
    -v /keyczar:/keyczar \
    -v /backups:/backups \
    -it --rm  \
    --name flask-test \
    -e RRG_SETTINGS=/src/python-source/sherees-commissions/config/default \
    -e AWS_ACCESS_KEY_ID=AIMF3Q \
    -e AWS_SECRET_ACCESS_KEY=Mojxrd111V \
    -e AWS_BUCKET=php-cluster \
    -e DATADIR=/datadir/rrg \
    -e RRG_PORT=9000 \
    -e MYSQL_SERVER_PORT_3306_TCP_ADDR=12.30.0.251 \
    -e MYSQL_SERVER_PORT_3306_TCP_PORT=3306 \
    -e DB=rrg \
    -e MYSQL_PASS=my_vet_password \
    -e MYSQL_USER=root \
    -e KEYZCAR_DIR=/keyzcar \
    flask-dev /bin/bash


