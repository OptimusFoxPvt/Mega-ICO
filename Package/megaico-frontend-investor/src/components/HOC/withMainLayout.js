import React from "react";
// import Header from "../layout/Header/Header";
import Footer from "../layout/Footer/Footer";
import SideBar from "../layout/SideBar/SideBar";
import TopBar from "../layout/TopBar/TopBar";
const withMainLayout = (WrappedComponent) => {
  const WithMain = (props) => {
    return (
      <div style={{ overflow: "hidden" }}>
        {" "}
        <div className="row">
          <div className="col-lg-2">
            <SideBar />
          </div>
          <div className="col-lg-10">
            {/* <Header /> */}
            <TopBar />

            <WrappedComponent {...props} />
            <Footer />
          </div>
        </div>
      </div>
    );
  };

  return WithMain;
};

export default withMainLayout;
