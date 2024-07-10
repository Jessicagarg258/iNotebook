import NoteContext from "./NoteContext";
import { useState } from "react";
const NoteState=(props)=>{
    // const s1={
    //     "name":"Harry",
    //     "class":"5b"
    // }
    // const [state,setState]=useState(s1);
    
    // const update=()=>{
    //     setTimeout(()=>{
    //         setState({
    //             "name":"Larry",
    //             "class":"10b"
    //         })
    //     },1000);
    // }

     const host="http://localhost:5000"
    // const notesInitial=[
    //     {
    //       "_id": "668b8b7655e6c53090ce61c7",
    //       "user": "668a29c8a756e5f55ac2630e",
    //       "title": "my-title",
    //       "description": "hello please wake up ",
    //       "tag": "personal",
    //       "date": "2024-07-08T06:47:18.970Z",
    //       "__v": 0
    //     },
    //     {
    //       "_id": "668b8b7755e6c53090ce61c9",
    //       "user": "668a29c8a756e5f55ac2630e",
    //       "title": "my-title",
    //       "description": "hello please wake up ",
    //       "tag": "personal",
    //       "date": "2024-07-08T06:47:19.191Z",
    //       "__v": 0
    //     },
    //     {
    //       "_id": "668b8b7755e6c53090ce61cb",
    //       "user": "668a29c8a756e5f55ac2630e",
    //       "title": "my-title",
    //       "description": "hello please wake up ",
    //       "tag": "personal",
    //       "date": "2024-07-08T06:47:19.352Z",
    //       "__v": 0
    //     },
    //     {
    //       "_id": "668b8b7755e6c53090ce61cd",
    //       "user": "668a29c8a756e5f55ac2630e",
    //       "title": "my-title",
    //       "description": "hello please wake up ",
    //       "tag": "personal",
    //       "date": "2024-07-08T06:47:19.545Z",
    //       "__v": 0
    //     },
    //     {
    //       "_id": "668b8b7755e6c53090ce61cf",
    //       "user": "668a29c8a756e5f55ac2630e",
    //       "title": "my-title",
    //       "description": "hello please wake up ",
    //       "tag": "personal",
    //       "date": "2024-07-08T06:47:19.728Z",
    //       "__v": 0
    //     },
    //     {
    //       "_id": "668b8b7755e6c53090ce61d1",
    //       "user": "668a29c8a756e5f55ac2630e",
    //       "title": "my-title",
    //       "description": "hello please wake up ",
    //       "tag": "personal",
    //       "date": "2024-07-08T06:47:19.905Z",
    //       "__v": 0
    //     },
    //     {
    //       "_id": "668b8b7855e6c53090ce61d3",
    //       "user": "668a29c8a756e5f55ac2630e",
    //       "title": "my-title",
    //       "description": "hello please wake up ",
    //       "tag": "personal",
    //       "date": "2024-07-08T06:47:20.049Z",
    //       "__v": 0
    //     }
    //   ]
     

    const notesInitial=[]
      const[notes,setNotes]=useState(notesInitial);
     
          //get all note 
       
     //logic
     const getNote=async()=>{
      //API call
      
     const response=await fetch(`${host}/api/notes/fetchallnotes`,{
      method:'GET',
      headers:{
        'Content-Type':'application/json',
        'auth-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2OGEyOWM4YTc1NmU1ZjU1YWMyNjMwZSIsImlhdCI6MTcyMDQxNjc1NH0.Eyr0bIV-jNe140-QRh3B_UfWWWsh8cs8afF34TY8P-8'
      }
      

    })
    const json =await response.json()
       console.log(json);
       setNotes(json)
    }
      //Add a note 
       
     //logic
      const addNote=async(title,description,tag)=>{
        //API call
        
       const response=await fetch(`${host}/api/notes/addnote`,{
        method:'POST',
        headers:{
          'Content-Type':'application/json',
          'auth-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2OGEyOWM4YTc1NmU1ZjU1YWMyNjMwZSIsImlhdCI6MTcyMDQxNjc1NH0.Eyr0bIV-jNe140-QRh3B_UfWWWsh8cs8afF34TY8P-8'
        },
        body:JSON.stringify({title,description,tag})

      })
      const note=await response.json();
      // console.log(json);

      //logic
        // console.log("adding a new note");
        // const note={
        //     "_id": "668b8b7855e6c53090ce61d3",
        //     "user": "668a29c8a756e5f55ac2630e",
        //     "title": title,
        //     "description": description,
        //     "tag": tag,
        //     "date": "2024-07-08T06:47:20.049Z",
        //     "__v": 0
        //   };
        setNotes(notes.concat(note))
      }

      //Delete a note
      
      const deleteNote=async(id)=>{
         //API call
        
       const response=await fetch(`${host}/api/notes/deletenote/${id}`,{
        method:'DELETE',
        headers:{
          'Content-Type':'application/json',
          'auth-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2OGEyOWM4YTc1NmU1ZjU1YWMyNjMwZSIsImlhdCI6MTcyMDQxNjc1NH0.Eyr0bIV-jNe140-QRh3B_UfWWWsh8cs8afF34TY8P-8'
        },
       

      })
      const json=response.json();
      console.log(json); 
     //logic to delete
        console.log("deleting note"+id);
       const newNotes=notes.filter((note)=>{
          return note._id!==id
        })
        setNotes(newNotes);
      }

      //Edit a note
      const editNote=async(id,title,description,tag)=>{
        //API call
        
        const response=await fetch(`${host}/api/notes/updatenote/${id}`,{
          method:'PUT',
          headers:{
            'Content-Type':'application/json',
            'auth-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2OGEyOWM4YTc1NmU1ZjU1YWMyNjMwZSIsImlhdCI6MTcyMDQxNjc1NH0.Eyr0bIV-jNe140-QRh3B_UfWWWsh8cs8afF34TY8P-8'
          },
          body:JSON.stringify({title,description,tag})

        })
        const json=await response.json();
        console.log(json);
       

        let newNotes =JSON.parse (JSON.stringify(notes))
        //logic to edit 
          for (let index = 0; index < newNotes.length; index++) {
            const element = newNotes[index];
            if(element._id===id)
            {
              newNotes[index].title=title;
              newNotes[index].description=description;
              newNotes[index].tag=tag;
              break;
            }
            
          }
          setNotes(newNotes);
      }

     return(
        <NoteContext.Provider value={{notes,addNote,deleteNote,editNote,getNote}}>
            {props.children}
        </NoteContext.Provider>
     ) 
}

export default NoteState;