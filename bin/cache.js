const logger = require('../src/utils/Logger');
const redis = require('redis');
const config = require('../config/connections').CacheConfig();
const PORT = config.environment[process.env.NODE_ENV].port;
const HOST = config.environment[process.env.NODE_ENV].host;
const client = redis.createClient(PORT, HOST);
const asyncRedis = require("async-redis");
const asyncRedisClient = asyncRedis.decorate(client);

/**
 * cache data in the app.
 */
client.on('connect', function () {
    logger.info('Cache connected successfully');
});

client.on("error", function (err) {
    logger.error(`Error during cache connection ${err}`);
});

exports.writeRedisKey = async function (keyRedis, value) {
    await asyncRedisClient.set(keyRedis, value);
    asyncRedisClient.expire(keyRedis, 3600);
};

exports.readRedisKey = async function (keyRedis) {
    let result = await asyncRedisClient.get(keyRedis);
    return ((!result || result === "null") ? null : result);
};

exports.deleteRedisKey = async function (keyRedis) {
    await asyncRedisClient.del(keyRedis);
};

