module.exports = function (eleventyConfig) {
    // Pass through static assets
    eleventyConfig.addPassthroughCopy("src/css");
    eleventyConfig.addPassthroughCopy("src/js");
    eleventyConfig.addPassthroughCopy("src/images");
    eleventyConfig.addPassthroughCopy("src/fonts");
    eleventyConfig.addPassthroughCopy("src/robots.txt");
    eleventyConfig.addPassthroughCopy("src/ads.txt");

    // Add date filter
    eleventyConfig.addFilter("date", function (date, format) {
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    });

    // Add slug filter
    eleventyConfig.addFilter("slug", function (str) {
        return str.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
    });

    // Collections
    eleventyConfig.addCollection("concepts", function (collectionApi) {
        return collectionApi.getFilteredByGlob("src/lexicon/concept/*.md");
    });

    eleventyConfig.addCollection("reports", function (collectionApi) {
        return collectionApi.getFilteredByGlob("src/reports/*.md");
    });

    eleventyConfig.addCollection("framework", function (collectionApi) {
        return collectionApi.getFilteredByGlob("src/framework/*.md");
    });

    return {
        dir: {
            input: "src",
            output: "dist",
            includes: "_includes",
            data: "_data"
        },
        templateFormats: ["njk", "md", "html"],
        htmlTemplateEngine: "njk",
        markdownTemplateEngine: "njk"
    };
};
