import React from "react";
import Layout from "../components/Layout";

import Button from "../components/Button";
import Card, { CardItem } from "../components/Card";
import Input from "../components/Input";
import Textarea from "../components/Textarea";
import { FormField, FormActions } from "../components/Form";

export default class Projects extends React.Component {
  render() {
    return (
      <Layout title="Contact">
        <h1>Contact</h1>
        <Card>
          <CardItem>
            <form
              name="contact"
              method="POST"
              data-netlify="true"
              data-netlify-honeypot="bot-field"
              className="Form"
            >
              <p style={{ display: "none" }}>
                <label>
                  Don’t fill this out if you're human:
                  <input name="bot-field" />
                </label>
              </p>
              <FormField>
                <label htmlFor="name">Name</label>
                <Input type="text" name="name" id="name" />
              </FormField>
              <FormField>
                <label htmlFor="email">Email</label>
                <Input type="text" name="email" id="email" />
              </FormField>
              <FormField>
                <label htmlFor="message">Message</label>
                <Textarea name="message" id="message" rows="6" />
              </FormField>
              <FormActions>
                <Button variant="secondary" type="reset">Clear</Button>{" "}
                <Button type="submit">Send Message</Button>
              </FormActions>
            </form>
          </CardItem>
        </Card>
      </Layout>
    );
  }
}
