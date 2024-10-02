// Add event listener to the form
document.getElementById("ageForm").addEventListener("submit", function(event) {
    event.preventDefault(); 

    const birthdateInput = document.getElementById("birthdate");
    const birthdate = new Date(birthdateInput.value);
    const currentDate = new Date(); 
    
    // Reset the error state
    birthdateInput.classList.remove("error");

    // Check if the selected date is in the future
    if (birthdate > currentDate) {
        // Show not born yet message
        document.getElementById("result").textContent = "Sorry! You are not born yet.";
        birthdateInput.classList.add("error"); // Add error class to the input
        showCharacter("notBornCharacter"); // Show different character
        return;
    }

    let ageYears = currentDate.getFullYear() - birthdate.getFullYear();
    let ageMonths = currentDate.getMonth() - birthdate.getMonth();
    
    if (ageMonths < 0) {
        ageYears--;
        ageMonths += 12;
    }
    if (currentDate.getDate() < birthdate.getDate()) {
        ageMonths--;
    }

    const ageInDays = Math.floor((currentDate - birthdate) / (1000 * 60 * 60 * 24));
    let resultText = '';
    if (ageInDays < 30) {
        resultText = `Your age is less than a month.`; 
    } else if (ageYears > 0 && ageMonths > 0) {
        resultText = `You are ${ageYears} ${ageYears === 1 ? 'year' : 'years'} and ${ageMonths} ${ageMonths === 1 ? 'month' : 'months'} old.`;
    } else if (ageYears > 0) {
        resultText = `You are ${ageYears} ${ageYears === 1 ? 'year' : 'years'} old.`;
    } else if (ageMonths > 0) {
        resultText = `You are ${ageMonths} ${ageMonths === 1 ? 'month' : 'months'} old.`;
    }

    document.getElementById("result").textContent = resultText;

    // Trigger confetti
    confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 }
    });

    // Show the main character animation
    showCharacter("character");
});

function showCharacter(characterId) {
    const character = document.getElementById(characterId);
    character.classList.add('show');
    character.classList.add('bounce');  // Adds bounce animation

    // Hide character after 5 seconds
    setTimeout(() => {
        character.classList.remove('show');
        character.classList.remove('bounce');  // Removes bounce animation
    }, 5000);
}