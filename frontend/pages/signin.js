import Layout from '../components/Layout'
import SigninCompnonent from '../components/auth/SigninComponent';




const Signin = () => {

    return (
    
    <Layout>
        
        <h2 className="text-center pt-4 pb-4">Signin</h2>  
        <div className="row">
            <div className="col-md-6 offset-md-3">
                <SigninCompnonent />
            </div>
        </div>
    </Layout>


    );
};

export default Signin;