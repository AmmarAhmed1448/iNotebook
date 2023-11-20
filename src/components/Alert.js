import React from "react";

// export default function Alert(props){
//     return(
//         <div className={`alert alert-${props.type} alert-dismissible fade show`} role="alert">
//   {props.msg}
//   <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close">
//     <span aria-hidden="true">&times;</span>
//   </button>
// </div>
//     );
// }



function Alert(props) {

    if (!alert) {
        // Return null or some default content when alert is not available
        return null;
      }

      
    const {msg, type} = props.alert;
    return (
        <>
        <div className={`alert alert-${type} alert-dismissible fade show`} role="alert">
        {console.log("msg and type", msg, " ", type)}
            {msg}
            <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
        </>
    );
}



export default Alert;