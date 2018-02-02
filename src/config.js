/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

/* eslint-disable max-len */

if (process.env.BROWSER) {
  throw new Error(
    'Do not import `config.js` from inside the client-side code.',
  );
}

module.exports = {
  // Node.js app
  port: process.env.PORT || 3000,

  // API Gateway
  api: {
    // API URL to be used in the client-side code
    clientUrl: process.env.API_CLIENT_URL || '',
    // API URL to be used in the server-side code
    serverUrl:
      process.env.API_SERVER_URL ||
      `http://localhost:${process.env.PORT || 3000}`,
  },

  // Database
  databaseUrl: process.env.DATABASE_URL || 'sqlite:database.sqlite',

  // Web analytics
  analytics: {
    // https://analytics.google.com/
    googleTrackingId: process.env.GOOGLE_TRACKING_ID, // UA-XXXXX-X
  },

  // Authentication
  auth: {
    jwt: { secret: process.env.JWT_SECRET || 'React Starter Kit' },

    // https://developer.github.com/v3/
    github: {
      clientID: process.env.GITHUB_APP_CLIENT_ID || '8a026c40582cd80356e1',
      clientSecret:
        process.env.GITHUB_APP_CLIENT_SECRET ||
        '947f0f72028ea1b204406e028900260b05a88509',
      callBackURL: '/login/github/callback',
      scope: ['read:user'],
    },

    // https://developers.facebook.com/
    facebook: {
      id: process.env.FACEBOOK_APP_ID || '902934803200718',
      secret:
        process.env.FACEBOOK_APP_SECRET || '3b2e9c38cbd19375172a5547319cdd6b',
      callBackURL: 'http://127.0.0.1:3000/login/facebook/callback',
    },

    // https://cloud.google.com/console/project
    google: {
      id:
        process.env.GOOGLE_CLIENT_ID ||
        '238407403217-7qudnd9ap1avstn5t7vorog9dem8l3i3.apps.googleusercontent.com',
      secret: process.env.GOOGLE_CLIENT_SECRET || 'MdfB6pZoT2Ey1Uf-mq3XT5vW',
      callBackURL: 'http://127.0.0.1:3000/login/google/callback',
    },

    // https://apps.twitter.com/
    twitter: {
      key: process.env.TWITTER_CONSUMER_KEY || 'ltzBuQKIQSx5KwXYYGhLH7jXp', // 'Ie20AZvLJI2lQD5Dsgxgjauns',
      secret:
        process.env.TWITTER_CONSUMER_SECRET ||
        'Tw53Xou2VImipVsoNkinghVz4d9BJbi6NqY7TFVLek2cNc5Sb8',
      // 'KTZ6cxoKnEakQCeSpZlaUCJWGAlTEBJj0y2EMkUBujA7zWSvaQ',
      callBackURL: '/login/twitter/callback',
    },
  },
};
