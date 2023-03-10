import React from "react";
import { CAMERA_SENSITIVITY } from "../../utils/constants";
import { MapHover } from "./MapHover";


export class MoveMapDown extends React.Component {

    render() {
        return <MapHover style={{
                ...this.props.style,
                width: '100vw',
            }}
            onMouseEnter={()=>this.props.onMouseEnter(CAMERA_SENSITIVITY)}
            onMouseLeave={()=>this.props.onMouseLeave()}
        />
    }

} 