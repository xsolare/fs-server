```bash
docker run  \
    -d --name my-mongodb \
    -p 27017:27017 \
    -v /my-mongodb-data:/data/db \
    -v ./mongo.conf:/etc/mongo/mongo.conf \
    -e MONGO_INITDB_ROOT_USERNAME=root \
    -e MONGO_INITDB_ROOT_PASSWORD=root \
    -e MONGO_INITDB_DATABASE=fs \
    mongo:latest --config /etc/mongo/mongo.conf
```
