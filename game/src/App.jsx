import React from "react";
import { ResolutionContext } from "./context/ResolutionContext/ResolutionContext";

export class App extends React.Component {

    render() {
        return <div style={{overflow: 'hidden'}}>
            works
            <ResolutionContext>
                <ResolutionContext.TestComponent/>
            </ResolutionContext>
        </div>
    }
}