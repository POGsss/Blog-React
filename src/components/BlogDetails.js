import { useParams, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { HiTrash, HiPencilAlt } from "react-icons/hi";
import useFetch from '../custom-hooks/useFetch';

function BlogDetails() {
    const { id } = useParams();
    const { data: blogs, isLoading, error } = useFetch(`http://localhost:8000/blogs/${ id }`);
    const history = useHistory();

    const handleRemove = () => {
        fetch(`http://localhost:8000/blogs/${id}`, {
            method: 'DELETE'
        }).then(() => {
            console.log(`Blog with ID ${id} deleted`);
            history.push('/');
        });
    }

    const handleEdit = () => {
        history.push(`/edit/${id}`);
    }

    return (
        <div className="blogDetails">
            { isLoading  && <div>Loading content...</div> }
            { error && <div>{ error }</div> }

            { blogs && (
                <div className="blogContainer">
                    <h1>Blog ID - { id }</h1>
                    <div className="blogDetailPreview">
                        <h2>{ blogs.title }</h2>
                        <span>Written by: { blogs.author }</span>
                        <div className="blogDetailBody">
                            <p>{ blogs.body }</p>
                        </div>
                        <button onClick={ handleRemove } className="btn removeBtn">
                            <HiTrash className="icons"/>
                        </button>
                        <button onClick={ handleEdit } className="btn editBtn">
                            <HiPencilAlt className="icons"/>
                        </button>
                    </div>
                </div>
            ) }
        </div>
    );
}

export default BlogDetails;