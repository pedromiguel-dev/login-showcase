import allowedOrigins from "../config/allowedOrigins";

// @ts-ignore
const credentials = (req, res, next) => {
    const origin = req.headers.origin;
    console.log(origin)
    if (allowedOrigins.includes(origin) || !origin) {
        res.header("Access-Control-Allow-Origin", true);
    }

    next();
}

export default credentials;