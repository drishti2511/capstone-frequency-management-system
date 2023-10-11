import SignupForm from "/Users/sanjayjain/Desktop/frequency-management-system/capstone/components/SignupForm.jsx";
import {getServerSession} from 'next-auth';
import {redirect} from 'next/navigation';
import {authOptions} from '/Users/sanjayjain/Desktop/frequency-management-system/capstone/pages/api/auth/[...nextauth]/route';



export default async function Signup(){
    const session = await getServerSession(authOptions);
    if(session){
        redirect('/dashboard');
    }
    return (
           <SignupForm/>
    );
}