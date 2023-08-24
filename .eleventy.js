const pluginBookshop = require("@bookshop/eleventy-bookshop");
const MarkdownIt = require("markdown-it"),
    md = new MarkdownIt({
        html: true,
    });

module.exports = function (eleventyConfig) {
    eleventyConfig.addFilter("markdownify", (markdown) => md.render(markdown));
    eleventyConfig.addPlugin(
        pluginBookshop({
            bookshopLocations: ["_component-library"],
            pathPrefix: "",
        })
    );

  eleventyConfig.addPassthroughCopy("site/assets");


    return {
        dir: {
            input: 'site',
            includes: '_includes',
            layouts: '_includes/layouts',
            output: '_site',
            markdownTemplateEngine: 'njk',
            htmlTemplateEngine: 'njk',
            pages: 'pages',
            uploads: 'assets'
          }
    };
};
