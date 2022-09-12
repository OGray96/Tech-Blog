
async function logout(){
    console.log('hello')
    const response = await fetch('/api/users/logout',{
        method: 'POST',
        headers: {'Content-Type': 'application/json'}
    })
}

logout()