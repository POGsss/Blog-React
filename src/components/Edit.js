import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';

function Edit() {
    const { id } = useParams();
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [author, setAuthor] = useState('You');
    const [isPending, setPending] = useState(false);
    const history = useHistory();

    useEffect(() => {
        fetch(`http://localhost:8000/blogs/${id}`)
            .then(response => response.json())
            .then(data => {
                setTitle(data.title);
                setBody(data.body);
                setAuthor(data.author);
            });
    }, [id]);

    const handleUpdate = (e) => {
        e.preventDefault();
        setPending(true);

        const updatedBlog = { title, body, author };

        setTimeout(() => {
            fetch(`http://localhost:8000/blogs/${ id }`, {
                method: 'PUT',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedBlog)
            }).then(() => {
                console.log("Blog updated");
                setPending(false);
                history.push(`/blogs/${ id }`);
            });
        }, 250);
    }

    return(
        <div className="edit">
            <h1>Blog ID - { id }</h1>
            <div className="editPreview">
                <h2>Update the form</h2>
                <form className="editBody" onSubmit={ handleUpdate }>
                    <label>Blog title:</label>
                    <input 
                        type="text" 
                        required 
                        value={ title } 
                        onChange={ (e) => setTitle(e.target.value) }>
                    </input>
                    <label>Blog body:</label>
                    <textarea 
                        required 
                        value={ body } 
                        onChange={ (e) => setBody(e.target.value) }>
                    </textarea>
                    { !isPending && <button className='btn'>Update</button> }
                    { isPending && <button className='btn'>Loading</button> }
                </form>
            </div>
        </div>
    );
}

export default Edit;