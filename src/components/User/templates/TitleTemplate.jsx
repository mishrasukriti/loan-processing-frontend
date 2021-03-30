import React from "react";


const TitleTemplate = ({ title}) => {
  return (
    <React.Fragment>
      <div >
        <div >{title}</div>
      </div>
      <hr />
    </React.Fragment>
  );
};

export default TitleTemplate;
