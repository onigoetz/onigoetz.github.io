import React from "react";
import { Link } from "gatsby";
import { Helmet } from "react-helmet";

import "../../css/style.css";

export default ({ title, children }) => {
  return (
    <>
      <Helmet>
        <title>{title ? `${title} · Onigoetz.ch` : `Onigoetz.ch`}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Helmet>
      <aside>
        <h1>Onigoetz.ch</h1>
        <p>Some Stuff, sometimes</p>
        <ul>
          <li>
            <Link to="/" className="Link" activeClassName="Link--active">
              Projects
            </Link>
          </li>
          <li>
            <Link to="/contact" className="Link" activeClassName="Link--active">
              Contact
            </Link>
          </li>
          <li>
            <Link to="/blog" className="Link" activeClassName="Link--active">
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

        <p class="Copyright">&copy; {new Date().getFullYear()} Onigoetz.ch</p>
      </aside>

      <div className="content">{children}</div>
    </>
  );
};
