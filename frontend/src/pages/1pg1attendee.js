// Loading screen styles
const loadingScreenStyles = `
    #loading-screen {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: white;
        display: flex;
        justify-content: center;
        align-items: center;
        color: black;
        font-family: Arial, sans-serif;
        font-size: 24px;
        z-index: 9999;
    }
`;

// Add loading screen to the document
const loadingScreen = document.createElement('div');
loadingScreen.id = 'loading-screen';
loadingScreen.textContent = 'Loading...';
document.body.appendChild(loadingScreen);

// Add loading screen styles
const styleSheet = document.createElement('style');
styleSheet.textContent = loadingScreenStyles;
document.head.appendChild(styleSheet);

// Safety timeout to forcibly remove the loading screen
const safetyTimeout = setTimeout(() => {
    console.warn("Loading screen removed by safety timeout.");
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) loadingScreen.remove();
}, 5000); // 5-second timeout

window.onload = function () {
    console.log("Window loaded. Initializing the form navigation...");

    setTimeout(() => {
        try {
            console.log("Applying basic styles...");
            document.body.style.fontFamily = "Arial, sans-serif";
            document.body.style.margin = "0";
            document.body.style.padding = "20px";

            const attendeeForms = Array.from(document.querySelectorAll('.gf-item'));
            const submitButtonsRow = document.querySelector('.buttons.ticket-forms-row');
            console.log(`Found ${attendeeForms.length} attendee forms.`);
            let currentAttendeeIndex = 0;

            if (submitButtonsRow) {
                submitButtonsRow.style.display = 'none';
                console.log("Submit buttons row hidden.");
            } else {
                console.error("Submit buttons row not found.");
            }

            const navigationContainer = document.createElement('div');
            navigationContainer.style.display = 'flex';
            navigationContainer.style.justifyContent = 'center';
            navigationContainer.style.marginTop = '20px';

            const prevButton = document.createElement('button');
            prevButton.textContent = 'Previous';
            prevButton.style.padding = '10px';
            prevButton.style.backgroundColor = '#888';
            prevButton.style.color = '#fff';
            prevButton.style.cursor = 'pointer';
            prevButton.style.borderRadius = '5px';
            prevButton.style.marginRight = '10px';
            prevButton.style.display = 'none';

            const nextButton = document.createElement('button');
            nextButton.textContent = 'Next';
            nextButton.style.padding = '10px';
            nextButton.style.backgroundColor = '#4CAF50';
            nextButton.style.color = '#fff';
            nextButton.style.cursor = 'pointer';
            nextButton.style.borderRadius = '5px';

            navigationContainer.appendChild(prevButton);
            navigationContainer.appendChild(nextButton);

            prevButton.addEventListener('click', () => {
                if (currentAttendeeIndex > 0) {
                    currentAttendeeIndex--;
                    updateAttendeeFormDisplay();
                    updateButtonVisibility();
                }
            });

            nextButton.addEventListener('click', () => {
                if (currentAttendeeIndex < attendeeForms.length) {
                    currentAttendeeIndex++;
                    updateAttendeeFormDisplay();
                }
                updateButtonVisibility();
            });

            function updateAttendeeFormDisplay() {
                attendeeForms.forEach((form, index) => {
                    form.style.display = (index === currentAttendeeIndex || currentAttendeeIndex === attendeeForms.length) ? 'block' : 'none';
                });
                if (currentAttendeeIndex === attendeeForms.length) {
                    attendeeForms.forEach(form => form.style.display = 'block');
                    if (submitButtonsRow) submitButtonsRow.style.display = 'flex';
                } else if (submitButtonsRow) {
                    submitButtonsRow.style.display = 'none';
                }
                updateProgressCircles();
            }

            const progressCircleContainer = document.createElement('div');
            progressCircleContainer.style.display = 'flex';
            progressCircleContainer.style.justifyContent = 'center';
            progressCircleContainer.style.marginBottom = '20px';

            const progressCircles = Array.from({ length: attendeeForms.length + 1 }, (_, index) => {
                const circle = document.createElement('div');
                circle.style.width = '30px';
                circle.style.height = '30px';
                circle.style.borderRadius = '50%';
                circle.style.backgroundColor = '#ddd';
                circle.style.cursor = 'pointer';
                circle.style.margin = '0 5px';
                circle.style.display = 'flex';
                circle.style.alignItems = 'center';
                circle.style.justifyContent = 'center';
                circle.style.fontSize = '16px';
                circle.style.color = '#333';
                circle.style.fontWeight = 'bold';
                circle.textContent = index < attendeeForms.length ? index + 1 : 'All';
                circle.addEventListener('click', () => {
                    currentAttendeeIndex = index;
                    updateAttendeeFormDisplay();
                    updateButtonVisibility();
                });
                progressCircleContainer.appendChild(circle);
                return circle;
            });

            function updateProgressCircles() {
                progressCircles.forEach((circle, index) => {
                    circle.style.backgroundColor = index === currentAttendeeIndex ? '#4CAF50' : '#ddd';
                    circle.style.color = index === currentAttendeeIndex ? '#fff' : '#333';
                });
            }

            const ticketFormsContainer = document.querySelector('.ticket-forms-container');
            if (ticketFormsContainer) {
                ticketFormsContainer.parentNode.insertBefore(progressCircleContainer, ticketFormsContainer);
                ticketFormsContainer.parentNode.insertBefore(navigationContainer, ticketFormsContainer.nextSibling);
            }

            updateAttendeeFormDisplay();

            function updateButtonVisibility() {
                prevButton.style.display = currentAttendeeIndex > 0 ? 'inline-block' : 'none';
                nextButton.style.display = currentAttendeeIndex === attendeeForms.length ? 'none' : 'inline-block';
                nextButton.textContent = currentAttendeeIndex === attendeeForms.length - 1 ? 'Summary' : 'Next';
            }

            updateButtonVisibility();

        } catch (error) {
            console.error("An error occurred during form initialization:", error);
        } finally {
            // Ensure the loading screen is removed
            const loadingScreen = document.getElementById('loading-screen');
            if (loadingScreen) loadingScreen.remove();
            clearTimeout(safetyTimeout); // Cancel the safety timeout
        }
    }, 500);  // Delay to ensure elements are loaded
};
