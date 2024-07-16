import express from 'express';
const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

let posts = [];

app.get('/', (req, res) => {
	res.render('index', { posts });
});

// * creating post
app.get('/create', (req, res) => {
	res.render('create');
});

app.post('/create', (req, res) => {
	const { title, content } = req.body;
	posts.push({ title, content });
	res.redirect('/');
});

// * Edit post
// app.js
app.get('/edit/:id', (req, res) => {
	const postId = req.params.id;
	res.render('edit', { postId, post: posts[postId] });
});

app.post('/edit/:id', (req, res) => {
	const postId = req.params.id;
	const { title, content } = req.body;
	posts[postId] = { title, content };
	res.redirect('/');
});

// * Delete Post
// app.js
app.post('/delete/:id', (req, res) => {
	const postId = req.params.id;
	posts.splice(postId, 1);
	res.redirect('/');
});

app.listen(port, () => {
	console.log(`Server running at ${port}`);
});
