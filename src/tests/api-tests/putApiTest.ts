import axios from 'axios';
import fs from 'fs';

// Read the request body from params.json file
const paramsData = fs.readFileSync('./src/tests/api-tests/params.json', 'utf8');
const petData = JSON.parse(paramsData);

// Update params data
async function updatePet(petName: string, petCatName: string, petSt: string) {
    try {
        const url = 'https://petstore.swagger.io/v2/pet';

        // Update Pet data
        petData.name = petName
        petData.category.name = petCatName
        petData.status = petSt

        console.log(`Request body is - ${JSON.stringify(petData)}`)

        const response = await axios.put(url, petData, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
        console.log('Response:', response.data);
        if (response.status === 200) {
            return response.data
        } else {
            throw new Error(`PUT Request failed with status ${response.status}`)
        }
    } catch (error) {
        console.error('Error:');
    }
}

// Call the function to execute the request
export default updatePet;
