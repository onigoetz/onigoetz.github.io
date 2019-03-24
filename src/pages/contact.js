import React from "react";
import Layout from "../components/Layout";

export default class Projects extends React.Component {
  render() {
    return (
      <Layout title="Contact">
        <h1>Contact</h1>
        <div className="Page">
          <form
            name="contact"
            method="POST"
            data-netlify="true"
            data-netlify-honeypot="bot-field"
            className="Form"
          >
            <p style={{ display: "none" }}>
              <label>
                Don’t fill this out if you're human: <input name="bot-field" />
              </label>
            </p>
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
