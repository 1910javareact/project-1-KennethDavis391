import React from 'react'
import NavbarComponent from '../navbar-component/NavbarContainer'
import { Reimbursement } from '../../models/reimbursement'
import { ersGetReimbursementsByStatus } from '../../remote/ers-clients/ers-reimbursement'
import { MultiReimbursementComponent } from '../reimbursement-component/multi-reimbursement-component/MultiReimbursementComponent'
import { Redirect } from 'react-router'

interface IReimbursementsByStatusPageComponentState {
    reimbursements: Reimbursement[]
    realUpdate: boolean
}

export class ReimbursementsByStatusPageComponent extends React.Component<any, IReimbursementsByStatusPageComponentState>{

    constructor(props: any) {
        super(props)
        this.state = {
            reimbursements: [],
            realUpdate: false
        }
    }

    async componentDidMount() {
        const { status } = this.props.match.params
        try {
            let r = await ersGetReimbursementsByStatus(status, this.props.token)
            if (r.status === 200) {
                this.setState({
                    ...this.state,
                    reimbursements: r.body
                })
            }
        } catch (e) {

        }
    }

    async componentDidUpdate() {
        if (this.state.realUpdate) {
            const { status } = this.props.match.params
            try {
                let r = await ersGetReimbursementsByStatus(status, this.props.token)
                if (r.status === 200) {
                    this.setState({
                        ...this.state,
                        reimbursements: r.body
                    })
                }
            } catch (e) {

            }finally{
                this.setState({
                    ...this.state,
                    realUpdate: false
                })
            }
        }

    }

    updateStatus = () => {

        this.setState({
            ...this.state,
            realUpdate: true
        })
    }

    render() {
        return (
            this.props.token?
            <div>
                <NavbarComponent updateStatus={this.updateStatus}></NavbarComponent>
                <MultiReimbursementComponent reimbursements={this.state.reimbursements}></MultiReimbursementComponent>
            </div>
            :
            <Redirect to='/login'></Redirect>
        )
    }
}