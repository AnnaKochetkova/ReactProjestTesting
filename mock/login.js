module.exports = (req, res, next) => {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoibmFtZSJ9.zhVWfNd51GniTcQBF4fB8O81qL5_WoH026q7iIxQxmk';
    switch (req.url) {
        case '/contact':
            if (req.headers.token === token) {
                next();
            } else {
                res.status(401);
                res.json({
                    "error": "Error" 
                })
            }
            break;
        case '/login':
            const { name, password } = req.body;
            if (name === 'name' && password === 'qwe123') {
                res.json({
                    "token_api": token,
                    "name": "name",
                })
            } else {
                res.status(401);
                res.json({
                    "error": "login or password is not correct" 
                })
            }
            break;
        default:
            next();
            break;
    }
}