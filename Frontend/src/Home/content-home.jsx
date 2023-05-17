import React from "react";
import './contenthome.css';
import './headcontent.css';
function ContentSZ({title, description}) {
  return (
    <div>
      <div>
        <h1 className="head-content">{title}</h1>
        <p className="content-home">{description}</p>
      </div>

    </div>
  )
}

export default ContentSZ;