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
Description: Upload two stimuli (video and/or image), and the questions for those stimuli and a sanity question.