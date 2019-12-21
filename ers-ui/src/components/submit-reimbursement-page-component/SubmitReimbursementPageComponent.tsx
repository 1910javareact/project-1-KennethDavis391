import React from 'react'
import  NavbarComponent  from '../navbar-component/NavbarContainer'
import  SubmitReimbursementComponent  from '../reimbursement-component/SubmitReimbursementContainer'

export class SubmitReimbursementPageComponent extends React.Component<any,any>{


    render(){
        return(
            <div>
                <NavbarComponent></NavbarComponent>
                <SubmitReimbursementComponent></SubmitReimbursementComponent>
            </div>
        )
    }
}