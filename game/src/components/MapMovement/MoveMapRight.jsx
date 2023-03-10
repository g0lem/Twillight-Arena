import React from "react";
import { CAMERA_SENSITIVITY } from "../../utils/constants";
import { MapHover } from "./MapHover";


export class MoveMapRight extends React.Component {

    render() {
        return <MapHover style={{
                ...this.props.style,
                height: '100vw',
            }}
            onMouseEnter={()=>this.props.onMouseEnter(undefined,CAMERA_SENSITIVITY)}
            onMouseLeave={()=>this.props.onMouseLeave()}
        />
    }

} 