module.exports =  {
    name: "fastCrypto",
    version: "1.0.0",
    author: "Can",
    run: async function (password) {
        let pass = md5(password + config.salt.one);
        pass = sha256(pass + config.salt.two);
        return pass;
    }
};