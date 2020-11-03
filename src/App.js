import { Route, BrowserRouter } from "react-router-dom";

import Header from "./components/Header";
import Employees from "./components/Employees";
import "./App.css";
import AddEmployee from "./components/AddEmployee";
import Skills from "./components/Skills";
import UpdateSkill from "./components/UpdateSkill";
import UpdateEmployee from "./components/UpdateEmployee";
import AddSkills from "./components/AddSkills";

const routes = [
  { path: "/", component: Employees },
  { path: "/employees", component: Employees },
  { path: "/skills", component: Skills },
  { path: "/add_employee", component: AddEmployee },
  { path: "/update_skill", component: UpdateSkill },
  { path: "/update_employee", component: UpdateEmployee },
  { path: "/add_skill", component: AddSkills },
];

function App() {
  return (
    <BrowserRouter>
      <div className='App'>
        <Header />
        {routes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            exact
            render={(props) => <Page component={route.component} {...props} />}
          />
        ))}
      </div>
    </BrowserRouter>
  );
}

const Page = (props) => {
  const Component = props.component;
  return <Component {...props} />;
};

export default App;
