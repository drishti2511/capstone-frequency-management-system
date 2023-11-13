import SignupForm from "components/SignupForm.jsx";
import {getServerSession} from 'next-auth';
import {redirect} from 'next/navigation';
import {authOptions} from 'app/api/auth/[...nextauth]/route.js';



export default async function Signup(){
    const session = await getServerSession(authOptions);
    return (
           <SignupForm/>
    );
}