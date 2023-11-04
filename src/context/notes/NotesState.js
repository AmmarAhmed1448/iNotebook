import React, { useState } from "react";
import NotesContext from "./NotesContext";


// * The NotesState component is a functional component that takes props as an argument. Its primary purpose is to act as a provider for the NotesContext
const NotesState = (props) => {

    // * Inside the component, a state object is defined. This object holds data that you want to provide to other components through the NotesContext
    const s1 = {
        name: "Ammar",
        class: "5b"
    };

    const [state, setState] = useState(s1);
    const update = () => {
        setTimeout(() => {
            setState({
                name: "Zain",
                class: "10b"
            })
        }, 2000);
    }

    return (

        // *This is where the actual data-sharing takes place. The <NotesContext.Provider> component is a part of the context API provided by React. It wraps the contents you want to share. In this case, the value prop is set to the state object, which is the data you want to make available to other components. The value prop can hold any data you want to provide.


        //* We need to pass the state and functions in the form of an object
        <NotesContext.Provider value={{ 
            state: state, 
            update: update 
            }}>
                
            {props.children}
        </NotesContext.Provider>
        // *props.children. This ensures that the components wrapped by NotesState will have access to the state data.
    );

}
export default NotesState;