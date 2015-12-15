var passwordHash = require('password-hash');

module.exports = {
    hashPwd:function(plain){
        var hashedPassword = passwordHash.generate('password123');

        console.log(hashedPassword);

        return hashedPassword;
    },

    verify:function(hash, plain){
        return passwordHash.verify(plain, hash);
    }
}