import React from 'react';
import { Link } from 'gatsby';

import { rhythm, scale } from '../utils/typography';
import Social from './social';

const Layout = (props: any) => {
  const { location, title, children } = props;
  // @ts-ignore
  const rootPath = `${__PATH_PREFIX__}/`;
  let header;

  if (location.pathname === rootPath || location.pathname === '/projects') {
    header = (
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'start',
          alignItems: 'center',
        }}
      >
        <img
          src="https://raw.githubusercontent.com/matchilling/gatsby-remark-emojis/master/resource/image/32/notebook.png"
          style={{
            ...scale(1.8),
          }}
        />
        <h1
          className={'big-title'}
          style={{
            marginLeft: '1rem',
            marginTop: 0,
            letterSpacing: '3px',
          }}
        >
          <Link
            style={{
              boxShadow: `none`,
              textDecoration: `none`,
              color: `inherit`,
            }}
            to={`/`}
          >
            {title}
          </Link>
        </h1>
      </div>
    );
  } else {
    header = (
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'start',
          alignItems: 'center',
        }}
      >
        <img src="https://raw.githubusercontent.com/matchilling/gatsby-remark-emojis/master/resource/image/32/notebook.png" />
        <h3
          className={'big-title'}
          style={{
            // fontFamily: `Playfair Display, serif`,
            marginLeft: '1rem',
            marginTop: 0,
            letterSpacing: '3px',
          }}
        >
          <Link
            style={{
              boxShadow: `none`,
              textDecoration: `none`,
              color: `inherit`,
            }}
            to={`/`}
          >
            {title}
          </Link>
        </h3>
      </div>
    );
  }
  return (
    <div
      style={{
        backgroundColor: 'var(--bg)',
        color: 'var(--textNormal)',
        transition: 'color 0.2s ease-out, background 0.2s ease-out',
      }}
    >
      <div
        style={{
          marginLeft: `auto`,
          marginRight: `auto`,
          maxWidth: rhythm(24),
          padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
        }}
      >
        <header>{header}</header>
        <main>{children}</main>
        <footer>
          <Social />
          <a href="https://aminroslan.com" target="_blank">
            aminroslan.com
          </a>
          <br />
          <span>
            © {new Date().getFullYear()}, Built with blood and sweat from my
            fingers.
          </span>
        </footer>
      </div>
    </div>
  );
};
export default Layout;
