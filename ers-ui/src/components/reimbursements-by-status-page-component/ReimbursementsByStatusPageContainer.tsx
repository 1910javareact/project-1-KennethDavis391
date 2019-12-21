import { IState } from "../../reducers";
import { connect } from "react-redux";
import { ReimbursementsByStatusPageComponent } from "./ReimbursementsByStatusPageComponent";

const mapStateToProps = (state:IState) =>{
    return{
        token: state.login.token,
    }
}

const mapDispatchToProps ={

}

export default connect(mapStateToProps,mapDispatchToProps)(ReimbursementsByStatusPageComponent)