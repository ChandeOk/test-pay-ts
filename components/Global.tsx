import { createGlobalStyle } from 'styled-components';
export const GlobalStyles = createGlobalStyle`
*{
  box-sizing:border-box;
  margin:0;
  padding: 0;
}
body {
  background: #efe9e7;
  font-family: 'PT Sans Caption', sans-serif;
}
`;

export const theme = {
  colors: {
    header: '#dae0f2',
  },
};
