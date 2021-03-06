/**
 * Copyright © 2018-present Chipsters Team. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

/**
 * Passport.js reference implementation.
 * The database schema used in this sample is available at
 * https://github.com/membership/membership.db/tree/master/postgres
 */

import passport from 'passport';
import { Strategy as GitHubStrategy } from 'passport-github2';
import { User, UserLogin, UserClaim, UserProfile } from '../data/models';
import config from '../config';

/**
 * Sign in with GitHub.
 */
passport.use(
  new GitHubStrategy(
    {
      clientID: config.auth.github.clientID,
      clientSecret: config.auth.github.clientSecret,
      callbackURL: config.auth.github.callbackURL,
      scope: config.auth.github.scope,
      passReqToCallback: true,
    },
    (req, accessToken, refreshToken, profile, done) => {
      /* eslint-disable no-underscore-dangle */
      const providerName = 'github';
      const claimType = 'urn:github:access_token';
      const fooBar = async () => {
        if (req.user) {
          const userLogin = await UserLogin.findOne({
            attributes: ['name', 'key'],
            where: { name: profile.provider, key: profile.id },
          });
          if (userLogin) {
            // There is already a GitHub account that belongs to you.
            // Sign in with that account or delete it, then link it with your current account.
            done();
          } else {
            const user = await User.create(
              {
                email: profile._json.email,
                logins: [{ name: providerName, key: profile.id }],
                claims: [{ type: claimType, value: accessToken }],
                profile: {
                  displayName: profile.displayName,
                  picture: profile._json.avatar_url,
                },
              },
              {
                include: [
                  { model: UserLogin, as: 'logins' },
                  { model: UserClaim, as: 'claims' },
                  { model: UserProfile, as: 'profile' },
                ],
              },
            );
            done(null, {
              id: user.id,
              email: user.email,
              displayName: user.profile.displayName,
            });
          }
        } else {
          const users = await User.findAll({
            attributes: ['id', 'email'],
            where: {
              '$logins.name$': profile.provider,
              '$logins.key$': profile.id,
            },
            include: [
              {
                attributes: ['name', 'key'],
                model: UserLogin,
                as: 'logins',
                required: true,
              },
              {
                attributes: ['displayName', 'picture'],
                model: UserProfile,
                as: 'profile',
                required: true,
              },
            ],
          });
          if (users.length) {
            const user = users[0].get({ plain: true });
            done(null, user);
          } else {
            let user = await User.findOne({
              where: { email: profile._json ? profile._json.email : '' },
            });
            if (user) {
              // There is already an account using this email address. Sign in to
              // that account and link it with GitHub manually from Account Settings.
              done(null);
            } else {
              user = await User.create(
                {
                  email: profile._json ? profile._json.email : null,
                  emailConfirmed: profile._json ? !!profile._json.email : false,
                  logins: [{ name: providerName, key: profile.id }],
                  claims: [{ type: claimType, value: accessToken }],
                  profile: {
                    displayName: profile.displayName,
                    picture: profile._json ? profile._json.avatar_url : null,
                  },
                },
                {
                  include: [
                    { model: UserLogin, as: 'logins' },
                    { model: UserClaim, as: 'claims' },
                    { model: UserProfile, as: 'profile' },
                  ],
                },
              );
              done(null, {
                id: user.id,
                email: user.email,
                displayName: user.profile.displayName,
              });
            }
          }
        }
      };
      fooBar().catch(done);
    },
  ),
);

// serialize user into the session
// init();

export default passport;
