import app from "./app";
import { Config } from "./config";
import { AppDataSource } from "./config/data-source";
import logger from "./config/logger";
async function startServer() {
    const port = Config.PORT;
    try {
        await AppDataSource.initialize();
        logger.info("Database connection successfully");
        app.listen(port, () => logger.info(`server is runing at port ${port}`));
    } catch (error) {
        if (error instanceof Error) {
            logger.error(error.message);
            setTimeout(() => {
                process.exit(1);
            }, 1000);
        }
    }
}
void startServer();
