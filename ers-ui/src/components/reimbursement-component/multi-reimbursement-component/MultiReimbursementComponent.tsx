import React from 'react'
import { Reimbursement } from '../../../models/reimbursement'
import { ReimbursementComponent } from '../ReimbursementComponent'

interface MultiReimbursementComponentProps{
    reimbursements: Reimbursement[]
}

export class MultiReimbursementComponent extends React.Component<MultiReimbursementComponentProps,any>{

    render(){

        let blocks = this.props.reimbursements.map((reimbursement) => {
            return <ReimbursementComponent reimbursement={reimbursement} key={'reimbursement ' + reimbursement.reimbursementId} />
        })

        return(
            <div>
                {blocks}
            </div>
        )
    }
}