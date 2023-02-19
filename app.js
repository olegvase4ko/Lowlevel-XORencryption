const form = document.getElementById('form');
form.addEventListener('submit', getFormValue);
function getFormValue(event) {
    event.preventDefault();
    const word = form.querySelector('[name="word"]');
    const key = form.querySelector('[name="key"]');
    shifr(word.value, key.value);
}

function shifr(message, key) {
    const k = document.getElementById('key');
    const m = document.getElementById('mes');
    const x = document.getElementById('xor');
    const ch = document.getElementById('ch');
    let binKey = [];
    let binMess = [];
    let binXor = [];
    let chXor = [];
    let one = '';
    if (key.length === message.length) {

        for (let i = 0; i < key.length; i++) {
            binKey.push(key[i].toUpperCase().charCodeAt(0).toString(2));
        }

        for (let j = 0; j < message.length; j++) {
            binMess.push(message[j].toUpperCase().charCodeAt(0).toString(2));
        }
        for (let k = 0; k < binKey.length; k++) {
            for (let l = 0; l < binKey[k].length; l++) {

                one += binKey[k][l] ^ binMess[k][l];
            }
            binXor.push(one);
            chXor.push(parseInt(one, 2));
            one = '';
        }

        k.innerHTML = binKey;
        m.innerHTML = binMess;
        x.innerHTML = binXor;
        ch.innerHTML = chXor;
        rashifrovka(key, chXor);
    } else {
        alert(`ключ и сообщение должны быть одной длины
        key and message should be the same size`);
    }
}

// shifr('login', 'begin');

function rashifrovka(key, numbers) {
    const ans = document.getElementById('rash');
    let binMess = [];
    let binKey = [];
    let binXor = [];
    let one = '';
    let res = '';
    for (let i = 0; i < key.length; i++) {
        binKey.push(key[i].toUpperCase().charCodeAt(0).toString(2));
    }

    for (let j = 0; j < numbers.length; j++) {
        binMess.push(addZeros(numbers[j].toString(2)));
    }

    for (let k = 0; k < binKey.length; k++) {
        for (let m = 0; m < binKey[k].length; m++) {
            one += binKey[k][m] ^ binMess[k][m];
        }
        res += String.fromCharCode(parseInt(one, 2));
        binXor.push(one);
        one = '';
    }


    ans.innerHTML = res;
}

function addZeros(x) {
    let res = x;
    let howMuch = 7 - x.length;
    let zeros = '';
    for (let i = 0; i < howMuch; i++) {
        zeros += '0';
    }
    return zeros + x
}