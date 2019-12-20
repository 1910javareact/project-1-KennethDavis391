import { IState } from "../../reducers";
import { connect } from "react-redux";
import { SingleUserPageComponent } from "./SingleUserPageComponent";


const mapStateToProps = (state: IState) => {
    return{
        user: state.login.user,
        token: state.login.token,
        userId: state.navbar.userId,
    }
}

const mapDispatchToProps = {

}

export default connect(mapStateToProps,mapDispatchToProps)(SingleUserPageComponent)