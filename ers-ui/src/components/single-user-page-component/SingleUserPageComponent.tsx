import React from 'react'
import NavbarComponent from '../navbar-component/NavbarContainer'
import { UserComponent } from '../user-component/UserComponent'
import { MultiReimbursementComponent } from '../reimbursement-component/multi-reimbursement-component/MultiReimbursementComponent'
import { User } from '../../models/user'
import { Reimbursement } from '../../models/reimbursement'
import { ersGetReimbursementsById } from '../../remote/ers-clients/ers-reimbursement'
import { ersGetUserById } from '../../remote/ers-clients/ers-user'
import { Card, CardHeader } from 'reactstrap'
import { Redirect } from 'react-router'

// interface ISingleUserPageComponentProps{
//     //getUserById:(userId: number, token: string) => User
//     //getReimbursementsById:(userId: number, token: string) => Reimbursement[]
//     userId: number
//     token: string
//     user: User
// }

interface ISingleUserPageComponentState {
    user: User,
    reimbursements: Reimbursement[]
    realUpdate: boolean
}

export class SingleUserPageComponent extends React.Component<any, ISingleUserPageComponentState>{

    constructor(props: any) {
        super(props)
        this.state = {
            user: new User(0, '', '', '', '', '', []),
            reimbursements: [],
            realUpdate: false
        }
    }

    async componentDidMount() {
        const { userid } = this.props.match.params
        try {
            let u = await ersGetUserById(userid, this.props.token)
            if (u.status === 200) {
                this.setState({
                    ...this.state,
                    user: u.body
                })
            }
        } catch (e) {
            console.log(e)
            this.setState({
                ...this.state,
                user: new User(this.props.userId, '', '', '', '', '', [])
            })
        }
        try {
            let r = await ersGetReimbursementsById(userid, this.props.token)
            if (r.status === 200) {
                this.setState({
                    ...this.state,
                    reimbursements: r.body,
                })
            }
        } catch (e) {
            console.log(e);
            this.setState({
                ...this.state,
                reimbursements: []
            })
        }
    }

    async componentDidUpdate() {
        if (this.state.realUpdate) {
            const { userid } = this.props.match.params
            try {
                let u = await ersGetUserById(userid, this.props.token)
                if (u.status === 200) {
                    this.setState({
                        ...this.state,
                        user: u.body
                    })
                }
            } catch (e) {
                console.log(e)
                this.setState({
                    ...this.state,
                    user: new User(this.props.userId, '', '', '', '', '', [])
                })
            }
            try {
                let r = await ersGetReimbursementsById(userid, this.props.token)
                if (r.status === 200) {
                    this.setState({
                        ...this.state,
                        reimbursements: r.body,
                    })
                }
            } catch (e) {
                console.log(e);
                this.setState({
                    ...this.state,
                    reimbursements: []
                })
            } finally {
                this.setState({
                    ...this.state,
                    realUpdate: false
                })
            }

        }
    }

    updateUserId = async (userid: number) => {
        this.setState({
            ...this.state,
            realUpdate: true
        })
        // try {
        //     let u = await ersGetUserById(userid, this.props.token)
        //     if (u.status === 200) {
        //         this.setState({
        //             ...this.state,
        //             user: u.body
        //         })
        //     }
        // } catch (e) {
        //     console.log(e)
        //     this.setState({
        //         ...this.state,
        //         user: new User(this.props.userId, '', '', '', '', '', [])
        //     })
        // }
        // try {
        //     let r = await ersGetReimbursementsById(userid, this.props.token)
        //     if (r.status === 200) {
        //         this.setState({
        //             ...this.state,
        //             reimbursements: r.body,
        //         })
        //     }
        // } catch (e) {
        //     console.log(e);
        //     this.setState({
        //         ...this.state,
        //         reimbursements: []
        //     })
        // }
    }

    render() {
        return (
            this.props.token ?
                <div>
                    <NavbarComponent match={this.props.match} updateUserId={this.updateUserId}></NavbarComponent>
                    <UserComponent currentUser={this.props.user} user={this.state.user}></UserComponent>
                    <Card className='text-left'>
                        <CardHeader>
                            <h2>Reimbursement Requests</h2>
                        </CardHeader>
                    </Card>
                    <MultiReimbursementComponent reimbursements={this.state.reimbursements}></MultiReimbursementComponent>
                </div>
                :
                <Redirect to='/login' />
        )
    }
}