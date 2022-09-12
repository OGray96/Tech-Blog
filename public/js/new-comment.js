async function newComment(event){
    event.preventDefault();
    const id = event.target.id
    let response = await fetch(`/api/post/${id}`,{
        method: 'GET'
    })
    .then((response) => response.json())
    .then((data) =>{
        console.log(data)
        const modal = document.querySelector('.modal-homepage');
        modal.innerHTML ="";

        const form = document.createElement('form');
        const commentsDiv = document.createElement('div');
        const postDiv = document.createElement('div');
        const postTitle = document.createElement('h3');
        const postContent = document.createElement('p');

        postTitle.textContent = data.title + " - " + data.user.name;
        postContent.textContent = data.textContent;


        postDiv.appendChild(postTitle);
        postDiv.appendChild(postContent);


        modal.appendChild(postDiv);
        modal.appendChild(commentsDiv);
        modal.appendChild(form);

        const label = document.createElement('label');
        const comment = document.createElement("textarea");
        const button = document.createElement("button");
        
        for(i=0; i<data.comments.length; i++){
            const postComment = document.createElement('p');
            postComment.textContent = data.comments[i].comment + " | Commented at: " + data.comments[i].date;
            commentsDiv.appendChild(postComment)
        }

        form.setAttribute('class','form-post');
        label.textContent = 'Comment';
        comment.setAttribute('type','text');
        comment.setAttribute('class',`form-control comment`);
    
        button.textContent = "Add Comment";
        button.setAttribute('type','submit')
        button.setAttribute('class','btn btn-primary update-post')
        button.setAttribute('id',data.id)
    
        form.appendChild(label);
        form.appendChild(comment);
        form.appendChild(button);
    
    })
}

async function createComment(event){
    event.preventDefault();
    const comment = document.querySelector('.comment').value;
    const post_id = document.querySelector('.update-post').id
    const date = moment().format("MMM Do, YYYY");
    const response = await fetch(`/api/comment/new`,{
        method: 'POST',
        body: JSON.stringify({
            comment,
            date,
            post_id
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    if(response.ok){
        const updateButton = document.querySelector('.update-post');
        updateButton.textContent = 'Added!';
        newComment(event);
    }

}



document.body.addEventListener('click', function(event){
    if(event.target.classList.contains('post-account-homepage')) {
        newComment(event);
      };
})

document.body.addEventListener('click', function(event){
    if(event.target.classList.contains('update-post')) {
        createComment(event);
      };
})