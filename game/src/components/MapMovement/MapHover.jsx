import React from "react";


export class MapHover extends React.Component {

    render() {
        return <div style={{
                position: 'absolute',
                zIndex: 1000,
                height: '15vh',
                width: '10vw',
                cursor: 'all-scroll',
                ...this.props.style,
            }}
            onMouseEnter={this.props.onMouseEnter}
            onMouseLeave={this.props.onMouseLeave}
        >
            {this.props.children}
        </div>
    }

} 