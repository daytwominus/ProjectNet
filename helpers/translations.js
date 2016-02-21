var Localize = require('localize');

module.exports = function (app){

    var trans = [
        {   lang:"RU",
            login:"sign in",
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
            newuser:"+New user",
            signup:"signup",
            signin:"Sign In",
            loginname: "Login",
            displayname: "Display Name",
            password:"Password",
            search:"Search",
            students:"Students",
            multimedia:"Multimedia",
            backtotop:"Back to Top",
            permalink:"permalink"
        },
        {
            lang:"EN",
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
            newuser:"+Добавить пользователя",
            signup:"регистрация",
            signin:"Войти",
            loginname: "Логин",
            displayname: "Имя",
            password:"Пароль",
            search:"Поиск",
            students:"Студенты",
            multimedia:"Мультимедиа",
            backtotop:"Вверх",
            permalink:"постоянная ссылка"
        }];

    var lang = "en";

    app.use(function(request, response, next) {
        var lang = request.session.lang || "en";
        request.session.lang = lang;

        if(lang === "en")
            app.locals.trans = trans[0];

        if(lang === "ru")
            app.locals.trans = trans[1];

        next();
    });

    app.locals.lang = lang;
    app.locals.trans = trans[0];
}