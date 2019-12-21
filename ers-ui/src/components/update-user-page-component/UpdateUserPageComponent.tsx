import React from 'react'
import { Redirect } from 'react-router'
import NavbarComponent from '../navbar-component/NavbarContainer'
import { User } from '../../models/user'
import { ersGetUserById } from '../../remote/ers-clients/ers-user'
import { UpdateUserComponent } from '../user-component/UpdateUserComponent'

interface IUpdateUserPageComponentState {
    user: User
}

export class UpdateUserPageComponent extends React.Component<any, IUpdateUserPageComponentState>{

    constructor(props: any) {
        super(props)
        this.state = {
            user: new User(0, '', '', '', '', '', [])
        }
    }

    async componentDidMount() {
        let { userid } = this.props.match.params
        try {
            let u = await ersGetUserById(userid, this.props.token)
            if (u.status === 200) {
                this.setState({
                    ...this.state,
                    user: u.body
                })
            } else {

            }

        } catch (e) {
            console.log(e);

        }
    }

    render() {
        return (
            this.props.token ?
                <div>
                    <NavbarComponent></NavbarComponent>
                    <UpdateUserComponent user={this.state.user} token={this.props.token}></UpdateUserComponent>
                </div>
                :
                <Redirect to='/login'></Redirect>
        )
    }
}