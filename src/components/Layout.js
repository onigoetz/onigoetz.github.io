import React from "react";
import { Link } from "gatsby"
import {Helmet} from "react-helmet";

import "../../css/style.css";

export default ({title, children}) => {
    return <>
        <Helmet>
            <title>
                {title ? `${title} · Onigoetz.ch` : `Onigoetz.ch`} 
            </title>
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        </Helmet>
        <div id="wrapper">
            <header>
                <div className="container">
                    <h2>Onigoetz.ch</h2>
                    <p>Some Stuff, sometimes</p>
                    <p>
                        <Link to="/" className="Link" activeClassName="Link--active">Projects</Link> -
                        <Link to="/contact" className="Link" activeClassName="Link--active">Contact</Link> -
                        <Link to="/blog" className="Link" activeClassName="Link--active">Blog</Link>
                    </p>
                </div>
            </header>

            <div className="container content">{children}</div>
        </div>

        <footer className="bs-footer" role="contentinfo">
            <div className="container">
                <div className="social">
                    <div className="buttons">
                        <a href="http://twitter.com/onigoetz" className="twitter" title="Twitter Profile">&nbsp;</a>
                        <a href="http://ch.linkedin.com/in/stephanegoetz" className="linkedin" title="LinkedIn profile">&nbsp;</a>
                        <a href="https://github.com/onigoetz" className="github" title="Github Profile">&nbsp;</a>
                    </div>
                </div>
                <p>&copy; {new Date().getFullYear()} Onigoetz.ch</p>
            </div>
        </footer>
    </>
}