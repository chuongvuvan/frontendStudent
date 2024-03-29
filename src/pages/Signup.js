import React, { Component } from 'react';
import axios from 'axios';
import swal from 'sweetalert';
// import { Redirect} from 'react-router-dom';
// import { useHistory } from "react-router-dom";
import { Link, withRouter } from "react-router-dom";

class Signup extends Component {
    state = {
        name:'',
        email: '',
        password:'',
        error_list: [],
        
    }
    hanleInput= (e)=>{
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    
    saveSignup = async (e)=>{
        e.preventDefault();
        const response = await axios.post('http://localhost:8000/api/signup',this.state);
        if(response.data.status === 200){
            swal({
                title: "Success!",
                text: response.data.message,
                icon: "success",
                button:"OK!"
              });
            this.setState({
                name:'',
                email:'',
                password:''
            });
            this.props.history.push("/login");
        }
        else{
        
            this.setState({
                error_list: response.data.validate_err,
            });
        }
    }
    render() {
        return (
           <div className="container">
               <div className="row text-center">
               <main className="form-signin">
                <form onSubmit={this.saveSignup} noValidate>
                    <img className="mb-4" src="https://luatdongkhanh.com/wp-content/uploads/2019/11/art_eatlogos_design_for_pink.png" alt width={150} height={125} />
                    <h1 className="h3 mb-3 fw-normal">Sign Up</h1>
                    {/* <span className="text-danger">{this.state.error_list}</span> */}
                    <div className="form-floating">
                        <input type="name" className="form-control" id="floatingInput" onChange={this.hanleInput} name="name" value={this.state.name} placeholder="Join.." />
                        <label htmlFor="floatingInput">Name</label>
                        <span className="text-danger">{this.state.error_list.name}</span>
                    </div>
                    <div className="form-floating">
                        <input type="email" className="form-control" id="floatingInput" onChange={this.hanleInput} name="email" value={this.state.email} placeholder="name@example.com" />
                        <label htmlFor="floatingInput">Email address</label>
                        <span className="text-danger">{this.state.error_list.email}</span>
                    </div>
                    <div className="form-floating">
                        <input type="password" className="form-control" id="floatingPassword" onChange={this.hanleInput} value={this.state.password}  name="password" placeholder="Password" />
                        <label htmlFor="floatingPassword">Password</label>
                        <span className="text-danger">{this.state.error_list.password}</span>
                    </div>
                    {/* <div className="checkbox mb-3">
                        <label>
                            <input type="checkbox" defaultValue="remember-me" /> Remember me
                        </label>
                    </div> */}
                    <button className="w-100 btn btn-lg btn-primary" type="submit">Sign Up</button>
                    <a href="javascript:;" className="text-center mt-3"><Link to={'login'}>Login</Link></a>
                    <p className="mt-5 mb-3 text-muted">© 2021</p>
                </form>
            </main>
               </div>
           </div>
        )
    }
}

export default Signup