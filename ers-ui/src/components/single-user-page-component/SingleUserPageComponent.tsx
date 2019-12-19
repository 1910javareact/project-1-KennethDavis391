import React from 'react'
import  NavbarComponent  from '../navbar-component/NavbarContainer'
import { UserComponent } from '../user-component/UserComponent'
import { MultiReimbursementComponent } from '../reimbursement-component/multi-reimbursement-component/MultiReimbursementComponent'



export class SingleUserPageComponent extends React.Component<any, any>{


    render(){
        return(
            <div>
                {/* <NavbarComponent></NavbarComponent>
                <UserComponent></UserComponent>
                <MultiReimbursementComponent></MultiReimbursementComponent> */}
            </div>
        )
    }
}