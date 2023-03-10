import React from "react";
import { MapHover } from "../../components/MapMovement/MapHover";
import { MoveMapDown } from "../../components/MapMovement/MoveMapDown";
import { MoveMapUp } from "../../components/MapMovement/MoveMapUp";
import { MapRow } from "../../components/MapRow";


const MyResolutionContext = React.createContext({});

export class ResolutionContext extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            scale: 1.0,
            left: 0,
            top: 0,
            mapMoveInterval: null,
        }
    }

    componentDidMount() {
        
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

    onMouseEnter = (topDelta = 0, leftDelta = 0) => {
        const mapMoveInterval = setInterval( () => {
            const top = this.state.top - topDelta;
            const left = this.state.left - leftDelta;
            this.setState({top, left});            
        }, 100);

        this.setState({mapMoveInterval})
    }

    onMouseLeave = () => {
        clearInterval(this.state.mapMoveInterval);
        this.setState({mapMoveInterval: null});
    }


    render() {
        return <MyResolutionContext.Provider value={{...this.state, increaseScaling: this.increaseScaling, onScroll: this.onScroll}}>
            <MoveMapUp style={{top: 0, left: 0}} onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave}/ >
            <div 
                onWheel={this.onScroll} 
                style={{position: 'absolute', top: 0, left: 0, transform: `translate(${this.state.left}px, ${this.state.top}px) scale(${this.state.scale}, ${this.state.scale})`, transition: `transform 100ms linear`}}
            >
                    {this.props.children}
            </div>
            <MoveMapDown style={{bottom: 0, left: 0}} onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave}/>
        </MyResolutionContext.Provider>
    }
}