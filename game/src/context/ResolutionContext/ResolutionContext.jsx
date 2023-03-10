import React from "react";
import { MoveMapDown } from "../../components/MapMovement/MoveMapDown";
import { MoveMapLeft } from "../../components/MapMovement/MoveMapLeft";
import { MoveMapRight } from "../../components/MapMovement/MoveMapRight";
import { MoveMapUp } from "../../components/MapMovement/MoveMapUp";
import { MapRow } from "../../components/MapRow";
import { Sprite } from "../../components/Sprite";


const MyResolutionContext = React.createContext({});

export class ResolutionContext extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            scale: 1.0,
            left: 0,
            top: 0,
            mapMoveInterval: [],
            moveTop: 0,
            moveLeft: 0,
        }
    }

    componentDidMount() {
        setInterval( () => {
            const top = this.state.top - this.state.moveTop;
            const left = this.state.left - this.state.moveLeft;
            this.setState({top, left});            
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
        if(scale < 5){
            this.setState({scale});
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


    render() {
        return <MyResolutionContext.Provider value={{...this.state, increaseScaling: this.increaseScaling, onScroll: this.onScroll}}>
            <div 
                onWheel={this.onScroll} 
                style={{position: 'absolute', top: 0, left: 0, transform: `translate(${this.state.left}px, ${this.state.top}px) scale(${this.state.scale}, ${this.state.scale})`, transition: `transform 100ms linear`}}
            >
                    {this.props.children}
                    <Sprite row={10} column={10}/>
            </div>
            <MoveMapUp style={{top: 0, left: 0}} onMouseEnter={this.moveMap} onMouseLeave={this.stopMovingMap}/ >
            <MoveMapDown style={{bottom: 0, left: 0}} onMouseEnter={this.moveMap} onMouseLeave={this.stopMovingMap}/>
            <MoveMapLeft style={{top: 0, left: 0}} onMouseEnter={this.moveMap} onMouseLeave={this.stopMovingMap}/>
            <MoveMapRight style={{top: 0, right: 0}} onMouseEnter={this.moveMap} onMouseLeave={this.stopMovingMap}/>
        </MyResolutionContext.Provider>
    }
}