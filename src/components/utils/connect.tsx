import React, { Component } from 'react';
import request from 'superagent';
import Cookies from 'universal-cookie';
import { person } from '../interface/person';
// Connect to the Backend Service

// POST
// Neuer Nutzer
export const POST = (url: string, body: person, image: File|null): any | null => {
	// const cookies = new Cookies();

	var data = new FormData()
	data.append('json', JSON.stringify(body))
	if (image !== null){
		data.append('image', image)
	}

	fetch(url, {
		method: 'POST', // *GET, POST, PUT, DELETE, etc.
		mode: 'cors', // no-cors, *cors, same-origin
		cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
		credentials: 'same-origin', // include, *same-origin, omit
		headers: {
		  'Content-Type': 'application/json'
		},
		redirect: 'follow', // manual, *follow, error
		referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
		body: JSON.stringify(body) // body data type must match "Content-Type" header
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

	request.patch(endpoint)
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