import fs from 'fs';
import axios from 'axios';

const url: string = 'https://petstore.swagger.io/v2/pet';
let params: any = JSON.parse(fs.readFileSync('./src/tests/api-tests/params.json', 'utf8'));

async function postData(petName: string, catName: string, petStatus: string) {
    try {
        // Generate random pet ID
        const petId: number = generatePetId();
        params.id = petId;
        console.log('Pet ID - ', petId);
        params.category.id = petId + 10;

        params.name = petName;
        params.category.name = catName;
        params.status = petStatus;

        const response = await axios.post(url, params, {
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
        console.log(`POST API Response is - ${JSON.stringify(response.data)}`)

        // Write the updated JSON to the file
        const updatedParamsJson: string = JSON.stringify(params, null, 2);
        fs.writeFile('./src/tests/api-tests/params.json', updatedParamsJson, 'utf8', (err) => {
            if (err) {
                console.error('Error writing to params.json:', err);
            } else {
                console.log(`params.json updated successfully! POST Rsp - ${response.status}`);
            }
        });

        // Check response status code
        if (response.status === 200) {
            return response;
        } else {
            throw new Error(`POST Request failed with status code ${response.status}`);
        }
    } catch (error) {
        throw error;
    }
}

function generatePetId(): number {
    return Math.floor(1000 + Math.random() * 9000);
}

export default postData;