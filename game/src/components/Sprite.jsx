import React from "react";

const SIZE = 32;

export class Sprite extends React.Component {

    onClick = () => {
        alert(this.props.index);
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
                'background-image': "url('summer.png')",
                backgroundSize: 'auto',
                backgroundPosition: this.getTranslateSpritePositionString(1, 5),
                height: SIZE,
                width: SIZE,
                marginLeft: -1,
                display: 'inline-block',
            }}
            onClick={this.onClick}
        />
    }
}