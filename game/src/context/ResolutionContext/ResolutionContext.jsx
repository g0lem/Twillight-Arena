import React from "react";
import { MoveMapDown } from "../../components/MapMovement/MoveMapDown";
import { MoveMapLeft } from "../../components/MapMovement/MoveMapLeft";
import { MoveMapRight } from "../../components/MapMovement/MoveMapRight";
import { MoveMapUp } from "../../components/MapMovement/MoveMapUp";
import { MapRow } from "../../components/MapRow";
import { MOUSE_MOVE_SENSITIVITY } from "../../utils/constants";
import { Vec2 } from "../../utils/Vec2";
import { EntityContext } from "../EntityContext/EntityContext";


const MyResolutionContext = React.createContext({});
const ResolutionElementId = 'ResolutionComponent';


export class ResolutionContext extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            scale: 1.0,
            left: 0,
            top: 0,
            cameraOffset: new Vec2(0,0),
            mapMoveInterval: [],
            moveTop: 0,
            moveLeft: 0,
            dragging: false
        }
    }

    componentDidMount() {
        setInterval( () => {
            const top = this.state.cameraOffset.y - this.state.moveTop;
            const left = this.state.cameraOffset.x - this.state.moveLeft;
            const scale = this.state.scale;


            const bodyWidth = document.body.clientWidth;
            const bodyHeight = document.body.clientHeight;


            const mapWidth = document.getElementById(ResolutionElementId).clientWidth;
            const mapHeight = document.getElementById(ResolutionElementId).clientHeight;

            const width = mapWidth - bodyWidth;
            const height = mapHeight - bodyHeight;

            const maxOffset = width * (scale - 1);

            let cameraOffset = this.state.cameraOffset;

            if(top <= maxOffset && -top <= height) {
                console.log(top)
                cameraOffset.y = top;
                // this.setState({top, cameraOffset});    
            }
            if(left <= maxOffset && -left <= width) {
                cameraOffset.x = left;  
            }
            this.setState({left, top, cameraOffset});
        }, 100);
    }

    calculateScaling = () => {

    }

    isScrollUp = (e) => {
        return e.deltaY < 0;
    }

    onScroll = (e) => {
        e.preventDefault();
        if(this.isScrollUp(e)) {
            this.increaseScaling();
        }
        else {
            this.decreaseScaling();
        }
    }

    increaseScaling = () => {
        const scale = this.state.scale + 0.3;

        const bodyWidth = document.body.clientWidth;
        const bodyHeight = document.body.clientHeight;


        const mapWidth = document.getElementById(ResolutionElementId).clientWidth;
        const mapHeight = document.getElementById(ResolutionElementId).clientHeight;

        const width = mapWidth - bodyWidth;
        const height = mapHeight - bodyHeight;

        const maxOffset = width * (scale - 1);

        const top = -mapHeight/scale/2;
        const left = -mapWidth/scale/2;

        const cameraOffset = new Vec2(left, top);

        if(scale < 5){
            this.setState({scale, top, left, cameraOffset});
        }
        else {
            this.setState({scale: 5.0});
        }
    }

    decreaseScaling = () => {
        const scale = this.state.scale - 0.3;
        if(scale > 1){
            this.setState({scale});
        }
        else {
            this.setState({scale: 1.0});
        }
    }

    static TestComponent(props) {
        return <>
            {
                [...Array(100)].map((elm, index)=>{
                    return <MapRow key={`MAP_ROW_${index}`} row={index}/>
                })
            }
        </>
    }

    moveMap = (topDelta, leftDelta) => {
        if(topDelta !== undefined) {
            this.setState({moveTop: topDelta});
        }
        if(leftDelta !== undefined) {
            this.setState({moveLeft: leftDelta});
        }
    }

    stopMovingMap = () => {
        this.moveMap(0,0)
    }

    mouseMove = (e) => {
        const {
            movementX,
            movementY
        } = e;
        if(this.state.dragging) {
            this.moveMap(-movementY*MOUSE_MOVE_SENSITIVITY,-movementX*MOUSE_MOVE_SENSITIVITY);
        }
    }

    enableDragging = (e) => {
        console.log(this.state.cameraOffset)
        const {
            button,
        } = e;
        if(button === 1){
            this.setState({dragging: true});
        }
        
    }

    disableDragging = (e) => {
        this.setState({dragging: false, moveTop: 0, moveLeft: 0 });
    }

    get transformString() {
        return `translate(${this.state?.cameraOffset?.x}px, ${this.state?.cameraOffset?.y}px) scale(${this.state?.scale})`;
    }

    render() {
        return <MyResolutionContext.Provider value={{...this.state, increaseScaling: this.increaseScaling, onScroll: this.onScroll}}>
            <div 
                onWheel={this.onScroll}
                onPointerDown={this.enableDragging}
                onPointerUp={this.disableDragging}
                onPointerMove={this.mouseMove}
                draggable="false"
                id={ResolutionElementId}
                style={{position: 'absolute', top: 0, left: 0, transform: this.transformString, transition: `transform 100ms linear`}}
            >
                    {this.props.children}
            </div>
            {/* <EntityContext {...this.state} top={this.state.top + 100} left={this.state.left + 100}/> */}
            <MoveMapUp style={{top: 0, left: 0}} onMouseEnter={this.moveMap} onMouseLeave={this.stopMovingMap}/ >
            <MoveMapDown style={{bottom: 0, left: 0}} onMouseEnter={this.moveMap} onMouseLeave={this.stopMovingMap}/>
            <MoveMapLeft style={{top: 0, left: 0}} onMouseEnter={this.moveMap} onMouseLeave={this.stopMovingMap}/>
            <MoveMapRight style={{top: 0, right: 0}} onMouseEnter={this.moveMap} onMouseLeave={this.stopMovingMap}/>
        </MyResolutionContext.Provider>
    }
}