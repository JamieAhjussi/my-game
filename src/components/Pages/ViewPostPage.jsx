import { useParams } from "react-router-dom";
import NavBar from "../contents/NavBar";
import Footer from "../contents/Footer";

function ViewPostPage() {
    const { id } = useParams();
    return (
        <>
        <NavBar/>

        <Footer/>
        </>
    );
}

export default ViewPostPage;