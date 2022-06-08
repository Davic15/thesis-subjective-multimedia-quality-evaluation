# Thesis: Objective Multimedia Quality Evaluation

## Note: 
* No sign up and/or sign is required to test the server.
* Use your own MongoDB link to connect to your own database.
* JSONWebToken add for authorization.

## API List (End Points)
* ### /admin/postAddStimulus
Access: Public
Type: Post
Body: { 
    questionId: objectId, 
    url: string , 
    typeId: objectId 
}
Response: 200
Description: Create a new row in the database with the information about a stimulus, it requires a link (image) to perform the test.

* ### /admin/postAddQuestion
Access: Public
Type: Post
Body: {
    questionBody: string
}
Response: 201
Description: It saves the question to be asked during the test.

* ### /admin/postTypesStimulus
Access: Public
Type: Post
Body: {
    typeText: string
}
Response: 201
Description: It saved types of the current stimulus.

* ### /test/getStimuli
Access: Authorization
Type: Get
Body: { none }
Response: 200
Description: This is use for developing purposes. It retrieves the full set of stimuli in the database.

* ### /test/postUserInformation
Access: Public
Type: Post
Body: {
    email: string,
    gender: string,
    age: integer
}
Response: 201
Description: It saves the information of a new user. When the new participant is created a JSONWebToken is created and it gives authorization to take the test for an hour (the value of 1h is for testing, it will be increased in the future).

* ### /test/getNextItems 
Access: Public
Type: Get
Query: {
    userId: objectId,
    numStimulus: integer,
    typeStimulus: array[string]
}
Response: 200
Description: It retrieves the next 1 or 2 stimuli to display, taking in consideration the previous types and selecting from the the database a new single/paire of stimuli.
Still under development.


* ### Test performed using Postman