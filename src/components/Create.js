import { useHistory } from 'react-router-dom';
import { useState } from 'react';

function Create() {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [author, setAuthor] = useState('You');
    const [isPending, setPending] = useState(false);
    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();
        setPending(true);
        
        fetch(`http://localhost:8000/blogs`)
        .then(response => response.json())
        .then(data => {
            const blogs = data;
            const maxId = blogs.length > 0 ? Math.max(...blogs.map(blog => blog.id)) : 0;
            const newId = (maxId + 1).toString();

            const blog = { id: newId, title, body, author };
            
            setTimeout(() => {
                fetch(`http://localhost:8000/blogs`, {
                    method: 'POST',
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(blog)
                }).then(() => {
                    console.log("New blog added");
                    setPending(false);
                    history.push('/');
                });
            }, 250);
        });
    }

    return(
        <div className="create">
            <h1>Add a new blog</h1>
            <div className="createPreview">
                <h2>Fill out the form</h2>
                <form className="createBody" onSubmit={ handleSubmit }>
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
                    <label>Author:</label>
                    <select value={ author } onChange={ (e) => setAuthor(e.target.value) }>
                        <option value="you">You</option>
                        <option value="Tom">Tom</option>
                        <option value="Dan">Dan</option>
                    </select>
                    { !isPending && <button className='btn'>Confirm</button> }
                    { isPending && <button className='btn'>Loading</button> }
                </form>
            </div>
        </div>
    );
}

export default Create;