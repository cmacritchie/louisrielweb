import React, { Component } from 'react'
import { Context as UserContext } from '../contexts/UserContext'

export default (userAuth = true, adminAuth = true, apexAuth = true) => ChildComponent => {
    class ComposedComponent extends Component {
        componentDidMount(){

        }

        render() {
            console.log(userAuth, adminAuth, apexAuth)
            let value = this.context
            debugger;
            return <ChildComponent {...this.props} />
        }
    }
    ComposedComponent.contextType = UserContext;

    return ComposedComponent
}