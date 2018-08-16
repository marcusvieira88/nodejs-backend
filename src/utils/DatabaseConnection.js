import InternalServerError from "../errors/InternalServerError";
import config from "../../config/connections";
import logger from "./Logger";
import mongoose from "mongoose";

export default class DatabaseConnection {

    /**
     * Connect to the database
     */
    connect() {
        const dbConfig = config.getDatabaseConfig().environment[process.env.NODE_ENV].config;
        mongoose.connect(dbConfig, {useNewUrlParser: true});

        const db = mongoose.connection;

        db.on('open', () => {
            logger.info(`Connected to the database env: ${process.env.NODE_ENV}`);
        });

        db.on('error', (error) => {
            logger.error(`Database connection error: ${error}`);
            throw new InternalServerError(`Database error: ${error}`);
        });

        // If the Node process ends, close the Mongoose connection
        process.on('SIGINT', this.disconnect()).on('SIGTERM', this.disconnect());
    }

    /**
     * Disconnect to the database
     */
    disconnect() {
        return function () {
            mongoose.connection.close(function () {
                logger.info(`Mongoose default connection with DB env: ${process.env.NODE_ENV} is disconnected through app termination`);
                process.exit(0);
            });
        };
    }
}



