import axios from 'axios';
import fs from 'fs';

const paramsData = fs.readFileSync('./src/tests/api-tests/params.json', 'utf8');
const params: any = JSON.parse(paramsData);

async function getPetById() {
    try {
        const petId: number = await params.id
        console.log(`Trying to retreive for Pet Id - ${petId}`)
        const response = await axios.get<any>(`https://petstore.swagger.io/v2/pet/${petId}`);

        console.log('Response is -', response.data)
        return response;
    } catch (error) {
        throw error;
    }
}

export default getPetById;
// getPetById(petId)
//     .then(petData => {
//         console.log('Retrieved Pet Data:', petData);
//     })
//     .catch(error => {
//         console.error('Error:', error);
//     });
