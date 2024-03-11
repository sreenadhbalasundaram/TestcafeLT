//This is the test were we have added after fixture inorder to upload the terminal command to Lambdatest report.
// TODO: add tests
import Page from './page-model';

fixture `A set of examples that illustrate how to use TestCafe API`
    .page `https://devexpress.github.io/testcafe/example/`
    .after( async t => {
        const fs = require('fs');
        const { exec } = require('child_process');

        // Read the content of the output.txt file
        fs.readFile('output.txt', 'utf8', (err, data) => {
            if (err) {
                console.error('Error reading file:', err);
                return;
            }

            // Regular expression pattern to match the sessionID
            const regex = /sessionID=([a-zA-Z0-9]+)/;
            // Extract the sessionID using the pattern
            const matches = data.match(regex);
            // Check if a match is found
            if (matches && matches.length > 1) {
                const sessionID = matches[1];
                console.log('Session ID:', sessionID);

                // Use sessionID in curl command
                exec(`curl -X POST "https://api.lambdatest.com/automation/api/v1/sessions/${sessionID}/terminal-logs" -H "accept: application/json" -H "Authorization: Basic c3JlZW5hZGhiOkkzMDRwbGFDcEJ4cEVSdkg1cm9KNnZGdVdxTGY0bG9rU0p2MkJiMUp2Z0lGMHBqcWJI" -H "Content-Type: multipart/form-data" -F "file=@output.txt;type=text/plain"`, (error, stdout, stderr) => {
                    if (error) {
                        console.error('Error executing curl command:', error);
                        return;
                    }
                    console.log('Curl command output:', stdout);
                });
            } else {
                console.log('Session ID not found in the file.');
            }
        });

              });

// Page model
const page = new Page();

// Tests
test('Text typing basics', async t => {
    await t
        .typeText(page.nameInput, 'Peter') // Type name
        .typeText(page.nameInput, 'Paker', { replace: true }) // Replace with last name
        .typeText(page.nameInput, 'r', { caretPos: 2 }) // Correct last name
        .expect(page.nameInput.value).eql('Parker'); // Check result
});


test('Click an array of labels and then check their states', async t => {
    for (const feature of page.featureList) {
        await t
            .click(feature.label)
            .expect(feature.checkbox.checked).ok();
    }
});


test('Dealing with text using keyboard', async t => {
    await t
        .typeText(page.nameInput, 'Peter Parker') // Type name
        .click(page.nameInput, { caretPos: 5 }) // Move caret position
        .pressKey('backspace') // Erase a character
        .expect(page.nameInput.value).eql('Pete Parker') // Check result
        .pressKey('home right . delete delete delete') // Pick even shorter form for name
        .expect(page.nameInput.value).eql('P. Parker'); // Check result
});


test('Moving the slider', async t => {
    const initialOffset = await page.slider.handle.offsetLeft;

    await t
        .click(page.triedTestCafeCheckbox)
        .dragToElement(page.slider.handle, page.slider.tick.withText('9'))
        .expect(page.slider.handle.offsetLeft).gt(initialOffset);
});


test('Dealing with text using selection', async t => {
    await t
        .typeText(page.nameInput, 'Test Cafe')
        .selectText(page.nameInput, 7, 1)
        .pressKey('delete')
        .expect(page.nameInput.value).eql('Tfe'); // Check result
});


test('Handle native confirmation dialog', async t => {
    await t
        .setNativeDialogHandler(() => true)
        .click(page.populateButton);

    const dialogHistory = await t.getNativeDialogHistory();

    await t.expect(dialogHistory[0].text).eql('Reset information before proceeding?');

    await t
        .click(page.submitButton)
        .expect(page.results.innerText).contains('Peter Parker');
});


test('Pick option from select', async t => {
    await t
        .click(page.interfaceSelect)
        .click(page.interfaceSelectOption.withText('Both'))
        .expect(page.interfaceSelect.value).eql('Both');
});


test('Filling a form', async t => {
    // Fill some basic fields
    await t
        .typeText(page.nameInput, 'Bruce Wayne')
        .click(page.macOSRadioButton)
        .click(page.triedTestCafeCheckbox);

    // Let's leave a comment...
    await t
        .typeText(page.commentsTextArea, "It's...")
        .wait(500)
        .typeText(page.commentsTextArea, '\ngood');

    // I guess, I've changed my mind
    await t
        .wait(500)
        .selectTextAreaContent(page.commentsTextArea, 1, 0)
        .pressKey('delete')
        .typeText(page.commentsTextArea, 'awesome!!!');

    // Let's submit our form
    await t
        .wait(500)
        .click(page.submitButton)
        .expect(page.results.innerText).contains('Bruce Wayne');
});
