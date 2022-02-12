// 1. 4 suits, each 13 cards
// 2. face value = 10pt, ace = 1 || 11, number cards = own val
// 3. 3 players dealt 2 cards to start, just like table, 1 at a time
// 4. score = sum of pts
// 5. 16 pts = hit, above is hold and below is hit
// 6. highest score not over 21 = winner
// 7. no input, just output the winner (player 1, 2,3) and their score

const players = [
    { name: 'player 1', score: 0, hasAce: false },
    { name: 'player 2', score: 0, hasAce: false },
    { name: 'player 3', score: 0, hasAce: false },
];

// TODO: maybe use hashmap
const singleSuitSubdeck = [2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10, 'A'];

// TODO: double check destructure location, maybe need to map to dereference
// const actualDeck = new Array(4)
//   //   .fill("foo")
//   .map((stub) => [...singleSuitSubdeck]);

let actualDeck = [];
actualDeck.push(...singleSuitSubdeck);
actualDeck.push(...singleSuitSubdeck);
actualDeck.push(...singleSuitSubdeck);
actualDeck.push(...singleSuitSubdeck);

// TODO: possible extraneous method
const getPlayerNameWithScore = (player) => {
    return player;
};

const getSingleCard = () => {
    const cardCount = actualDeck.length;
    const step = 1 / cardCount;
    const randomResult = Math.floor(step * Math.random());
    // TODO: remove card from deck;
    return actualDeck[randomResult];
};

const updatePlayerScore = (card, player) => {
    if (typeof card === 'number') {
        player.score += card;
    } else {
        console.log({ card });
        // TODO: decide whether to use ace as 1 or 11
        throw new Error('Aces not yet supported');
    }
};

const doGame = () => {
    const multiplePossibleWinners = {};

    for (const player of players) {
        const currCard = getSingleCard();
        updatePlayerScore(currCard, player);
    }

    for (const player of players) {
        const currCard = getSingleCard();
        updatePlayerScore(currCard, player);
    }

    // TODO: keep drawing for some players recursively

    const possibleWinners = players.map((currPlayer) => getPlayerNameWithScore(currPlayer)).filter((currPlayer) => currPlayer.score <= 21);

    if (possibleWinners.length === 0) {
        return [];
    }

    const winner = possibleWinners.reduce((acc, curr) => {
        const hasTie = acc.score === curr.score;

        if (hasTie) {
            multiplePossibleWinners[acc.name] = 1;
            multiplePossibleWinners[curr.name] = 1;
        }

        const preferredPlayer = acc.score > curr.score ? acc : curr;
        return preferredPlayer;
    }, possibleWinners[0]);

    const tiedEntries = Object.entries(multiplePossibleWinners);
    if (tiedEntries.length) {
        // because there are less than 4 players, this logic works
        const hasTieWithHighestScore = tiedEntries[0][1] >= winner[1];
        if (hasTieWithHighestScore) {
            return multiplePossibleWinners;
        }
    }

    return winner;
};

const main = () => {
    const winner = doGame();
    return winner;
};

// TODO: verify w single, two, or three winners, with and without ace scenario
// should log eg ["player 1", 20]
console.log(main());
