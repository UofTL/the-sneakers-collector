async function deleteFormHandler(event) {
    event.preventDefault();

    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    const response = await fetch(`/api/sneakers/${id}`, {
        method: 'DELETE',
        body: JSON.stringify({
            sneakers_id: id
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        document.location.replace('/collection/');
    } else {
        alert(response.statusText);
    }

}

document.querySelector('#delete-sneakers-btn').addEventListener('click', deleteFormHandler);