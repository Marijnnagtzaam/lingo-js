    var attempts = 0;
    var word = '';
 
    const submit = document.getElementById('submit');
    const input = document.getElementById('userInput');
 
    (function setup() {
        generateRandomWord()
        showFirstLetter()
    })()
 
    
    function generateRandomWord () {
        word = words[Math.floor(Math.random() * words.length)]
        log(new Date(), word)
    }
 
    function showFirstLetter () {
        document.getElementById('word').innerHTML = word.charAt(0);
    }
 
    function addUserGuess(parameter) {
        const parent = document.getElementsByTagName('ul')[0]
        var element = document.createElement('li')
 
        for (var i = 0; i < parameter.length; i++) {
            if (parameter[i].length == 1)
                parameter[i] = '<span class="blue">' + parameter[i] + '</span>'
            element.innerHTML += parameter[i];
        }
 
        element.setAttribute('class', 'guess')
        parent.appendChild(element)
    }
 
    function resetPage () {
        word = ''
        attempts = 0
        input.value = ''
 
        var elements = document.getElementsByTagName('li')
        while (elements.length && elements[0].classList[0] == 'guess')
            elements[0].remove()
 
        togglePage()
    }
 
    function togglePage () {
        var wrapper = document.getElementById('game_wrapper')
        if (wrapper.style.display =='none')
            wrapper.style.display = 'block'
        else
            wrapper.style.display = 'none'
    }
 
    input.onkeypress = function() {
        if ((event.keyCode >= 48 && event.keyCode <= 57) || event.keyCode > 122)
            return false
    }
 
    submit.onclick = function () {
 
        if (!word.length)
            return
 
        var userGuess = []
 
        if (input.value.length != word.length) {
            alert('Je gok moet ' + word.length + ' letters bevatten.')
            return
        }
 
        attempts++;
        if (attempts == 5) {
            alert('Je hebt het maximaal aantal pogingen gehaald, het te raden woord was: ' + word)
            resetPage()
            return;
        }
 
        if (input.value == word) {
            if (attempts > 1)
                alert('Je hebt het woord geraden in: ' + attempts + ' pogingen')
            else
                alert('Je hebt het woord geraden in: ' + attempts + ' pogingen.')
           
            resetPage()
            return
        }
 
        for (var i = 0; i < word.length; i++) {
            if (input.value.charAt(i) == word.charAt(i)) {
                userGuess.push('<span class="red">' + input.value.charAt(i) + '</span>')
                continue
            }
 
            userGuess.push(input.value.charAt(i))
        }
 
        var wordCopy = word;
        for (var i = 0; i < userGuess.length; i++) {
            if (wordCopy.includes(userGuess[i])) {
                for (var j = 0; j < wordCopy.length; j++) {
                    if (wordCopy.charAt(j) === userGuess[i] && userGuess[i] != word.charAt(0)) {
                        userGuess[i] = '<span class="yellow">' + input.value.charAt(i) + '</span>'
                       
                        var wordCopySplit = wordCopy.split("");
 
                        wordCopySplit[j] = '';
                        wordCopySplit.join("");
 
                        wordCopy = '';
                       
                        for (var k = 0; k < wordCopySplit.length; k++)
                            wordCopy += wordCopySplit[k]
                           
                        continue;
                    }
                }          
            }
        }
 
        addUserGuess(userGuess)
        console.log(userGuess)
        input.value = ''
    }
 
    function log (date, string) {
        console.log('[' + date.getHours() + ':' + date.getMinutes() + ":" + date.getSeconds() + '] ' + string)      
    }