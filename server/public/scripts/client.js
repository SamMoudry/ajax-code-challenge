console.log('client.js sourced');

$( document ).ready( onReady );

function onReady() {
    console.log('DOM ready');
    $('#addJokeButton').on('click', addJokes);
    getJokes();
}

function addJokes() {
    let newJoke = {
        whoseJoke: $('#whoseJokeIn').val(),
        jokeQuestion: $('#questionIn').val(),
        punchLine: $('#punchlineIn').val()
    }

    $.ajax({
        method: 'POST',
        url: '/jokes',
        data: newJoke
    })
        .then(function(response) {
            console.log('Added quote', newJoke);
            getJokes();
        })
        .catch(function(error) {
            console.log('Error from server', error);
            alert('Could not send quote.');
        })
    $('#whoseJokeIn').val('');
    $('#questionIn').val('');
    $('#punchlineIn').val('');
}

function getJokes() {
    $.ajax({
        method: 'GET',
        url: '/jokes'
    })
        .then(function(response){
            console.log('Response from server', response);
            render(response);
        })
        .catch(function(error){
            console.log('Error', error);
            alert('Did not get it');
        })
        console.log('After making server request...');
}

function render(array){
    $('#outputDiv').empty();
    for (let i = 0; i < array.length; i++) {
        $('#outputDiv').append(`
        <div>
            <p>${array[i].whoseJoke}</p>
            <p>${array[i].jokeQuestion}</p>
            <p>${array[i].punchLine}</p>
        </div>
        `)  
    }
}