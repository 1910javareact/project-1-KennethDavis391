import { IState } from "../../reducers"
import { connect } from "react-redux"
import { AllUsersPageComponent } from "./AllUsersPageComponent"


const mapStateToProps = (state: IState) => {
    return{
        user: state.login.user,
        token: state.login.token
    }
}

const mapDispatchToProps={

}

export default connect(mapStateToProps,mapDispatchToProps)(AllUsersPageComponent)