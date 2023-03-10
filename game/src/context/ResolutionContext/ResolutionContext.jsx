import React from "react";
import { MapRow } from "../../components/MapRow";
import { Sprite } from "../../components/Sprite";


const MyResolutionContext = React.createContext({});

export class ResolutionContext extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            scale: 1.0,
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
        const scale = this.state.scale + 0.1;
        if(scale < 5){
            this.setState({scale});
        }
        else {
            this.setState({scale: 5.0});
        }
    }

    decreaseScaling = () => {
        const scale = this.state.scale - 0.1;
        if(scale > 1){
            this.setState({scale});
        }
        else {
            this.setState({scale: 1.0});
        }
    }

    static TestComponent(props) {
        return (
            <MyResolutionContext.Consumer>
                {
                    (context) => {
                        return <div onWheel={context.onScroll} style={{position: 'absolute', top: 100, left: 100, transform: `scale(${context.scale}, ${context.scale})`}}>
                            {
                                [...Array(10)].map((elm, index)=>{
                                    return <MapRow row={index}/>
                                })
                            }
                        </div>
                    }
                }
            </MyResolutionContext.Consumer>
        )
    }


    render() {
        return <MyResolutionContext.Provider value={{...this.state, increaseScaling: this.increaseScaling, onScroll: this.onScroll}}>
            {this.props.children}
        </MyResolutionContext.Provider>
    }
}