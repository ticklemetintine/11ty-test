const pluginBookshop = require("@bookshop/eleventy-bookshop");
const MarkdownIt = require("markdown-it"),
    md = new MarkdownIt({
        html: true,
    });

module.exports = function (eleventyConfig) {
   
    eleventyConfig.htmlTemplateEngine = "njk";
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
