
module.exports = function(router){
    router.get('/lang', function(req, res, next) {
        var lang = req.session.lang;
        console.log('current language: ', JSON.stringify(req.session.lang));
        if(lang === 'en')
            lang = 'ru';
        else
            lang = 'en';

        req.session.lang = lang;
        console.log('now language is: ', JSON.stringify(req.session.lang));
        res.send(lang);

        //next();
    });
};