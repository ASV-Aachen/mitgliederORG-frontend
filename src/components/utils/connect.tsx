import React, { Component } from 'react';
import request from 'superagent';
import Cookies from 'universal-cookie';
import { person } from '../interface/person';
// Connect to the Backend Service

// POST
// Neuer Nutzer
export const POST = (url: string, body: person, image: File|null): any | null => {
	const cookies = new Cookies();

	var bearer = cookies.get('token')

	var data = new FormData()
	data.append('mail', body.mail)
	data.append('first_name', body.first_name)
	data.append('last_name', body.last_name)
	data.append('entryDate', body.entryDate)
	data.append('status', body.status)

	if (image !== null){
		data.append('userImage', image)
	}else{
		data.append('userImage', "")
	}

	fetch(url, {
		method: 'POST',
		headers: {
			'Authorization': "Bearer " + bearer,
			'Accept': '*/*',
		},
		body: data // body data type must match "Content-Type" header
	  })
	.then((json: any) => {
		
	})
	.then((error) => {
		console.error("Coudln't POST: ", error)
		return (error)
	})
	return true
}

// GET
// Daten über alle Nutzer einholen
export const GET = (endpoint: string) => {
	const cookies = new Cookies();

	request.get(endpoint)
		.set('Content-Type', 'application/json')
		.set('Cookie', [
			'username=' + cookies.get('username'),
			'token=' + cookies.get('token')
		])
		.then((json: any) => {
			// Hat funktioiert, was machen wir?
			console.log(json)
		}, (failure: any) => {
			// Fail, was machen wir? 
			console.error(failure)
		});
}

// DELETE
export const DELETE = (endpoint: string, onSuccess: any, onFailure: any) => {
	const cookies = new Cookies();

	request.delete(endpoint)
		.set('Content-Type', 'application/json')
		.set('Cookie', [
			'username=' + cookies.get('username'),
			'token=' + cookies.get('token')
		])
		.then((success: any) => {
			// Hat funktioiert, was machen wir?
			console.log(success)
		}, (failure: any) => {
			// Fail, was machen wir? 
			console.error(failure)
		});
}

// PATCH
export const PATCH = (endpoint: any, onSuccess: any, onFailure: any) => {
	const cookies = new Cookies();

	onSuccess(true)

	request.patch(endpoint)
		.set('Content-Type', 'application/json')
		.set('Cookie', [
			'token=' + cookies.get('token')
		])
		.then((success: any) => {
			// Hat funktioiert, was machen wir?
			console.log(success)
		}, (failure: any) => {
			// Fail, was machen wir? 
			onSuccess(false)
			console.error(failure)
		});
}