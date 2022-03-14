const suggestionList = document.querySelector('#suggestions') as HTMLInputElement
const sun = document.querySelector('#sun') as HTMLInputElement
const moon = document.querySelector('#moon') as HTMLInputElement
const rising = document.querySelector('#rising') as HTMLInputElement

sun.addEventListener("change", postAndUpdate);
moon.addEventListener("change", postAndUpdate);
rising.addEventListener("change", postAndUpdate);

type MatchesRequestData = {
    [key: string] : string
}

type Matches = {
    "matches" : string[];
}

function postAndUpdate(): void {
    suggestionList.innerHTML = ''
    const postParameters : MatchesRequestData = {
        "sun" : sun.value,
        "moon" : moon.value,
        "rising" : rising.value,
    };

    console.log(postParameters);
    console.log(JSON.stringify(postParameters));
    const result : Promise<Response> = fetch("http://localhost:4567/matches", {
        method: 'post',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
            "Access-Control-Allow-Origin":"*"
        },
        body: JSON.stringify(postParameters),
    })

// TODO: make a POST request using fetch to the URL to handle this request you set in your Main.java
    //  HINT: check out the POST REQUESTS section of the lab and of the front-end guide.
    //  Make sure you add "Access-Control-Allow-Origin":"*" to your headers.
    //  Remember to add a type annotation for the response data using the Matches type you defined above!

    // TODO: Call and fill in the updateSuggestions method in one of the .then statements in the Promise
    //  Parse the JSON in the response object
    //  HINT: remember to get the specific field in the JSON you want to use
        result.then((response) => response.json())
        .then((data : Matches) => {
            console.log(data.matches);
            updateSuggestions(data.matches);
        })
}

function updateSuggestions(matches: string[]): void {
    // TODO: for each element in the set of matches, append it to the suggestionList
    //  HINT: use innerHTML += to append to the suggestions list
    //  NOTE: you should use <li> (list item) tags to wrap each element. When you do so,
    //  make sure to add the attribute 'tabindex="0"' (for example: <li tabindex="0">{your element}</li>).
    //  This makes each element selectable via screen reader.
    console.log(matches);
    for (let i = 0; i < matches.length; i++) {
        console.log(matches[i]);
        suggestionList.innerHTML += `<li tabindex = "0"> ${matches[i]} </li>`
    }

    // matches.forEach((match : string) => {
    //     suggestionList.innerHTML += `<li tabindex = "0"> ${match} </li>`
    // });
}

// TODO: create an event listener to the document (document.addEventListener) that detects "keyup".
//  When a certain key of your choice is clicked, reset the values of sun, moon, and rising to your own
//  values for the sun, moon, and rising using updateValues. Then call postAndUpdate().
//  HINT: the listener callback function should be asynchronous and wait until the values are
//  updated before calling postAndUpdate().
document.addEventListener("keyup", async (e: KeyboardEvent) => {
    if (e.key == "r") {
        await updateValues("Gemini", "Gemini", "Leo");
        postAndUpdate();
    }
});

async function updateValues(sunval: string, moonval: string, risingval: string): Promise<void>{
    // This line asynchronously waits 1 second before updating the values.
    // It's unnecessary here, but it simulates asynchronous behavior you often have to account for.
    await new Promise(resolve => setTimeout(resolve, 1000));

    sun.value = sunval;
    moon.value = moonval;
    rising.value = risingval;
}
