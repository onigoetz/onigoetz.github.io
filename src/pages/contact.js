import React from "react";
import Layout from "../components/Layout";

export default class Projects extends React.Component {
  render() {
    return (
      <Layout title="Contact">
        <div className="Page">
          <h2>Contact</h2>
          <form
            name="contact"
            method="post"
            data-netlify="true"
            data-netlify-honeypot="bot-field"
            className="Form"
          >
            <div className="Form__field">
              <label htmlFor="name">Name</label>
              <input className="Input" type="text" name="name" id="name" />
            </div>
            <div className="Form__field">
              <label htmlFor="email">Email</label>
              <input className="Input" type="text" name="email" id="email" />
            </div>
            <div className="Form__field">
              <label htmlFor="message">Message</label>
              <textarea
                className="Textarea"
                name="message"
                id="message"
                rows="6"
              />
            </div>
            <ul className="Form__actions">
              <input
                className="Button Button--secondary"
                type="reset"
                value="Clear"
              />{" "}
              <input className="Button" type="submit" value="Send Message" />
            </ul>
          </form>
        </div>
      </Layout>
    );
  }
}
