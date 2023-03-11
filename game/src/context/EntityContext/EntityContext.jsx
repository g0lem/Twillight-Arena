import React from "react";
import { MoveMapDown } from "../../components/MapMovement/MoveMapDown";
import { MoveMapLeft } from "../../components/MapMovement/MoveMapLeft";
import { MoveMapRight } from "../../components/MapMovement/MoveMapRight";
import { MoveMapUp } from "../../components/MapMovement/MoveMapUp";
import { MapRow } from "../../components/MapRow";
import { Sprite } from "../../components/Sprite";
import { ResolutionContext } from "../ResolutionContext/ResolutionContext";


const MyResolutionContext = React.createContext({});
const ResolutionElementId = 'ResolutionComponent';


export class EntityContext extends React.Component {

    constructor(props){
        super(props);
    }

    render() {
        return (
                <div
                    style={{position: 'absolute', top: 0, left: 0, transform: `translate(${this.props.left}px, ${this.props.top}px) scale(${this.props.scale}, ${this.props.scale})`, transition: `transform 100ms linear`}}
                >
                    <Sprite row={2} column={2} spriteSheet={'mage.png'}/>
                </div>
        );                
    }
}