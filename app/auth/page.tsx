// Authentication landing page to log in or sign up for an account.

import CreateAccount from "./create-account/page";
import Login from "./login/page";
import Reset from "./reset/page";

export default function AuthPage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[80vh] items-center">
            <CreateAccount />
            {/* <Reset /> */}
        </div>
    )
}