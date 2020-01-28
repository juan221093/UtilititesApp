import {useState} from 'react';
import {signup} from '../../actions/auth'
import Router from 'next/router';

const SignupComponent = () => {
    const [values, setValues] = useState({
        name: 'Juan',
        email: 'test20@gmail.com',
        password: 'test12345',
        error: '',
        loading: false,
        message: '',
        showForm: true
    });

    const {name, email, password, error, loading, message, showForm} = values;
    

    const handleSubmit = e => {
        e.preventDefault();
        //console.table({name, email, password, error, loading, message, showForm});
        setValues({ ...values, loading: true, error: false})
        const user =  {name, email, password }


        signup(user).then(data => {
            if(data.error){
                setValues({ ...values, error: data.error, loading: false});
            }else{
                setValues({
                    ...values, 
                    name: '', 
                    email: '', 
                    password: '', 
                    error: '', 
                    loading: false, 
                    message: data.message,
                    showForm: false
                });
                

            }

        });
       
    };

    const handleChange = name => e => {
        setValues({ ...values, error: false, [name]: e.target.value});

    };

    const showLoading = () => (loading ? <div className="aler alert-info">Loading...</div>:'');
    const showError = () => (error ? <div className="aler alert-danger">{error}</div>:'');
    const showMessage = () => (message ? <div className="aler alert-info">{message}</div>:'');



    const signupForm = () => {
        return(
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <input 
                        value={name}
                        onChange={handleChange('name')} 
                        type="text" 
                        className="form-control" 
                        placeholder="Type Your Name">
            
                    </input>
                </div>

                <div className="form-group">
                    <input 
                        value={email}
                        onChange={handleChange('email')} 
                        type="email" 
                        className="form-control" 
                        placeholder="Type Your Email">
            
                    </input>
                </div>

                <div className="form-group">
                    <input 
                        value={password}
                        onChange={handleChange('password')} 
                        type="password" 
                        className="form-control" 
                        placeholder="Type Your Password">
            
                    </input>
                </div>

                <div>
                    <button className="btn btn-primary">Signup</button>
                </div>
                
            </form>
        );
    };
    return <React.Fragment>
            {showError()}
            {showLoading()}
            {showMessage()}
            {showForm && signupForm()}
    
    </React.Fragment>;
    

};

export default SignupComponent;