

postContainer = document.querySelector('.post-container');

function newPost(){
    if(document.querySelectorAll('.form-post').length < 1){
        const newFormButton = document.querySelector('.new-post');
        const form = document.createElement("form");
        const titleDiv = document.createElement("div");
        const titleLabel = document.createElement("label");
        const titleInput = document.createElement("input");
        const textDiv = document.createElement("div");
        const textLabel = document.createElement("label");
        const textInput = document.createElement("textarea");
        const submitButton = document.createElement("button")

        form.setAttribute('class','form-post')

        titleDiv.setAttribute('class','form-group');
        titleLabel.textContent = 'Post Title'
        titleInput.setAttribute('type','text')
        titleInput.setAttribute('class','form-control')
        titleInput.setAttribute('id','post-title')
        titleInput.setAttribute('placeholder','Post title')

        textDiv.setAttribute('class','form-group');
        textLabel.textContent = "Post content";
        textInput.setAttribute('class', 'form-control');
        textInput.setAttribute('id','post-text')
        textInput.setAttribute('placeholder','Write your post here!')

        submitButton.textContent = "Post it!";
        submitButton.setAttribute('type','submit');
        submitButton.setAttribute('class','btn btn-primary submit-post')



        titleDiv.appendChild(titleLabel);
        titleDiv.appendChild(titleInput);

        textDiv.appendChild(textLabel);
        textDiv.appendChild(textInput);

        form.appendChild(titleDiv);
        form.appendChild(textDiv);
        form.appendChild(submitButton);

        postContainer.appendChild(form)
        
        newFormButton.remove();

    }
    
    
    
}

async function submitPost(event){
    event.preventDefault();
        console.log('submit post')
        const title = document.querySelector('#post-title').value;
        const textContent = document.querySelector('#post-text').value;
        const date = moment().format("MMM Do, YYYY");
        if (title && textContent && date) {
            const response = await fetch('/api/post/new', {
              method: 'POST',
              body: JSON.stringify({ title, textContent, date}),
              headers: { 'Content-Type': 'application/json' },
            });
            if(response.ok){
                document.location.replace('/dashboard')
            }

      };
}



document.body.addEventListener('click', function(event){
    if(event.target.classList.contains('new-post')) {
        newPost()
      };
})

document.body.addEventListener('click', function (event){
    if(event.target.classList.contains('submit-post')) {
        submitPost(event)
}})

