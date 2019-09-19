import React from 'react';
import { Link } from 'gatsby';
import { ThemeToggler } from 'gatsby-plugin-dark-mode';

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
          justifyContent: 'space-between',
        }}
      >
        <h1
          className={'big-title'}
          style={{
            ...scale(1.8),
            marginBottom: rhythm(1.5),
            marginTop: 0,
            fontFamily: `Playfair Display, serif`,
            letterSpacing: '3px',
            textShadow:
              '-1.5px -1.5px 0 #000, 1.5px -1.5px 0 #000, -1.5px 1.5px 0 #000, 1.5px 1.5px 0 #000',
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
          justifyContent: 'space-between',
        }}
      >
        <h3
          className={'big-title'}
          style={{
            fontFamily: `Playfair Display, serif`,
            marginTop: 0,
            letterSpacing: '3px',
            textShadow:
              '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000',
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
        {/* <ThemeToggler>
          {({ theme, toggleTheme }) => (
            <label
              style={{
                marginBottom: rhythm(1.5),
                display: 'flex',
                alignSelf: 'center',
              }}
              className="switch"
            >
              <input
                type="checkbox"
                onChange={e => toggleTheme(e.target.checked ? 'dark' : 'light')}
                checked={theme === 'dark'}
              />
              <span className="slider round" />
            </label>
          )}
        </ThemeToggler> */}
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
