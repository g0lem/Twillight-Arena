import React from "react";
import { EntityContext } from "./context/EntityContext/EntityContext";
import { ResolutionContext } from "./context/ResolutionContext/ResolutionContext";

export class App extends React.Component {

    render() {
        return <div style={{overflow: 'hidden'}}>
            <ResolutionContext>
                <ResolutionContext.TestComponent/>
            </ResolutionContext>
        </div>
    }
}