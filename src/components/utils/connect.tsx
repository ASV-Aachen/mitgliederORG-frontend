import React, { Component } from 'react';
import request from 'superagent';
import Cookies from 'universal-cookie';
import { person } from './person';
// Connect to the Backend Service

// POST
// Neuer Nutzer
export const POST = (url: string, body: person): any | null => {
	const cookies = new Cookies();

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
		return null
	})
}

// GET
// Daten über alle Nutzer einholen
export const GET = (endpoint) => {
	const cookies = new Cookies();

	request.get(endpoint)
		.set('Content-Type', 'application/json')
		.set('Cookie', [
			'username=' + cookies.get('username'),
			'token=' + cookies.get('token')
		])
		.then(success => {
			onSuccess(success);
		}, failure => {
			onFailure(failure);
		})
		.then(success => {
			
		});
}

// DELETE
export const DELETE = (endpoint, onSuccess, onFailure) => {
	const cookies = new Cookies();

	request.delete(endpoint)
		.set('Content-Type', 'application/json')
		.set('Cookie', [
			'username=' + cookies.get('username'),
			'token=' + cookies.get('token')
		])
		.then(success => {
			onSuccess(success);
		}, failure => {
			onFailure(failure);
		});
}

// PATCH
export const PATCH = (endpoint, onSuccess, onFailure) => {
	const cookies = new Cookies();

	request.patch(endpoint)
		.set('Content-Type', 'application/json')
		.set('Cookie', [
			'username=' + cookies.get('username'),
			'token=' + cookies.get('token')
		])
		.then(success => {
			onSuccess(success);
		}, failure => {
			onFailure(failure);
		});
}