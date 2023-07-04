// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = {
  siteName: 'Stakr',
  siteDescription: 'My staking tool.',
//  siteUrl: 'https://lotc.netlify.app/',
  plugins: [
    {
      use: 'gridsome-source-google-sheets',
      options: {
        sheetId: '1nkLLWA6MCc4ymtUHs2u1w3zAr9qJmHs_u9Z6NVWD7ow', 
        apiKey: 'AIzaSyC-HcU62pZ0OrtvhxUn6eXwI3AzSWTgObU',
        //route: '/:id', //Optional - omit if not using routes
        type: 'Shop', //Optional - default is googleSheet. Used for graphql queries.
      }
    },
    {
      use: 'gridsome-source-google-sheets',
      options: {
        sheetId: '1DEIUWaMak01nJCwiYrEkF3nEHPwnRq1dLJksOgClnhY', 
        apiKey: 'AIzaSyC-HcU62pZ0OrtvhxUn6eXwI3AzSWTgObU',
        //route: '/:id', //Optional - omit if not using routes
        type: 'Record', //Optional - default is googleSheet. Used for graphql queries.
      }
    },
    {
      use: 'gridsome-plugin-modal'
    }
  ]
}
