userAuth = (req, res, next) => {
    const headers = req.headers;

    const authHeader = headers.authorization;

    if(!authHeader){
        return res.status(401).json({
            data:"Not authorized",
        });
    }    
const authToken = authHeader.split(" ")[1];

    if (!authToken) {
        return res.status(401).json({
            data:"Not authorized",
        });
    }

    next();
    
};

module.exports = userAuth;