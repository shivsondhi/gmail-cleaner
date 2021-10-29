# Inbox Cleaner
Delete or trash multiple Gmail messages using Gmail queries. 


## Example Queries
- `subject:Achieve your goals`
- `in:spam`
- `before:2019/01/01 is:unread`
- `label:productivity`

Check out [more search operators](https://support.google.com/mail/answer/7190?hl=en) you can use in Gmail queries. 


## Google App and Credentials  
Before running this script you will need to create a project on the Google Cloud Platform and allow it to use the Gmail API. The steps to do that can be found [here](https://developers.google.com/workspace/guides/create-project). You will also need authorization credentials for your desktop application. The steps for that can be found [here](https://developers.google.com/workspace/guides/create-credentials). While configuring OAuth, you can select `External` application and create credentials for a Desktop application at the relevant prompts. 

After these steps, you should have a JSON file with your client secret and other credentials. Download this file into `api-access/` and name it `credentials.json`. The `tokens.json` file will be generated for you automatically once you sign in using your Gmail account. 


## Dependencies 
After cloning the repository, run the following commands: 

```
npm init
npm install googleapis@39 --save 
```


#### Working on a web-app.