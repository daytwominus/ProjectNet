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

    var trans = [
        {   lang:"EN",
            login:"login",
            logout:"log out",
            home:"home",
            profile:"profile",
            library:"library",
            all:"all",
            courses:"courses",
            glossary:"glossary",
            menuplus:"menu+",
            allcontent:"all content",
            usersmanagement: "users management",
            sections:"sections",
            add:"ADD",
            newuser:"+New user"
        },
        {
            lang:"RU",
            login:"войти",
            logout:"выйти",
            home:"дом",
            profile:"профиль",
            library:"библиотека",
            all:"всё",
            courses:"курсы",
            glossary:"глоссарий",
            menuplus:"меню",
            allcontent:"всё содержимое",
            usersmanagement: "управление пользователями",
            sections:"секции",
            add:"ДОБАВИТЬ",
            newuser:"+Добавить пользователя"
        }];

    var lang = "en";

    app.use(function(request, response, next) {

        console.log('>>>>', request.session.lang);
        var lang = request.session.lang || "en";
        localize.setLocale(lang);
        request.session.lang = lang;

        if(lang === "en")
            app.locals.trans = trans[0];

        if(lang === "ru")
            app.locals.trans = trans[1];

        next();
    });

    app.locals.lang = lang;
    app.locals.translate = localize.translate;
    app.locals.localize = localize;
    app.locals.trans = trans[0];
}