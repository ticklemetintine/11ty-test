const pluginBookshop = require("@bookshop/eleventy-bookshop");
const MarkdownIt = require("markdown-it"),
    md = new MarkdownIt({
        html: true,
    });

module.exports = function (eleventyConfig) {
    eleventyConfig.addFilter("markdownify", (markdown) => md.render(markdown));
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
            pages: 'pages'
        },
        markdownTemplateEngine: 'liquid',
        htmlTemplateEngine: 'liquid'
    };
};
