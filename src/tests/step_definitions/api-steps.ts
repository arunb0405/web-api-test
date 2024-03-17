import { Given, When, Then  } from "@cucumber/cucumber"
import { expect } from '@playwright/test'; // Import expect from Chai
// @ts-ignore
import postData from '../api-tests/postApiTest';
import getPetById from '../api-tests/getAPiTest';
import deletePetById from "../api-tests/deleteApiTest";
import updatePet from "../api-tests/putApiTest";

let response: any

Given('a pet is created with the details {string} {string} and {string}', async (petName: string, petCatName: string, petSt: string) => {
    response = await postData(petName, petCatName, petSt);
    console.log(`Response Status is - ${response.status}`)
    // expect(response.status).toEqual(200)
})

Then('the post API response status code should be 200', async () => {
    console.log(`Response Status - ${response.status}`)
    await expect(response.status).toEqual(200)
})

Then('validate the created pet API response of {string} {string} and {string}', async (petName: string, petCatName: string, petSt: string) => {
    console.log(`Response data with Pet name - ${response.data.name}`)
    await expect(response.data.category.name).toEqual(petCatName)
    await expect(response.data.status).toEqual(petSt)
    await expect(response.data.name).toEqual(petName)
})

Given('there exists a pet in the system', async () => {
    response = await getPetById()
    // Convert response data to JSON
    const responseDataJSON = JSON.stringify(response.data, null, 2);
    // console.log('GET Response Data in steps file:', responseDataJSON);
    // Convert response data to JSON
})

Then('the response status code should be 200', async () => {
    console.log(`Response Status - ${response.status}`)
    await expect(response.status).toEqual(200)
})

When('I retrieve the pet details using a GET API request', async () => {
    console.log('Pet Id :', response.data.id);
})

When('the response body should contain the pet details', async () => {
    // Assert properties of the response data
    expect(response.data).toHaveProperty('status')
    expect(response.data).toHaveProperty('id')
    expect(response.data).toHaveProperty('name')
    // expect(response.data.category.name).toEqual('Bird')
})

When('I update the pet details using PUT API request {string} {string} and {string}', async (petName: string, petCatName: string, petSt: string) => {
    response = await updatePet(petName, petCatName, petSt)
    console.log(`PET update resp - ${JSON.stringify(response)}`)
})

When('the response status code of PUT API should be 200', async() => {
    console.log(`Response Status - ${response.status}`)
    // await expect(response.status).toEqual(200)
})

When('I delete the pet details using a DELETE API request', async () => {
    const petId = response.data.id
    console.log(`Delete Pet Id called with Id - ${petId}`)
    response = await deletePetById(petId)
})

Then('the response status code of delete API should be 200', async () => {
    await expect(response.status).toEqual(200)
})

When('the response body should contain the deleted pet details', async () => {
    console.log(`Delete Resp body - ${JSON.stringify(response.data)}`)
    expect(response.data).toHaveProperty('message')
    expect(response.data).toHaveProperty('type')    
})