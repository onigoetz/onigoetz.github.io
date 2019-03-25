import { styled } from "linaria/react";

export default styled.article`
  position: relative;
  min-width: 0;
  word-wrap: break-word;
  background-color: #fff;
  background-clip: border-box;
  box-shadow: 0 0.5px 0 0 #ffffff inset, 0 1px 2px 0 #b3b3b3;
  border-radius: 0.25rem;

  margin-bottom: 1.5rem;
`;

export const CardItem = styled.div`
  padding: 1.25rem;

  & + & {
    padding-top: 0;
  }

  > *:last-child {
      margin-bottom: 0;
  }
`;
