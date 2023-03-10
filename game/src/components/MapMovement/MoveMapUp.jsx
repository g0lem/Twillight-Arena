import React from "react";
import { MapHover } from "./MapHover";


export class MoveMapUp extends React.Component {

    render() {
        return <MapHover style={{
                ...this.props.style,
                width: '100vw',
            }}
            onMouseEnter={()=>this.props.onMouseEnter(-10,0)}
            onMouseLeave={()=>this.props.onMouseLeave(-10,0)}
        />
    }

} 