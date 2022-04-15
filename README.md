# Thesis: Objective Multimedia Quality Evaluation

## Note: 
* No sign up and/or sign in require to test the server.
* Use your own MongoDB link to connect to your own database.

## API List (End Points)
* ### /admin/postUploadStimuli
Access: public
Type: Post
Body: { 
    stimuliPath: array(), 
    questionsNormal: string , 
    questionsSanity: string 
}
Response: 201
Description: Upload two stimuli files (video and/or image), the questions for those stimuli and a sanity question. The data is saved into the database.

* ### /test/postUserInformation
Access: public
Type: Post
Body: {
    email: string,
    age: integer,
    gender: string
}
Response: 201
Description: Save basic information about the user who is taking the test, more or less information can be asked.

* ### /test/getNextItems
