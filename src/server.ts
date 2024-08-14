import app from "./app";
import { Config } from "./config";
import logger from "./config/logger";
function startServer() {
    const port = Config.PORT;
    try {
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
startServer();
