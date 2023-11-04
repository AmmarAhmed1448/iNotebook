import { createContext } from "react";

const NotesContext = createContext();
// * The createContext function is invoked to create a new context object, which is stored in the NotesContext variable. Contexts in React are a way to share data and state between components without manually passing props through the component tree.    

export default NotesContext;
// * This makes the context available for other parts of your application to use. Other components can import this context and interact with it, either as providers to set its value or as consumers to access the data it provides.