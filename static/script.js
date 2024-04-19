// fetch('/posts/')
//     .then(response => response.json())
//     .then(data => {
//         let postsDiv = document.getElementById('posts');
//         for (let post of data) {
//             let postElement = document.createElement('div');
//             postElement.innerHTML = `
//                 <h2><a href="/post_detail/${post.id}">${post.title}</a></h2>
//                 <p>${post.content}</p>
//                 <p>Author: ${post.author}</p>
//                 <p>Published on: ${new Date(post.pub_date).toLocaleDateString()}</p>
//             `;
//             postsDiv.appendChild(postElement);
//         }
//     })
//     .catch(error => console.error('Error:', error));
// fetch('/posts/')
//     .then(response => response.text())
//     .then(text => {
//         console.log(text);
//         return JSON.parse(text);
//     })
//     .then(data => {
//         // rest of your code
//     })
//     .catch(error => console.error('Error:', error));
// fetch('/posts/')
//     .then(response => response.json())
//     .then(data => {
//         let postsDiv = document.getElementById('posts');
//         for (let post of data) {
//             let postElement = document.createElement('div');
//             postElement.innerHTML = `
//                 <h2><a href="#" data-id="${post.id}" class="post-link">${post.title}</a></h2>
//             `;
//             postsDiv.appendChild(postElement);
//         }

//         // Add click event listeners to post links
//         let postLinks = document.querySelectorAll('.post-link');
//         postLinks.forEach(link => {
//             link.addEventListener('click', function(event) {
//                 event.preventDefault();
//                 let postId = this.getAttribute('data-id');
//                 fetch(`/posts/${postId}/`)
//                     .then(response => response.json())
//                     .then(post => {
//                         // Display post details
//                         let postDetailDiv = document.getElementById('post-detail');
//                         postDetailDiv.innerHTML = `
//                             <h2>${post.title}</h2>
//                             <p>${post.content}</p>
//                             <p>Author: ${post.author}</p>
//                             <p>Published on: ${new Date(post.pub_date).toLocaleDateString()}</p>
//                         `;
//                     })
//                     .catch(error => console.error('Error:', error));
//             });
//         });
//     })
//     .catch(error => console.error('Error:', error));
// let currentPage = 1;

// function fetchPosts() {
//     fetch(`posts/?page=${currentPage}`)
//         .then(response => response.json())
//         .then(data => {
//             let postsDiv = document.getElementById('posts');
//             for (let post of data.results) {
//                 let postElement = document.createElement('div');
//                 postElement.innerHTML = `
//                     <h2><a href="#" data-id="${post.id}" class="post-link">${post.title}</a></h2>
//                 `;
//                 postsDiv.appendChild(postElement);
//             }

//             // Add click event listeners to post links
//             let postLinks = document.querySelectorAll('.post-link');
//             postLinks.forEach(link => {
//                 link.addEventListener('click', function(event) {
//                     event.preventDefault();
//                     let postId = this.getAttribute('data-id');
//                     fetch(`/posts/${postId}/`)
//                         .then(response => response.json())
//                         .then(post => {
//                             // Display post details
//                             let postDetailDiv = document.getElementById('post-detail');
//                             postDetailDiv.innerHTML = `
//                                 <h2>${post.title}</h2>
//                                 <p>${post.content}</p>
//                                 <p>Author: ${post.author}</p>
//                                 <p>Published on: ${new Date(post.pub_date).toLocaleDateString()}</p>
//                             `;
//                         })
//                         .catch(error => console.error('Error:', error));
//                 });
//             });

//             currentPage += 1;
//         })
//         .catch(error => console.error('Error:', error));
// }

// // Fetch the first page of posts when the page loads
// fetchPosts();

// // Fetch the next page of posts when the user scrolls to the bottom of the page
// window.onscroll = function() {
//     if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
//         fetchPosts();
//     }
// };
// let currentPage = 1;

// function fetchPosts() {
//     fetch(`/api/posts/?page=${currentPage}`)
//         .then(response => response.json())
//         .then(data => {
//             let postsDiv = document.getElementById('posts');
//             for (let post of data.results) {
//                 let postElement = document.createElement('div');
//                 postElement.innerHTML = `
//                     <h2><a href="/posts/${post.id}/" class="post-link" data-id="${post.id}">${post.title}</a></h2>
//                     <p>Author: ${post.author_name}</p>
//                     <p>Published on: ${new Date(post.pub_date).toLocaleDateString()}</p>
//                 `;
//                 postsDiv.appendChild(postElement);
//             }

//             // Add click event listeners to post links
//             let postLinks = document.querySelectorAll('.post-link');
//             postLinks.forEach(link => {
//               link.addEventListener('click', function() {
//                 let postId = this.getAttribute('data-id');
//                 window.location.href = `/posts/${postId}/`;  // Navigate to the detail view
//               });
//             });

//             currentPage += 1;
//         })
//         .catch(error => console.error('Error:', error));
// }

// // Fetch the first page of posts when the page loads
// fetchPosts();

// // Fetch the next page of posts when the user scrolls to the bottom of the page
// window.onscroll = function() {
//     if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
//         fetchPosts();
//     }
// };

let currentPage = 1;
let postsDiv = document.getElementById('posts');
let loadMoreButton = document.getElementById('loadMore');

function fetchPosts() {
    fetch(`/api/posts/?page=${currentPage}`)
        .then(response => response.json())
        .then(data => {
            for (let post of data.results) {
                let postElement = document.createElement('div');
                postElement.innerHTML = `
                    <h2><a href="/posts/${post.id}/" class="post-link" data-id="${post.id}">${post.title}</a></h2>
                    <p>Author: ${post.author_name}</p>
                    <p>Published on: ${new Date(post.pub_date).toLocaleDateString()}</p>
                `;
                postsDiv.appendChild(postElement);
            }

            // Add click event listeners to post links
            let postLinks = document.querySelectorAll('.post-link');
            postLinks.forEach(link => {
              link.addEventListener('click', function() {
                let postId = this.getAttribute('data-id');
                window.location.href = `/posts/${postId}/`;  // Navigate to the detail view
              });
            });

            currentPage += 1;

            // If there are more posts to load, show the Load More button
            if (data.next) {
                loadMoreButton.style.display = 'block';
            } else {
                loadMoreButton.style.display = 'none';
            }
        })
        .catch(error => console.error('Error:', error));
}

// Fetch the first page of posts when the page loads
fetchPosts();

// Fetch the next page of posts when the Load More button is clicked
loadMoreButton.addEventListener('click', function() {
    fetchPosts();
});

