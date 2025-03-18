import React, { Fragment, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { routes } from "./routes";
import DefaultComponent from "./components/DefaultComponent/DefaultComponent";
import FooterComponent from "./components/FooterComponent/FooterComponent";

function App() {
  return (
    <div className="bg-gray-100 min-h-screen">
      <Router>
        <Routes>
          {routes.map((route) => {
            const Page = route.page;
            const Layout = route.isShowHeader ? DefaultComponent : Fragment;
            const ShowFooter = route.isShowFooter ? FooterComponent : Fragment;
            if (route.path && typeof route.path === "string") {
              return (
                <Route
                  key={route.path}
                  path={route.path}
                  element={
                    <Layout>
                      <Page />
                      <ShowFooter />
                    </Layout>
                  }
                />
              );
            }
            return null;
          })}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
