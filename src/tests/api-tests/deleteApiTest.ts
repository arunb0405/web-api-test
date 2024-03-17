import axios from 'axios';
import fs from 'fs';

const paramsData = fs.readFileSync('./src/tests/api-tests/params.json', 'utf8')
const params = JSON.parse(paramsData)

async function deletePetById(petId: number) {
    try {
        petId = params.id
        console.log(`Deleting Pet with Id - ${petId}`);
        const response = await axios.delete(`https://petstore.swagger.io/v2/pet/${petId}`);

        return response;
    } catch (error) {
        throw error;
    }
}

export default deletePetById;
