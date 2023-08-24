const pluginBookshop = require("@bookshop/eleventy-bookshop");
const { DateTime } = require("luxon");
const emojiReadTime = require("@11tyrocks/eleventy-plugin-emoji-readtime");
const { wordCountCallback } = require("./site/js/wordCount");
const MarkdownIt = require("markdown-it"),
    md = new MarkdownIt({
        html: true,
    });

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
