import React from 'react'
import NavbarComponent from '../navbar-component/NavbarContainer'
import { Reimbursement } from '../../models/reimbursement'
import { ersGetReimbursementsByStatus } from '../../remote/ers-clients/ers-reimbursement'
import { MultiReimbursementComponent } from '../reimbursement-component/multi-reimbursement-component/MultiReimbursementComponent'
import { Redirect } from 'react-router'
import { Alert } from 'reactstrap'

interface IReimbursementsByStatusPageComponentState {
    reimbursements: Reimbursement[]
    realUpdate: boolean
    noReimbursements: boolean
}

export class ReimbursementsByStatusPageComponent extends React.Component<any, IReimbursementsByStatusPageComponentState>{

    constructor(props: any) {
        super(props)
        this.state = {
            reimbursements: [],
            realUpdate: false,
            noReimbursements: false
        }
    }

    async componentDidMount() {
        const { status } = this.props.match.params
        try {
            let r = await ersGetReimbursementsByStatus(status, this.props.token)
            if (r.status === 200) {
                this.setState({
                    ...this.state,
                    reimbursements: r.body,
                    noReimbursements: false
                })
            } else {

            }
        } catch (e) {
            this.setState({
                ...this.state,
                reimbursements: [],
                noReimbursements: true
            })
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
                        reimbursements: r.body,
                        noReimbursements: false
                    })

                } else {

                }
            } catch (e) {
                this.setState({
                    ...this.state,
                    reimbursements: [],
                    noReimbursements: true
                })
            } finally {
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

    noReimbursements = () => {
        return (
            <Alert color="danger">
                No Reimbursements of This Status
            </Alert>
        )
    }

    render() {
        return (
            this.props.token ?
                <div>
                    <NavbarComponent updateStatus={this.updateStatus}></NavbarComponent>
                    {this.state.noReimbursements && this.noReimbursements()}
                    <MultiReimbursementComponent reimbursements={this.state.reimbursements}></MultiReimbursementComponent>
                </div>
                :
                <Redirect to='/login'></Redirect>
        )
    }
}