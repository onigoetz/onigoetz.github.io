/* eslint-disable no-unused-vars */
import React from "react";
import { Link } from "gatsby";
import { Helmet } from "react-helmet";
import { css } from "linaria";
import { styled } from "linaria/react";
/* eslint-enable */

import GitHub from "../../assets/github.svg";
import Twitter from "../../assets/twitter.svg";
import Linkedin from "../../assets/linkedin.svg";
import "../../css/style.css";

const Content = styled.div`
  margin-top: 30px;
`;

const Aside = styled.aside`
  background: #fff;
  box-shadow: 0 0.5px 0 0 #ffffff inset, 0 1px 2px 0 #b3b3b3;
  padding: 1rem 1rem 0 1rem;
  margin: 0 -10px;

  a {
    display: inline-block;
  }

  ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
  }

  ul li {
    font-size: 1.3em;
    display: inline-block;
    margin-right: 1em;
  }

  @media (min-width: 720px) {
    overflow-y: auto;
    overflow-x: hidden;

    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;

    width: 250px;
    margin: 0;
    padding: 15px;
    padding-bottom: 40px;

    a {
      display: block;
    }

    ul {
      margin-bottom: 2em;
    }

    ul li {
      margin-left: 0;
      margin-bottom: 0.5em;
      display: block;
    }
  }
`;

const SocialButtons = styled.div`
  a {
    display: inline-block;
    width: 2rem;
    height: 2rem;
    text-decoration: none;

    opacity: 0.7;
    transition: opacity 500ms;
  }

  a + a {
    margin-left: 1em;
  }

  a:hover {
    opacity: 1;
  }

  @media (min-width: 720px) {
    width: 100%;
    text-align: center;
  }
`;

const Copyright = styled.div`
  text-align: right;
`;

const linkActive = css`
  color: #333;
`;

const FlexContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (min-width: 720px) {
    flex-direction: column;
    align-items: start;
  }
`;

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

        <FlexContainer>
          <ul>
            <li>
              <Link to="/" className="Link" activeClassName={linkActive}>
                Projects
              </Link>
            </li>
            <li>
              <Link to="/blog" className="Link" activeClassName={linkActive}>
                Blog
              </Link>
            </li>
          </ul>

          <SocialButtons>
            <a
              href="https://github.com/onigoetz"
              className="github"
              title="Github Profile"
            >
              <GitHub style={{ fill: "#181717" }} />
            </a>
            <a
              href="http://twitter.com/onigoetz"
              className="twitter"
              title="Twitter Profile"
            >
              <Twitter style={{ fill: "#1DA1F2" }} />
            </a>
            <a
              href="http://ch.linkedin.com/in/stephanegoetz"
              className="linkedin"
              title="LinkedIn profile"
            >
              <Linkedin style={{ fill: "#0077B5" }} />
            </a>
          </SocialButtons>
        </FlexContainer>
      </Aside>

      <Content>{children}</Content>

      <Copyright>&copy; {new Date().getFullYear()} Onigoetz.ch</Copyright>
    </>
  );
};
