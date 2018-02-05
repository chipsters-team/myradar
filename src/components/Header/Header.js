/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Header.css';
import Link from '../Link';
import Navigation from '../Navigation';
import logoUrl from './logo-small.png';
import logoUrl2x from './logo-small@2x.png';

class Header extends React.Component {
  static contextTypes = {
    user: PropTypes.shape({
      id: PropTypes.string,
      email: PropTypes.string,
    }),
  };

  getContext() {
    return { user: this.state.user };
  }

  render() {
    return (
      <div className={s.root}>
        <div className={s.container}>
          <Navigation user={this.context.user} />
          <Link className={s.brand} to="/">
            <img
              src={logoUrl}
              srcSet={`${logoUrl2x} 2x`}
              width="38"
              height="38"
              alt="React"
            />
            <span className={s.brandTxt}>Your Company</span>
          </Link>
          <div className={s.banner}>
            <h1 className={s.bannerTitle}>My Tech Radar</h1>
            <h3>
              Olá {this.context.user ? this.context.user.displayName : ''}
            </h3>
            <p className={s.bannerDesc}>
              View, plan, progress and fun yourself with tech
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Header);
