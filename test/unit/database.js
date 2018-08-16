import mongoose from 'mongoose';
import Config from '../../config/connections';
import dotenv from 'dotenv';
dotenv.load();
const assert = require('chai').assert;

const Promise = require('bluebird');
Promise.promisifyAll(require('mongoose'));
mongoose.Promise = require('bluebird');

describe('Unit Tests - Database ', async function () {

    it('should connect to database', async () => {
        const dbConfig = Config.getDatabaseConfig().environment[process.env.NODE_ENV].config;
        return await mongoose.connectAsync(dbConfig, {useNewUrlParser: true})
            .then(async (result) => {
                assert.isOk(true, 'Connected to the database.');
            }).catch(function (error) {
                assert.isOk(false, `ERROR while trying to connect to database ${error}`);
                return error;
            });
    }).timeout(30000);
});
