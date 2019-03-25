import { styled } from "linaria/react";

const variants = {
  primary: {
    backgroundColor: "#03A9F4",
    color: "#fff"
  },
  secondary: {
    backgroundColor: "#ddd",
    color: "#333"
  }
};

export default styled.button`
  appearance: none;
  cursor: pointer;
  display: inline-block;
  text-align: center;
  text-decoration: none;
  transition: background-color .2s ease-in-out,box-shadow .2s ease-in-out,color .2s ease-in-out;
  white-space: nowrap;

  font-size: 1.2rem;
  height: 2.5em;
  line-height: 0.8em;
  padding: .3em .5em;
  border-radius: 2px;

  border: 1px solid rgba(0,0,0, 0.1);

  background: ${props => variants[props.variant || "primary"].backgroundColor};
  color: ${props => variants[props.variant || "primary"].color};
`;
