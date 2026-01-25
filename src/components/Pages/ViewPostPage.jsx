import { useParams } from "react-router-dom";
import NavBar from "../contents/NavBar";
import Footer from "../contents/Footer";
import ViewPost from "../contents/ViewPost";

function ViewPostPage() {
    const { id } = useParams();
    return (
        <>
        <NavBar/>
        <ViewPost postId={id}/>
        <Footer/>
        </>
    );
}

export default ViewPostPage;