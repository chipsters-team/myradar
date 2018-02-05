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
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Navigation.css';
import Link from '../Link';

class Navigation extends React.Component {
  static propTypes = {
    user: PropTypes.shape({
      id: PropTypes.string,
      email: PropTypes.string,
    }),
  };

  static defaultProps = {
    user: {
      id: '',
    },
  };

  render() {
    const { user } = this.props;
    return (
      <div className={s.root} role="navigation">
        <Link className={s.link} to="/about">
          About
        </Link>
        <Link className={s.link} to="/contact">
          Contact
        </Link>
        <span className={s.spacer}> | </span>
        <span className={s.spacer}> {user ? user.displayName : ''} </span>
        {!user && (
          <span>
            <Link className={s.link} to="/login">
              Log in
            </Link>
            <span className={s.spacer}>or</span>
            <Link className={cx(s.link, s.highlight)} to="/register">
              Sign up
            </Link>
          </span>
        )}
        {user && (
          <Link className={s.link} to="/logout">
            Log out
          </Link>
        )}
      </div>
    );
  }
}

export default withStyles(s)(Navigation);
