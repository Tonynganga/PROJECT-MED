import React, { useState, useEffect,useContext } from 'react';
import { Link } from 'react-router-dom';
import BlogNavbar from '../BlogNavbar';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { getBlogs } from '../../actions/blogs';
import {capitalizeFirstLetter,monthNames} from '../../utils'
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Avatar,
    Grid,
    Typography,
    TablePagination,
    TableFooter,
    makeStyles,
    Button
} from '@material-ui/core';
import { WebSocketService } from '../../websocket';


const useStyles = makeStyles((theme) => ({
    avatar: {
        width: 60,
        height: 60,
        backgroundColor: theme.palette.primary.light,
        color: theme.palette.getContrastText(theme.palette.primary.light)
    },
    name: {
        fontWeight: 'bold',
        color: theme.palette.secondary.dark
    },
    status: {
        fontWeight: 'bold',
        fontSize: '0.75rem',
        color: 'white',
        backgroundColor: 'grey',
        borderRadius: 8,
        padding: '3px 10px',
        display: 'inline-block'
    },
    payment: {
        fontWeight: 'bold',
        fontSize: '0.75rem',
        color: 'white',
        backgroundColor: 'grey',
        borderRadius: 8,
        padding: '3px 10px',
        display: 'inline-block'
    }
}));





function Blog(props) {
    const classes = useStyles();
    const [blogs, setBlogs] = useState([]);
    const [featuredBlog, setFeaturedBlog] = useState([]);
    const ws = useContext(WebSocketService);
    useEffect(() => {
        // props.getBlogs()
        ws.sendMessage('get_blogs',{})
    }, [])
    useEffect(() => {
        if (props.blogs.length > 0) {
            setFeaturedBlog(props.blogs[props.blogs.length - 1])
            setBlogs(props.blogs)
        }
    }, [props.blogs])


    const getBlogs = () => {
        let list = [];
        let result = [];

        blogs.map((blogPost,index) => {
            const datePosted = new Date(blogPost.date_posted)
            return list.push(
                <div key={blogPost.id} className="mb-4 mt-2 overflow-hidden border rounded shadow-sm row no-gutters flex-md-row h-md-250 position-relative">
                    <div className="p-3 col d-flex flex-column position-static">
                        <Grid item lg={2}>
                            <Avatar src={'http://localhost:8000' + blogPost.blogger_profile_pic} className={classes.avatar} />
                            <Typography className={classes.name}>{blogPost.blogger_first_name} {blogPost.blogger_last_name}</Typography>
                        </Grid>

                        {/* <strong className="mb-2 d-inline-block text-primary">{blogPost.category.charAt(0).toUpperCase() + blogPost.category.slice(1)}</strong> */}
                        <h3 className="mb-2 d-inline-block text-primary">
                        <Link to={{
                            pathname: '/blog_details',
                            state: {
                                blog: blogPost,
                                index
                            },
                        }} style={{textDecoration:"none"}} >{capitalizeFirstLetter(blogPost.blog_title)}</Link></h3>
                        <div className="mb-1 text-muted">{monthNames[datePosted.getMonth()]} {datePosted.getDate()}</div>
                        <p className="mb-auto card-text">{blogPost.excerpt}</p>
                        <Link to={{
                            pathname: '/blog_details',
                            state: {
                                blog: blogPost,
                                index
                            },
                        }} className="stretched-link">Continue reading</Link>
                    </div>
                    <div className="col-auto d-none d-lg-block">
                        <img width='200' height='240' src={'http://localhost:8000' + blogPost.thumbnail} alt='thumbnail' />
                    </div>
                </div>
            );
        });

        for (let i = 0; i < list.length; i += 2) {
            result.push(
                <div key={i} className='mb-2 row'>
                    <div className='col-md-6'>
                        {list[i]}
                    </div>
                    <div className='col-md-6'>
                        {list[i + 1] ? list[i + 1] : null}
                    </div>
                </div>
            )
        }

        return result;
    };

    return (
        <div>
            <div className='ml-5 blognav'>
                <BlogNavbar />
            </div>

            <div className='container mt-3'>
                <div className="py-1 mb-2 nav-scroller">
                    <nav className="nav d-flex justify-content-between">
                        <Link className="p-2 text-muted" to='/category/world'>Health Issues</Link>
                        {/* <Link className="p-2 text-muted" to='/category/environment'>Environment</Link>
                        <Link className="p-2 text-muted" to='/category/technology'>Technology</Link>
                        <Link className="p-2 text-muted" to='/category/design'>Design</Link>
                        <Link className="p-2 text-muted" to='/category/culture'>Culture</Link>
                        <Link className="p-2 text-muted" to='/category/business'>Business</Link>
                        <Link className="p-2 text-muted" to='/category/politics'>Politics</Link>
                        <Link className="p-2 text-muted" to='/category/opinion'>Opinion</Link>
                        <Link className="p-2 text-muted" to='/category/science'>Science</Link>
                        <Link className="p-2 text-muted" to='/category/health'>Health</Link>
                        <Link className="p-2 text-muted" to='/category/style'>Style</Link>
                        <Link className="p-2 text-muted" to='/category/travel'>Travel</Link> */}
                    </nav>
                </div>

                <div className="p-4 text-white rounded jumbotron p-md-5 bg-dark">
                    <div className="px-0 col-md-6">
                        <h1 className="display-4 font-italic">{capitalizeFirstLetter(featuredBlog.title)}</h1>
                        <p className="my-3 lead">{featuredBlog.excerpt}</p>
                        <p className="mb-0 lead">
                            <Link to={{
                                pathname: '/blog_details',
                                state: {
                                    blog: featuredBlog,
                                    index:props.blogs.length - 1,
                                },
                            }} className="text-white font-weight-bold">
                                Continue reading...
                            </Link>
                        </p>
                    </div>
                </div>

                {getBlogs()}
            </div>
        </div>


    );
}

Blog.propTypes = {
    blogs: propTypes.array.isRequired,
    getBlogs: propTypes.func.isRequired,
};
const mapStateToProps = state => ({
    blogs: state.blogs.blogs,
});

export default connect(mapStateToProps, { getBlogs })(Blog)

