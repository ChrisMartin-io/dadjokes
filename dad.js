$(document).ready(function() {
    console.log('loaded');
    
    for (let i = 0; i < 10; i++) {
        getJokes(i);
    }
    resetButton();
});

const jokeRankings = [];
const jokeText = [];
const jokeRanks = {};

function resetButton() {
    $('#jokes').prepend('<button id="reset">Reset</button>');
    $('#reset').on('click', function() {
        sortRanks();
    })
}

async function getJokes(i) {
    let joke = await axios.get("https://icanhazdadjoke.com/", {headers: {Accept:'text/plain'}});
    printJoke(joke, i);
    jokeText[i] = joke.data;
    jokeRanks[jokeText[i]] = 0;
}


function printJoke(joke, i) {
    jokeRankings[i] = 0;

    $('#jokes').append(`<p id="joke${i}">${joke.data}</p>`);
    $(`#joke${i}`).append(`   <span>Rank: ${jokeRankings[i]}<span>`);
    $(`#joke${i}`).append('<button class="y">Y</button>');
    $(`#joke${i}`).append('<button class="n">N</button>');

    $(`#joke${i} > button.y`).on('click', function() {
        rankUp(joke.data, i);
    });
    $(`#joke${i} > button.n`).on('click', function() {
        rankDown(i);
    });
}

function rankUp(joke, i) {
    jokeRankings[i]++;
    $(`#joke${i} > span`).html(`   Rank: ${jokeRankings[i]}`);
    jokeRanks[joke]++;
}
function rankDown(i) {
    jokeRankings[i]--;
    $(`#joke${i} > span`).html(`   Rank: ${jokeRankings[i]}`);
}

function sortRanks() {


    var sortable = [];
    for (var ranking in jokeRanks) {
        sortable.push([ranking, jokeRanks[ranking]]);
    }
    
    sortable.sort(function(a, b) {
        return a[1] - b[1];
    });

    console.log(sortable);

    $('#jokes').html('');

    for (let i=9; i>=0; i--) {
   
        $('#jokes').append(`<p id="joke${i}">${sortable[i].slice(0, -1)}</p>`);
        $(`#joke${i}`).append(`   <span>Rank: ${sortable[i].slice(-1)}<span>`);
        // // $(`#joke${i}`).append('<button class="y">Y</button>');
        // // $(`#joke${i}`).append('<button class="n">N</button>');
    
        // // // $(`#joke${i} > button.y`).on('click', function() {
        // // //     rankUp(joke.data, i);
        // // // });
        // // // $(`#joke${i} > button.n`).on('click', function() {
        // // //     rankDown(i);
        // });
    }
}

