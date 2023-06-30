docker run -d \
  -h redis \
  -e REDIS_PASSWORD=gg \
  -v redis-data:/data \
  -p 6379:6379 \
  --name rediska \
  --restart always \
  redis:latest /bin/sh -c 'redis-server --appendonly yes --requirepass ${REDIS_PASSWORD}'
