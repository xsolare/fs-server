docker pull dpage/pgadmin4
docker run -p 80:80 \
    -e 'PGADMIN_DEFAULT_EMAIL=pgadmin4@gmail.com' \
    -e 'PGADMIN_DEFAULT_PASSWORD=pgadmin4' \
    -d \
    --name pgadmin4 \
    dpage/pgadmin4
