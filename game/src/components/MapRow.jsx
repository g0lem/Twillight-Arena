import React from "react";
import { Sprite } from "./Sprite";



export class MapRow extends React.Component {


    render() {
        return (
            <div style={{overflow: "hidden", marginTop: -5}}>
                 {
                    [...Array(10)].map((elm, index)=>{
                        return <Sprite key={`SPRITE_ROW_${this.props.row}`} index={index}/>
                    })
                }
            </div>
        )
    }
}