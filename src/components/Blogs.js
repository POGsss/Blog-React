import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { HiTrash } from "react-icons/hi";

function Blogs(props) {
    const blogItem = props.blogItem;
    const blogTitle = props.blogTitle;

    const handleRemove = (currentId) => {
        fetch(`http://localhost:8000/blogs/${currentId}`, {
            method: 'DELETE'
        }).then(() => {
            console.log(`Blog with ID ${currentId} deleted`);
            window.location.reload();
        });
    }

    return (
        <div className="blogContainer">
            <h1>{blogTitle}</h1>
            <div className="blogItems">
                {blogItem.map((blog) => (
                    <div className="blogPreview" key={blog.id}>
                        <Link to={`/blogs/${ blog.id }`}>
                            <h2>{ blog.title }</h2>
                            <span>Written by: { blog.author }</span>
                            <div className="blogBody">
                                <p>{ blog.body }</p>
                            </div>
                        </Link>
                        <button onClick={ () => handleRemove(blog.id) } className="btn removeBtn">
                            <HiTrash className="icons"/>
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
 
export default Blogs;