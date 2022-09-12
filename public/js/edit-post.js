
async function postDetails(event){
    let idTarget = event.target.id;

    let response = await fetch(`/api/post/${idTarget}`,{
        method: 'GET'
    })
    .then((response)=> response.json())
    .then((data)=> {
        const modal = document.querySelector('.modal-body');
        modal.innerHTML ="";
        const form = document.createElement("form");
        const titleDiv = document.createElement("div");
        const titleLabel = document.createElement("label");
        const titleInput = document.createElement("textarea");
        const textDiv = document.createElement("div");
        const textLabel = document.createElement("label");
        const textInput = document.createElement("textarea");
        const submitButton = document.createElement("button");
        const deleteButton = document.createElement("button")


        form.setAttribute('class','form-post')
        form.setAttribute('id',`${data.id}`)

        titleDiv.setAttribute('class','form-group');
        titleLabel.textContent = 'Post Title'
        titleInput.setAttribute('type','text')
        titleInput.setAttribute('class',`form-control`)
        titleInput.setAttribute('id','post-title')
        titleInput.textContent = data.title

        textDiv.setAttribute('class','form-group');
        textLabel.textContent = 'Post Content';
        textInput.setAttribute('class', 'form-control');
        textInput.setAttribute('id','post-text')
        textInput.textContent = data.textContent

        submitButton.textContent = "Update Post";
        submitButton.setAttribute('type','submit')
        submitButton.setAttribute('class','btn btn-primary update-post');

        deleteButton.textContent = "Delete Post";
        deleteButton.setAttribute('type','submit')
        deleteButton.setAttribute('class','btn btn-danger delete-post')

        titleDiv.appendChild(titleLabel);
        titleDiv.appendChild(titleInput);

        textDiv.appendChild(textLabel);
        textDiv.appendChild(textInput);

        form.appendChild(titleDiv);
        form.appendChild(textDiv);
        form.append(submitButton)
        form.append(deleteButton)
        
        modal.appendChild(form)

        
        
    })
}

async function updatePost(event){
    event.preventDefault();
    const title = document.querySelector('#post-title').value;
    const textContent = document.querySelector('#post-text').value;
    const id = document.querySelector('.form-post').id
    console.log(id)
    const response = await fetch(`/api/post/${id}`,{
        method: 'PUT',
        body: JSON.stringify({
            title,
            textContent
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })

    if(response.ok){
        const updateButton = document.querySelector('.update-post');
        updateButton.textContent = 'Updated!'
    }
}

async function deletePost(event){
    event.preventDefault();
    const id = document.querySelector('.form-post').id
    const response = await fetch(`api/post/${id}`,{
        method:'DELETE'
    })
    if(response.ok){
        document.location.replace('/dashboard')
    } else{
        alert(response.statusText)
    }

}


document.body.addEventListener('click', function(event){
    if(event.target.classList.contains('update-post')) {
        updatePost(event);
      };
})


document.body.addEventListener('click', function(event){
    if(event.target.classList.contains('post-title-card')) {
        postDetails(event);
      };
})

document.body.addEventListener('click', function(event){
    if(event.target.classList.contains('close-btn')) {
        document.location.replace('/dashboard')
      };
})

document.body.addEventListener('click', function(event){
    if(event.target.classList.contains('delete-post')) {
        deletePost(event);

      };
})