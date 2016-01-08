var Localize = require('localize');

module.exports = function (app){

    var localize = new Localize({
        "home": {
            "en": "home",
            "ru": "дом"
        },
        "profile": {
            "en": "Profile",
            "ru": "профиль"
        },
        "library": {
            "en": "library",
            "ru": "библиотека"
        },
        "all": {
            "en": "all",
            "ru": "всё"
        },
        "courses": {
            "en": "courses",
            "ru": "курсы"
        },
        "glossary": {
            "en": "glossary",
            "ru": "глоссарий"
        },
        "menu+": {
            "en": "menu+",
            "ru": "меню+"
        },
        "all content": {
            "en": "all content",
            "ru": "всё содержимое"
        },
        "users management": {
            "en": "users management",
            "ru": "управление пользователями"
        },
        "sections": {
            "en": "sections",
            "ru": "секции"
        }
    });

    app.use(function(request, response, next) {

        var lang = request.session.lang || "en";
        localize.setLocale(lang);
        //console.log(request.session);
        request.session.lang = lang;
        next();
    });

    app.locals.translate = localize.translate;
}