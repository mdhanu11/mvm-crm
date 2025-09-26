import { Link } from "react-router-dom"
import Button from "../../components/ui/Button"

function Page404() {
    return (
        <div className="h-screen w-full flex justify-center items-center">
            <div className="text-center">
                <h6 className="mb-2">Page not found or you do not have access to this page</h6>
                <Link to={'/dashboard/home'}>
                    <Button variant="black">Go Back To Home</Button>
                </Link>
            </div>
        </div>
    )
}

export default Page404