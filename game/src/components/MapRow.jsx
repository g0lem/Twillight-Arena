import React from "react";
import { Sprite } from "./Sprite";



export class MapRow extends React.Component {
    constructor(props) {
        super(props);
    }


    render() {
        return (
            <div style={{overflow: "hidden", marginTop: -5, display: 'flex', flexWrap: 'nowrap'}}>
                 {
                    [...Array(100)].map((elm, index)=>{
                        return <Sprite 
                                    key={`SPRITE_ROW_${this.props.row}_COLUMN_${index}`}
                                    row={this.props.row} 
                                    column={index}
                                    spriteSheet={'summer.png'}
                        />
                    })
                }
            </div>
        )
    }
}