const pluginBookshop = require("@bookshop/eleventy-bookshop");

module.exports = function (eleventyConfig) {
    eleventyConfig.htmlTemplateEngine = "liquid";
    eleventyConfig.addPlugin(
        pluginBookshop({
            bookshopLocations: ["_component-library"],
            pathPrefix: "",
        })
    );

    return {
        dir: {
            input: 'site',
            includes: '_includes',
            data: "_data",
            output: '_site',
            pages: 'pages'
        },
        markdownTemplateEngine: 'njk',
        htmlTemplateEngine: 'njk'
    };
};
