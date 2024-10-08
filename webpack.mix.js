const mix = require("laravel-mix");
const tailwindcss = require("tailwindcss");
const CKEStyles = require("@ckeditor/ckeditor5-dev-utils").styles;
const CKERegex = {
    svg: /ckeditor5-[^/\\]+[/\\]theme[/\\]icons[/\\][^/\\]+\.svg$/,
    css: /ckeditor5-[^/\\]+[/\\]theme[/\\].+\.css/
};
require("laravel-mix-alias");

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

Mix.listen("configReady", webpackConfig => {
    const rules = webpackConfig.module.rules;
    const targetSVG = /(\.(png|jpe?g|gif|webp)$|^((?!font).)*\.svg$)/;
    const targetFont = /(\.(woff2?|ttf|eot|otf)$|font.*\.svg$)/;
    const targetCSS = /\.css$/;

    for (let rule of rules) {
        if (rule.test.toString() === targetSVG.toString()) {
            rule.exclude = CKERegex.svg;
        } else if (rule.test.toString() === targetFont.toString()) {
            rule.exclude = CKERegex.svg;
        } else if (rule.test.toString() === targetCSS.toString()) {
            rule.exclude = CKERegex.css;
        }
    }
});

mix.alias({
    "@": "/resources/app",
    "~": "/resources/app",
    "@components": "/resources/app"
});

mix.js("resources/app/main.js", "public/dist/js")
    .sass("resources/app/assets/sass/app.scss", "public/dist/css")
    .options({
        processCssUrls: false,
        postCss: [tailwindcss("./tailwind.config.js")]
    })
    .autoload({
        "cash-dom": ["cash"]
    })
    .webpackConfig({
        module: {
            rules: [
                {
                    test: CKERegex.svg,
                    use: ["raw-loader"]
                },
                {
                    test: CKERegex.css,
                    use: [
                        {
                            loader: "style-loader",
                            options: {
                                injectType: "singletonStyleTag",
                                attributes: {
                                    "data-cke": true
                                }
                            }
                        },
                        {
                            loader: "postcss-loader",
                            options: CKEStyles.getPostCssConfig({
                                themeImporter: {
                                    themePath: require.resolve(
                                        "@ckeditor/ckeditor5-theme-lark"
                                    )
                                },
                                minify: true
                            })
                        }
                    ]
                }
            ]
        }
    })
    .browserSync({
        proxy: "midone-vue-laravel.test",
        files: ["resources/**/*.*"]
    });
