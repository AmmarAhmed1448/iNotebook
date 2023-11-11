import React, { useContext, useEffect } from "react";
import NotesContext from "../context/notes/NotesContext";

function About() {

    // const a = useContext(NotesContext);
    // * In this line, you are calling useContext(NotesContext) to access the context value, and you're assigning it to the variable a. This means that a now holds the state and functions provided by the NotesContext context.

    // useEffect(() => {
    //     a.update();
    //      // eslint-disable-next-line
    // }, [])
    return(
        <h1>This is About.</h1>
    );
}

export default About;



// ! UseEffect
// * The first argument is a function, which contains the code that you want to execute as a side effect. This function is executed after the component has rendered. You can place any code for side effects, such as data fetching, API calls, DOM manipulation, or subscriptions, within this function.

// * The second argument is an optional array of dependencies. It specifies when the effect should run. If the array is empty, the effect runs only after the initial render. If you provide dependencies, the effect will run whenever any of the dependencies change between renders. This is useful for scenarios where you want to re-run the effect when certain data or props change.

// ! Syntax:
//? useEffect(() => {
//?      Code to run after the component renders
//?      This is where you can perform side effects
//?   }, [dependencies]);
  