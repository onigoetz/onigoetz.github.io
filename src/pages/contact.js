import React from "react";
import Layout from "../components/Layout";

export default class Projects extends React.Component {
    render() {
        return <Layout title="Contact">
            <div className="well">
                <iframe 
                    title="Contact Form"
                    frameborder="0" 
                    src="http://www.123contactform.com/jsform_intermediate.html?url=js-form-username-377202.html&amp;xdm_e=http%3A%2F%2Fwww.onigoetz.ch&amp;xdm_c=default7500&amp;xdm_p=1" 
                    height="650"
                    width="100%"
                ></iframe>
            </div>
        </Layout>
    }
}