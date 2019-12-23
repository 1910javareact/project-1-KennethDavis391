import React from 'react'
import  NavbarComponent  from '../navbar-component/NavbarContainer'
import { MultiUserComponent } from '../user-component/multi-user-component/MultiUserComponent'
import { User } from '../../models/user'
import { ersGetAllUsers } from '../../remote/ers-clients/ers-user'
import { Redirect } from 'react-router'

interface IAllUsersPageComponentProps{
    token: string
    user: User
}

interface IAllUsersPageComponentState{
    users: User[]
}

export class AllUsersPageComponent extends React.Component<IAllUsersPageComponentProps,IAllUsersPageComponentState>{

    constructor(props:any){
        super(props)
        this.state={
            users:[]
        }
    }

    async componentDidMount(){
        try{
            let u = await ersGetAllUsers(this.props.token)
            if(u.status === 200){
                this.setState({
                    ...this.state,
                    users: u.body
                })
            }
        }catch(e){
            console.log(e);
            
        }
    }

    render(){
        return(
            this.props.token?
            <div>
                <NavbarComponent></NavbarComponent>
                <MultiUserComponent currentUser={this.props.user} users={this.state.users}></MultiUserComponent>
            </div>
            :
            <Redirect to='/login'/>
        )
    }
}