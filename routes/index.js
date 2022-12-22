import {Router} from "express";
import routerLogin from "./login.js";
import routerAPI from "./products.js";
import os from "os";

const router = Router();

router.use("/", routerLogin);
router.use("/api", routerAPI);

router.get("/info", (req, res) => {
    res.json({
        cpus: os.cpus().length,
        argv: process.argv.slice(2),
        platform: process.platform,
        version: process.version,
        rss: process.memoryUsage(),
        cwd: process.cwd(),
        pe: process.execPath,
        pid: process.pid,
    })
})

export default router;