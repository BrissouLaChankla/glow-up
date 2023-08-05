import { useSession, signOut } from "next-auth/react"
export default function index() {
    const { data: session } = useSession();
    console.log(session);
    
    const handleSignout = async () => {
        await signOut({ callbackUrl: '/login' })
    }

    return (
        <div>
            {/* Signed in as {session.user.email} <br/> */}
            <button onClick={handleSignout}>Sign out</button>
        </div>
    )
}
