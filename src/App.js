import Header from "./components/header";
import Tasks from "./components/Tasks";

function App() {
  // const name = 'BraLaryea'
  return (
    <div className="container">
      {/* <Header title='Task Tracker from Appjs page' /> */}
      <Header />
      <Tasks />
      {/* <h1>hello {name}</h1> */}
    </div>
  );
}

export default App; 
