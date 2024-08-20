/**
 * @type {import('next-sitemap').IConfig}
 * @see https://github.com/iamvishnusankar/next-sitemap#readme
 */
module.exports = {
  siteUrl: 'https://github.com/andrewdean1',
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [{ userAgent: '*', allow: '/' }],
  },
};
