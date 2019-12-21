import React from 'react'
import  NavbarComponent  from '../navbar-component/NavbarContainer'
import { UserComponent } from '../user-component/UserComponent'
import { MultiReimbursementComponent } from '../reimbursement-component/multi-reimbursement-component/MultiReimbursementComponent'
import { User } from '../../models/user'
import { Reimbursement } from '../../models/reimbursement'
import { ersGetReimbursementsById } from '../../remote/ers-clients/ers-reimbursement'
import { ersGetUserById } from '../../remote/ers-clients/ers-user'
import { Card, CardHeader } from 'reactstrap'

interface ISingleUserPageComponentProps{
    //getUserById:(userId: number, token: string) => User
    //getReimbursementsById:(userId: number, token: string) => Reimbursement[]
    userId: number
    token: string
    user: User
}

interface ISingleUserPageComponentState{
    user: User,
    reimbursements: Reimbursement[]
}

export class SingleUserPageComponent extends React.Component<ISingleUserPageComponentProps, ISingleUserPageComponentState>{

    constructor(props:any){
        super(props)
        this.state = {
            user: this.props.user,
            reimbursements: []
        }
    }

    async componentDidMount(){
        try {
            let r = await ersGetReimbursementsById(this.props.user.userId, this.props.token)
            if (r.status === 200) {
                this.setState({
                    ...this.state,
                    reimbursements: r.body
                })
            }
        } catch (e) {
            console.log(e);
        }
    }

    rerender = async () =>{
        try {
            let u = await ersGetUserById(this.props.userId, this.props.token)
            if(u.status === 200){
                this.setState({
                    ...this.state,
                    user: u.body
                })
            }
        }catch(e){
            console.log(e)
            this.setState({
                ...this.state,
                user: new User(this.props.userId,'','','','','',[])
            })
        }
        try{
            let r = await ersGetReimbursementsById(this.props.userId, this.props.token)
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

    render(){
        return(
            <div>
                <NavbarComponent rerender={this.rerender}></NavbarComponent>
                <UserComponent user={this.state.user}></UserComponent>
                <Card className='text-left'>
                    <CardHeader>
                        <h2>Reimbursement Requests</h2>
                    </CardHeader>
                </Card>
                <MultiReimbursementComponent reimbursements={this.state.reimbursements}></MultiReimbursementComponent>
            </div>
        )
    }
}