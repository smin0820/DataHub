import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { GlobalStyle } from "@styles/global";
import { theme } from "@styles/theme";
import RootNavigation from "@routes/RootNavigation";
import { RecoilRoot } from "recoil";

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <RecoilRoot>
          <RootNavigation />
        </RecoilRoot>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
