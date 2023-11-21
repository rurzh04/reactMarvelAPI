import ErrorMessage from "../errorMessage/ErrorMessage";
import { Link } from "react-router-dom";

const Page404 = () => {
    return (
        <>
        <ErrorMessage />
        <p style={{"textAlign":"center","fontWeight":"bold","fontSize":"24px"}}>Page doens`t exist</p>
        <Link style={{"display":"block","textAlign":"center","fontWeight":"bold","fontSize":"24px"}} to='/'>Back to main</Link>
        </>
    )
}

export default Page404;