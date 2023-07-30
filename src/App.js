import { Dashboard } from "./Components/Dashboard";
import Lawyer from "./Components/Laywer";
import GlobalCss from "./GlobleStyle/globalCss";
import { ThemeConsumer } from "./GlobleStyle/ThemeConsumer";

function App() {
  return (
    <ThemeConsumer>
      <GlobalCss />
      <Dashboard>
        <Lawyer />
      </Dashboard>
    </ThemeConsumer>
  );
}

export default App;
