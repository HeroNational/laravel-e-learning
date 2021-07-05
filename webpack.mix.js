const mix = require("laravel-mix");

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel applications. By default, we are compiling the CSS
 | file for the application as well as bundling up all the JS files.
 |
 */

//Eclipse Css
mix.js("resources/js/app.js", "public/js")
    .css("resources/css/eclipse.css", "public/css/", [
        require("postcss-import"),
        require("tailwindcss"),
        require("autoprefixer"),
    ])
    .postCss("resources/css/app.css", "public/css", [
        require("postcss-import"),
        require("tailwindcss"),
        require("autoprefixer"),
    ]).sass("resources/scss/eclipse.scss", "public/scss");
/* .js("resources/js/eclipse.js", "public/js") */ //.sass("resources/scss/eclipse.scss", "public/scss");
