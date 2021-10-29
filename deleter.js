/*
Inbox Cleaner Script. 
*/


// import statements 
const fs = require('fs'); 
const readline = require('readline'); 
const { google } = require('googleapis'); 
const { stderr } = require('process');


// global constants 
const SCOPES = ['https://mail.google.com/'];
const TOKEN_PATH = 'api-access/token.json';


let searchQuery = {
	userId: 'me',
	q: 'from:na',
	maxResults: 100
}
// trash or delete (permanently) 
verb = "trash"


// authorize credentials and run cleanInbox
function authAndClean() {
	let query = searchQuery.q;
	fs.readFile('api-access/credentials.json', (err, content) => {
		if (err) {
			return console.log(`Error loading client credentials: ${err}`);
		}
		authorize(JSON.parse(content), cleanInbox, query, verb);
	});
}



// authorize user using credentials 
function authorize(credentials, callback) {
	const {client_secret, client_id, redirect_uris} = credentials.installed; 
	const OAuth2Client = new google.auth.OAuth2(
		client_id, client_secret, redirect_uris[0]);
		
	fs.readFile(TOKEN_PATH, (err, token) => {
		if (err) {
			return getNewToken(OAuth2Client, callback, arguments[2], arguments[3]);
		}
		OAuth2Client.setCredentials(JSON.parse(token));
		callback(OAuth2Client, arguments[2], arguments[3]); 
	});
}


// get token 
function getNewToken(OAuth2Client, callback) {
	const authUrl = OAuth2Client.generateAuthUrl({
		access_type: 'offline', 
		scope: SCOPES, 
	});
	console.log(`Authorize this app by visiting this url: ${authUrl}`); 
	const r1 = readline.createInterface({
		input: process.stdin,
		output: process.stdout, 
	});
	r1.question('Enter the code from that page here: ', (code) => {
		r1.close();
		OAuth2Client.getToken(code, (err, token) => {
			if (err) {
				return console.error(`Error retrieving access token: ${err}`);
			}
			OAuth2Client.setCredentials(token); 
			fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
				if (err) {
					return console.log(err);
				}
				console.log(`Token stored to: ${TOKEN_PATH}`);
			});
			callback(OAuth2Client, arguments[2], arguments[3]); 
		});
	});
}


// batch delete or trash messages 
var cleanInbox = function (auth, q, v) {
	const gmail = google.gmail({version:'v1', auth}); 
	searchQuery.q = q;
	
	const bulkTrashMail = async (requestBody) => {
		this.count = 0;
		console.log('Trashing messages now...');
		for (var id of requestBody.ids) {
			msg = await gmail.users.messages.trash({
				userId: 'me',
				id: id,
			})
			.then((res) => {
				if (res.status < 300) {
					this.count += 1; 
				} else {
					console.log(`Error: ${res.status}`);
				}
			})
			.catch(error => console.log(`API error: ${error}`));
		}
		console.log(`Moved ${this.count} messages to trash.`);
	}

	const bulkDeleteMail = (requestBody) => {
		gmail.users.messages.batchDelete({
			userId: 'me',
			resource: requestBody,
		}, (err, res) => {
			if (err) {
				return console.log(`API error: ${err}`);
			}
			if (res.status < 300) {
				console.log(`Permanently deleted ${requestBody.ids.length} emails.`);
			}
		});
	}
	
	const findMessages = (query) => {
		gmail.users.messages.list(query, (err, res) => {
			if (err) {
				return console.log(`API error: ${err}`);
			}
			const messages = res.data.messages;
			console.log(`messages:\n ${messages}`); 
			const batchReqBody = { ids: [] };
			
			if (messages && messages.length) {
				messages.forEach(msg => {
					batchReqBody.ids.push(msg.id);
				});
				if (v === "delete") {
					bulkDeleteMail(batchReqBody);
				} else if (v === "trash") {
					bulkTrashMail(batchReqBody);
				}
				
				if (res.data.nextPageToken) {
					searchQuery.pageToken = res.data.nextPageToken;
					findMessages(searchQuery);
				}
			}
			else {
				console.log('No more matching emails.')
			}
		});
	}
	findMessages(searchQuery);
}


if (typeof require !== 'undefined' && require.main === module) {
	authAndClean();
}


module.exports = {
		'cleanInbox':cleanInbox,
		'scopes':SCOPES
}; 