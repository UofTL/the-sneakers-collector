async function newSneakersHandler(event) {
    event.preventDefault();

    const name = document.querySelector('#sneakers').value.trim();
    const sneakers_size = document.querySelector('#size').value.trim();
    const price_paid = document.querySelector('#retail-price').value.trim();
    const resell_value = document.querySelector('#resale-price').value.trim();
    const notes = document.querySelector('#notes').value.trim();

    const response = await fetch(`/api/sneakers`, {
        method: 'POST',
        body: JSON.stringify({
            name,
            sneakers_size,
            price_paid,
            resell_value,
            notes
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        document.location.replace('/collection');
    } else {
        alert(response.statusText);
    }
}

document.querySelector('.new-sneakers').addEventListener('submit', newSneakersHandler);