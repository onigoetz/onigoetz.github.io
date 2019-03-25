 /* eslint-disable no-unused-vars */
import React from "react";
import { Link } from "gatsby";
import { Helmet } from "react-helmet";
import { css } from "linaria";
import { styled } from "linaria/react";
 /* eslint-enable */

import "../../css/style.css";

const Content = styled.div`
  margin-top: 30px;
`;

const Aside = styled.aside`
  background: rgba(255, 255, 255, 0.8);

  a {
    display: block;
  }

  ul {
    list-style-type: none;
    margin: 0;
    margin-bottom: 2em;
    padding: 0;
  }

  ul li {
    font-size: 1.3em;
    margin-bottom: 0.3em;
  }

  @media (min-width: 720px) {
    & {
      overflow-y: auto;
      overflow-x: none;

      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;

      width: 250px;
      padding: 15px;
      padding-bottom: 40px;
    }
  }
`;

const Copyright = styled.div`
text-align: right;
`

const linkActive = css`
  color: #333;
`

export default ({ title, children }) => {
  return (
    <>
      <Helmet>
        <title>{title ? `${title} · Onigoetz.ch` : `Onigoetz.ch`}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Helmet>
      <Aside>
        <h1>Onigoetz.ch</h1>
        <p>Some Stuff, sometimes</p>
        <ul>
          <li>
            <Link to="/" className="Link" activeClassName={linkActive}>
              Projects
            </Link>
          </li>
          <li>
            <Link to="/contact" className="Link" activeClassName={linkActive}>
              Contact
            </Link>
          </li>
          <li>
            <Link to="/blog" className="Link" activeClassName={linkActive}>
              Blog
            </Link>
          </li>
        </ul>

        <ul className="SocialButtons">
          <li>
            <a
              href="https://github.com/onigoetz"
              className="github"
              title="Github Profile"
            >
              GitHub
            </a>
          </li>
          <li>
            <a
              href="http://twitter.com/onigoetz"
              className="twitter"
              title="Twitter Profile"
            >
              Twitter
            </a>
          </li>
          <li>
            <a
              href="http://ch.linkedin.com/in/stephanegoetz"
              className="linkedin"
              title="LinkedIn profile"
            >
              Linkedin
            </a>
          </li>
        </ul>
      </Aside>

      <Content>{children}</Content>

      <Copyright>&copy; {new Date().getFullYear()} Onigoetz.ch</Copyright>
    </>
  );
};
