const wp = require('@cypress/webpack-preprocessor');

module.exports = (on) => {
  const options = {
    webpackOptions: {
      resolve: {
        extensions: ['.ts', '.js'],
      },
      module: {
        rules: [
          {
            test: /\.ts$/,
            exclude: [/node_modules/],
            use: [{
              loader: 'ts-loader',
            }],
          },
        ],
      },
    },
  };
  on('file:preprocessor', wp(options))

  on('task', {
    // deconstruct the individual properties
    getAccessToken ({ oAuthToken }) {
      return new Promise((resolve,reject)=>{
      var request = require('request');

      request.post({
        url:'https://secure-model.transamerica.com/mga/sps/oauth/oauth20/token',
         form: {
         grant_type: 'authorization_code',
         code: oAuthToken,
         client_id: 'yodlee',
         client_secret: 'foo123',
        },
      }, function(err,httpResponse,body){ 
        if (err) {reject(err);}
        resolve(body);
      })
    });
    }
  })
};
