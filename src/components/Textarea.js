import { styled } from "linaria/react";

export default styled.textarea`
  border: 1px solid #bbb;
  width: 100%;
  border-radius: 2px;
  padding: 0.3rem 0.5rem;

  &:focus {
    box-shadow: 0 0 2px #03a9f4;
  }
`;
