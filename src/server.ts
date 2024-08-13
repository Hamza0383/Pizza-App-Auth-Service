import app from "./app";
import { Config } from "./config";

function startServer() {
    const port = Config.PORT;

    try {
        // eslint-disable-next-line no-console
        app.listen(port, () => console.log(`server is runing at port ${port}`));
    } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);
        process.exit(1);
    }
}
startServer();
