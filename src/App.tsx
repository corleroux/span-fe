import "./App.css";
import { NavProvider } from "./context/NavContext";
import { Landing } from "./components/Landing";
import { TopicsProvider } from "./context/TopicsContext";
import { TopicProvider } from "./context/TopicContext";

function App() {
  const val: any[] = [];
  return (
    <NavProvider>
      <TopicsProvider value={val}>
        <TopicProvider>
          <Landing />
        </TopicProvider>
      </TopicsProvider>
    </NavProvider>
  );
}

export default App;
