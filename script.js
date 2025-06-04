const arr = [
  {
    "quote": "Success is not final, failure is not fatal: It is the courage to continue that counts.",
    "author": "Winston Churchill"
  },
  {
    "quote": "Be yourself; everyone else is already taken.",
    "author": "Oscar Wilde"
  },
  {
    "quote": "Do not go where the path may lead, go instead where there is no path and leave a trail.",
    "author": "Ralph Waldo Emerson"
  },
  {
    "quote": "The best way to predict the future is to invent it.",
    "author": "Alan Kay"
  },
  {
    "quote": "Life is what happens when you're busy making other plans.",
    "author": "John Lennon"
  },
  {
    "quote": "If you’re going through hell, keep going.",
    "author": "Winston Churchill"
  },
  {
    "quote": "I have not failed. I've just found 10,000 ways that won't work.",
    "author": "Thomas Edison"
  },
  {
    "quote": "A day without laughter is a day wasted.",
    "author": "Charlie Chaplin"
  },
  {
    "quote": "Happiness is not something ready made. It comes from your own actions.",
    "author": "Dalai Lama"
  },
  {
    "quote": "Don’t count the days, make the days count.",
    "author": "Muhammad Ali"
  },
  {
    "quote": "You only live once, but if you do it right, once is enough.",
    "author": "Mae West"
  },
  {
    "quote": "In the middle of difficulty lies opportunity.",
    "author": "Albert Einstein"
  },
  {
    "quote": "The journey of a thousand miles begins with a single step.",
    "author": "Lao Tzu"
  },
  {
    "quote": "Dream big. Start small. Act now.",
    "author": "Robin Sharma"
  },
  {
    "quote": "Whether you think you can or you think you can’t, you’re right.",
    "author": "Henry Ford"
  },
  {
    "quote": "Why fit in when you were born to stand out?",
    "author": "Dr. Seuss"
  },
  {
    "quote": "Sometimes you win, sometimes you learn.",
    "author": "John C. Maxwell"
  },
  {
    "quote": "It always seems impossible until it’s done.",
    "author": "Nelson Mandela"
  },
  {
    "quote": "Everything you can imagine is real.",
    "author": "Pablo Picasso"
  },
  {
    "quote": "Don’t watch the clock; do what it does. Keep going.",
    "author": "Sam Levenson"
  }
]

const button = document.querySelector('#btn');
const quotetodisplay = document.querySelector('.quote'); 
const quoter = document.querySelector('.quoter');
const tweet = document.querySelector('#twitter-link');
const twitterUsername = 'yourusername';
const twitterAppUrl = `twitter://user?screen_name=${twitterUsername}`;
const twitterWebUrl = `https://twitter.com/${twitterUsername}`;
const copy = document.querySelector('#copy-btn');
const readBtn = document.querySelector('#read-btn');

function getRandomquotes(quotesArray)
{
    let index = Math.floor(Math.random()* quotesArray.length);
    return quotesArray[index];
}


button.addEventListener('click', () => {
    let randomquote = getRandomquotes(arr);
    quotetodisplay.innerHTML = randomquote.quote;
    quoter.innerHTML = randomquote.author;

});


tweet.addEventListener('click', function(e){
    e.preventDefault();
    const quoteText = quotetodisplay.innerText.trim();
    const authorText = quoter.innerText.trim();
    const copied = `"${quoteText}" - "${authorText}"`;

    if(navigator.clipboard && window.isSecureContext)
    {
        navigator.clipboard.writeText(copied)
        .then(() => {
            console.log("text copied to clipboard upon clicking the twitter icon");
        })
        .catch((err) => {
            console.log("failed to copy the quote");
        });
    }
    else
    {
        console.log("clipboard api not available or insecure constext");
    }

    window.location = twitterAppUrl;

    setTimeout( () => {
        window.open(twitterWebUrl, '_blank');
    }, 1500);
});

copy.addEventListener('click', () => {
    const quoteText = quotetodisplay.innerText.trim();
    const authorText = quoter.innerText.trim();
    const copied = `"${quoteText}" - "${authorText}"`;
    if(navigator.clipboard && window.isSecureContext)
    {
        navigator.clipboard.writeText(copied)
        .then(() => {
            alert('Text copied to clipboard');
        })
        .catch((err) => {
            alert("Failed to copy the quote");
            console.log(err);
        });
    }
    else
    {
        alert("Clipboard not available or insecure context");
    }
});


readBtn.addEventListener('click', () => {
    const quoteText = quotetodisplay.innerText.trim();
    const authorText = quoter.innerText.trim();
    const textToRead = `"${quoteText}" by ${authorText}`;

    if(!quoteText)
    {
        alert("No quoto to read");
        return;
    }

    const utterance = new SpeechSynthesisUtterance(textToRead);

    if(window.speechSynthesis.speaking)
    {
        window.speechSynthesis.cancel();
    }

    window.speechSynthesis.speak(utterance);
});