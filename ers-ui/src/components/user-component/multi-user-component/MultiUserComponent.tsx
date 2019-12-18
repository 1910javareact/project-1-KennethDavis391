import React from 'react'
import { User } from '../../../models/user'
import { UserComponent } from '../UserComponent'

interface IMultiUserComponentProps{
    users: User[]
}

export class MultiUserComponent extends React.Component<IMultiUserComponentProps,any>{

    

    render(){

        let blocks = this.props.users.map((user) => {
            return <UserComponent user={user} key={'user ' + user.userId} />
        })

        return(
            <div>
                {blocks}
            </div>
        )
    }
}