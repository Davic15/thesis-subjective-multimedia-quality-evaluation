# Thesis: Objective Multimedia Quality Evaluation

## Note: 
* No sign up and/or sign is required to test the server.
* Use your own MongoDB link to connect to your own database.

## API List (End Points)
* ### /admin/postUploadStimuli
Access: Public
Type: Post
Body: { 
    stimuliPath: array(), 
    questionsNormal: string , 
    questionsSanity: string 
}
Response: 201
Description: Upload two stimuli files (video and/or image), the questions for those stimuli and a sanity question. The data is saved into the database.

* ### /test/postUserInformation
Access: Public
Type: Post
Body: {
    email: string,
    age: integer,
    gender: string
}
Response: 201
Description: Save basic information about the user who is taking the test, more or less information can be asked.

* ### /test/getNextItems
Access: Public
Type: Get
Body: { none }
Response: 200
Description: Returns an array with all stimuli, normal questions and sanity question.

* ### /test/postAnswers
Access: Public
Type: Post
Body: {
    userId: ObjectId,
    stimuliId: ObjectId,
    answerNormal: string,
    answerSanity: string
}
Response: 200
Description: Save answers for normal questions or a single answer for a sanity qustion. The userId and the stimuliId are required to save the answer in the database.
