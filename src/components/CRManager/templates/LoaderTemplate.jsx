import React from "react";

import Sidenav from "../Sidenav";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

const LoaderTemplate = ({ title, content }) => {
  return (
    <div >
      <div >
        <Sidenav />
      </div>
      <div className="main-content">
        <div className="header">
          <div className="title">{title}</div>
          
        </div>
        <hr />
        <div >
          <div >
            <Loader type="Audio" color="#897eff" height={100} width={100} />
            <p>
              {content} {title}s...
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoaderTemplate;
