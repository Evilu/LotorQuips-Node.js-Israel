const quips = [
    {
        user: 'Gimli',
        quip: 'Let Them Come. There Is One Dwarf Yet In Moria Who Still Draws Breath.'
    },
    {
        user: 'Gimli',
        quip: 'Nobody Tosses A Dwarf!'
    },
    {
        user: 'Gimli',
        quip: 'And My Axe.'
    },
    {
        user: 'Gimli',
        quip: 'Aye. I Could Do That.'
    },
    {
        user: 'Gandelf',
        quip: 'There is only one lord of the rings. And he does not share power!'
    }
]
setInterval(function () {
    const picker = Math.floor(Math.random() * quips.length);
    console.log(`${quips[picker].user}: "${quips[picker].quip}"`)
}, 3000);
