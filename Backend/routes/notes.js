const express=require('express');
const router=express.Router();
const fetchuser=require('../middleware/fetchuser');
const Notes = require('../models/Notes');
const { body, validationResult } = require('express-validator');



//Route 1: get all notes:GET '/api/auth/getUser'
router.get('/fetchallnotes',fetchuser,async(req,res)=>{
    try{
        const notes=await Notes.find({user:req.user.id});

        res.json(notes);   
} catch (error) {
    console.error('Error fetching notes:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
})


//Route 2: Add a new note using POST: '/api/auth/addnote'
router.post('/addnote',fetchuser,[
    body('title','Enter a valid title').isLength({min:4}),
    body('description','description must be 5 characters ').isLength({min:5})
],async(req,res)=>{
    try {
        const {title,description,tag}=req.body;
    const errors=validationResult(req);
    if(!errors.isEmpty())
    {
        return res.status(400).json({errors:errors.array()});
    }
    const note=new Notes({
        title,description,tag,user:req.user.id
    });
   const savedNote=await note.save();
   res.json(savedNote);
        
    } catch (error) {
            console.error('Error fetching notes:', error);
            res.status(500).json({ error: 'Internal Server Error' });
          }
    })


//Route 3: Add a new update in ex  using POST: '/api/auth/addnote'
router.put('/updatenote/:id',fetchuser,async(req,res)=>{
     const{title,description,tag}=req.body;

     //create a new note object
     const newNotes={};
     if(title ){newNotes.title=title};
     if(description ){newNotes.description=description};
     if(tag){newNotes.tag=tag};

     //find the note to be updated and update it
     let note=await Notes.findById(req.params.id);
     if(!note){return res.status(404).send("not found")}

     if(note.user.toString()!==req.user.id)
     {
        return res.status(401).send("not allowed");
     }

     note=await Notes.findByIdAndUpdate(req.params.id,{$set:newNotes},{new:true});
     res.json({note});
     
    })


//Route 4: delete an note   using PUT: '/api/auth/addnote'
router.delete('/deletenote/:id',fetchuser,async(req,res)=>{
    try {
      
        //find the note to be deleted and delete it
        let note=await Notes.findById(req.params.id);
        if(!note){return res.status(404).send("not found")}
      //allow deletion only if user owns this note
        if(note.user.toString()!==req.user.id)
        {
           return res.status(401).send("not allowed");
        }
    
        note=await Notes.findByIdAndDelete(req.params.id);
        res.json({"success":"note has been deleted",note:note});
          
    } catch (error) {
        console.error('Error fetching notes:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
    
} )
module.exports=router;