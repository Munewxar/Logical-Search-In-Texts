let locale_HTML, page;

const colors = {
    1: '#FFFF66',
    2: '#FF6666',
    3: '#FF0066',
    4: '#CC00CC',
    5: '#9933FF'
}

function func() {
    var span = document.createElement('span');
    span.innerHTML = document.body.innerHTML;
    page = document.body.innerHTML;
    locale_HTML = span.textContent || span.innerText; // сохраняем в переменную весь body (Первоначальный)
}
setTimeout(func, 1000); //ждем подгрузки Jsona и выполняем

function find(textToFindEl) {
    let textToFindValue = document.getElementById(textToFindEl).value;

    if (textToFindValue.length < 3) {
        alert('Need 3 or more symbols!');
        cancelSearch();
    }

    if (textToFindValue.length > 2) {
        function handleSearch() {

            let evaluate = (text) => {
                let arr = textToFindValue.split(' ');
                let textToFindModified = textToFindValue;

                for (let i = 0; i < arr.length; i++) {
                    if (arr[i] === '!') {
                        let regExp = new RegExp('[^A-Za-z]' + arr[i + 1] + '[^A-Za-z]', 'gi');

                        if (text.match(regExp)) {
                            return false;
                        } else {
                            textToFindModified = textToFindModified.replace(arr[i] + ' ' + arr[i + 1], '');
                            arr[i] = '';
                            arr[i + 1] = '';
                        }
                    }
                }

                for (let i = 0; i < arr.length; i++) {
                    if (arr[i] === '|') {
                        let regExp1 = new RegExp('[^A-Za-z]' + arr[i - 1] + '[^A-Za-z]', 'gi');
                        let regExp2 = new RegExp('[^A-Za-z]' + arr[i + 1] + '[^A-Za-z]', 'gi');

                        if (text.match(regExp1) && text.match(regExp2)) {
                            textToFindModified = textToFindModified.replace(arr[i], '&');
                            arr[i] = '&';
                        } else if (text.match(regExp1)) {
                            textToFindModified = textToFindModified.replace(arr[i] + ' ' + arr[i + 1], '');
                            arr[i] = '';
                            arr[i + 1] = '';
                        } else if (text.match(regExp2)) {
                            textToFindModified = textToFindModified.replace(arr[i] + ' ' + arr[i - 1], '');
                            arr[i] = '';
                            arr[i - 1] = '';
                        }
                    }
                }

                for (let i = 0; i < arr.length; i++) {
                    if (arr[i] === '&') {
                        let regExp1 = new RegExp('[^A-Za-z]' + arr[i - 1] + '[^A-Za-z]', 'gi');
                        let regExp2 = new RegExp('[^A-Za-z]' + arr[i + 1] + '[^A-Za-z]', 'gi');

                        if (!(text.match(regExp1) && text.match(regExp2))) {
                            return false;
                        }
                    }
                }

                textToFindModified = textToFindModified.replace(/\s*/gi, '');
                return textToFindModified;
            };

            let currentTextIndex = 1;

            while (document.getElementById('text-' + currentTextIndex)) {
                let text = document.getElementById('text-' + currentTextIndex).innerHTML;

                let findInTextResult = evaluate(text);

                if (findInTextResult) {
                    let words = findInTextResult.split('&');
                    let currentText = document.getElementById('text-' + currentTextIndex).innerHTML;

                    let randomColorIndex = Math.floor(Math.random() * Math.floor(5)) + 1;
                    let backgroundColor = colors[randomColorIndex];

                    for (let i = 0; i < words.length; i++) {
                        let reqExp = new RegExp('(?<=[^A-Za-z])' + words[i] + '(?=[^A-Za-z])', 'gi');
                        let newText = '<span style="background-color:' + backgroundColor + '">' + words[i] + '</span>';
                        currentText = currentText.replace(reqExp, newText);
                        document.getElementById('text-' + currentTextIndex).innerHTML = currentText;
                    }

                    let element = document.getElementById("container-" + currentTextIndex);
                    element.style["display"] = "block";
                } else {
                    document.getElementById('container-' + currentTextIndex).style['display'] = 'none';
                }

                currentTextIndex = currentTextIndex + 1;
            }
        }
    }

    function cancelSearch() {
        document.body.innerHTML = page;
    }

    cancelSearch();
    handleSearch();
}