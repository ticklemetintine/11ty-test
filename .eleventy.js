const pluginBookshop = require("@bookshop/eleventy-bookshop");
const MarkdownIt = require("markdown-it"),
    md = new MarkdownIt({
        html: true,
    });

module.exports = function (eleventyConfig) {
   
    eleventyConfig.htmlTemplateEngine = "njk";
    eleventyConfig.addPlugin(
        pluginBookshop({
            bookshopLocations: ["component-library"],
            pathPrefix: "",
        })
    );
    eleventyConfig.ignores.add("site/schemas");
    eleventyConfig.addPassthroughCopy("site/css");
    eleventyConfig.addPassthroughCopy("site/fonts");
    eleventyConfig.addPassthroughCopy("site/images");
    eleventyConfig.addPassthroughCopy("site/js");
    eleventyConfig.addPassthroughCopy("site/vendor");
    
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
