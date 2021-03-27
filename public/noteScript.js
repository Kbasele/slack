document.addEventListener('DOMContentLoaded', (e)=>{
    
    const form = document.getElementById('noteForm')
    const deletBtn = document.querySelectorAll('.deleteBtn')

    form.addEventListener('click', async (e)=>{
        const formInput = document.getElementById('formInput').value
        e.preventDefault()
        await fetch('/notes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                formInput, 
                userID
            })
        }).then(() => {
            window.location.href = '/dashboard';
        });
        
    })

    for(item of deletBtn){
        item.addEventListener('click', async (e)=>{
            const noteID = e.target.attributes.name.nodeValue
            await fetch(`/notes/${noteID}`, {
                method: 'DELETE',
            }).then(() => {
                window.location.href = '/dashboard';
            });
        })
    }

    
})
