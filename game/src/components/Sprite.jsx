import React from "react";

const SIZE = 32;

export class Sprite extends React.Component {

    constructor(props){
        super(props);
    }

    onClick = () => {
        console.log(this.props.row, this.props.column);
    }

    translateSpritePosition = (x,y) => {
        return {
            x: x*(SIZE + 1),
            y: y*(SIZE + 1),
        }
    }

    getTranslateSpritePositionString = (x,y) => {
        const coords = this.translateSpritePosition(x,y);

        return `-${coords.x}px -${coords.y}px`;
    }


    render() {
        return <div
            style={{
                backgroundImage: "url('summer.png')",
                backgroundSize: 'auto',
                backgroundPosition: this.getTranslateSpritePositionString(this.props.row % 17 + 1, this.props.column % 17 + 1),
                height: SIZE,
                width: SIZE,
                marginLeft: -1,
                display: 'inline-block',
            }}
            onClick={this.onClick}
        />
    }
}