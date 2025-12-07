/*hamburger menu*/

const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('show');
    hamburger.classList.toggle('open');
});


/*validálás - jegyek.html --------------------------------------------------------------*/
const form = document.getElementById("urlap");

//elemek referenciái
const nevInput = document. getElementById("nev");
const emailInput = document.getElementById("email");
const telInput = document.getElementById("telefon");
const szulInput = document.getElementById("szuldatum");
const jegyInput = document.getElementById("jegytipus");

//hibaüzenet tárolók

const errorNev = document.getElementById("error-name");
const errorEmail = document.getElementById("error-email");
const errorTel = document.getElementById("error-tel");
const errorSzul = document.getElementById("error-date");
const errorJegy = document.getElementById("error-jegytipus");
const successMsg = document.getElementById("form-success");


form.addEventListener('submit', function(event) {
    let isValid = true;

    // 1. Töröljük az előző hibaüzeneteket és stílusokat
    const errors = document.querySelectorAll('.error-msg');
    errors.forEach(el => el.textContent = '');
    const inputs = document.querySelectorAll('input, select');
    inputs.forEach(el => el.classList.remove('input-error'));

    // --- VALIDÁCIÓK ---

    // Név ellenőrzése (nem lehet üres)
    if (nevInput.value.trim() === "") {
        errorNev.textContent = "A név megadása kötelező!";
        nevInput.classList.add('input-error');
        isValid = false;
    }

    // Email ellenőrzése
    const emailFor = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailInput.value.trim() === "" || !emailFor.test(emailInput.value.trim())) {
        errorEmail.textContent = "Hibás email formátum!";
        emailInput.classList.add("input-error");
        isValid = false;
    }

    // Telefon helyes formátum
    const telFor = /^\+36\s?\d{1,2}\s?\d{3}\s?\d{4}$/;
    if (telInput.value.trim() === "" || !telFor.test(telInput.value.trim())) {
        errorTel.textContent = "Hibás telefonszám formátum! Helyes: +36 30 123 4567";
        telInput.classList.add('input-error');
        isValid = false;
    }

    // Születési dátum (nem lehet jövőbeni / irreális)
    const today = new Date();
    const birthDate = new Date(szulInput.value);

    if (!szulInput.value) {
        errorSzul.textContent = "A dátum megadása kötelező!";
        szulInput.classList.add("input-error");
        isValid = false;
    } else if (birthDate > today) {
        errorSzul.textContent = "A születési dátum nem lehet jövőbeni!";
        szulInput.classList.add("input-error");
        isValid = false;
    }

    // Jegytípus (kötelező)
    if (jegyInput.value === "") {
            errorJegy.textContent = "Kérlek válassz jegytípust!";
            jegyInput.classList.add('input-error');
            isValid = false;
    }


    // döntés?
    if (!isValid) {
        event.preventDefault();
        console.log("Hiba az űrlapon!");
    } else {
        successMsg.textContent = "Sikeres foglalás!";
        console.log("Űrlap sikeresen elküldve!")
    }
});

