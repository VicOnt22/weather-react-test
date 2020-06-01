import ReactDOM from 'react-dom'
import React, {Component} from 'react';

const portalRoot = document.getElementById('portal')

class Portal extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.el = document.createElement('div')
    }

    // add this.el element to component then it mounts and un-mounts
    componentDidMount = () => {
        portalRoot.appendChild(this.el);
    }
    componentWillUnmount = () => {
        portalRoot.removeChild(this.el);
    }

    render() {
        const {children} = this.props
        // children can be anything between <Portal>
        return ( ReactDOM.createPortal(children, this.el)
        );
    }
}

Portal.propTypes = {};

export default Portal;