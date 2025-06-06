import React, { Fragment, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { routes } from "./routes";
import DefaultComponent from "./components/DefaultComponent/DefaultComponent";
import FooterComponent from "./components/FooterComponent/FooterComponent";
import PaymentStatusHandler from "./components/PaymentStatusHandler/PaymentStatusHandler";
import ChatBoxComponent from "./components/ChatBoxComponent/ChatBoxComponent";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="bg-gray-100 min-h-screen">
      <PaymentStatusHandler />
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
      <ChatBoxComponent />
      <ToastContainer />
    </div>
  );
}

export default App;
