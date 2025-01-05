import React, { useState } from 'react';
import Blogs from './Blogs';
import useFetch from '../custom-hooks/useFetch';

function Home() {
    const {data: blogs, isLoading, error} = useFetch(`http://localhost:8000/blogs/`);
    const [selectedAuthor, setSelectedAuthor] = useState('All');

    const handleAuthorChange = (e) => {
        setSelectedAuthor(e.target.value);
    }

    const filteredBlogs = selectedAuthor === 'All' ? blogs : blogs.filter(blog => blog.author === selectedAuthor);

    return (
        <div className="Homepage">
            { isLoading  && <div>Fetching data...</div> }
            { error && <div>{ error }</div> }

            <select className="filter" value={ selectedAuthor } onChange={ handleAuthorChange }>
                <option value="All">All</option>
                <option value="You">You</option>
                <option value="Tom">Tom</option>
                <option value="Dan">Dan</option>
            </select>

            { blogs && <Blogs blogItem={ filteredBlogs } blogTitle="Blog List"/> }
        </div>
    );
}

export default Home;