import React from "react";


export class MapHover extends React.Component {

    render() {
        return <div style={{
                position: 'absolute',
                zIndex: 1000,
                height: '10vh',
                width: '5vw',
                ...this.props.style,
            }}
            onMouseEnter={this.props.onMouseEnter}
            onMouseLeave={this.props.onMouseLeave}
        >
            {this.props.children}
        </div>
    }

} 