const student=require("../model/app.model");
exports.create=(req,res)=>{
res.render('home',{
    page_title:'home page'
})
};
exports.insert = async (req, res) => {
    try {
      req.body.firstName = req.body.firstName.trim();
      req.body.lastName = req.body.lastName.trim();
      if (!req.body.firstName && !req.body.lastName) {
        console.log("Field should not be empty");
        res.redirect("/");
      } else {
        let isEmailExist = await student.find({ email: req.body.email ,isDelete:false});
        if (!isEmailExist.length)
     {
           const isContactExist=await student.find({contactNumber:req.body.contactNumber,isDelete:false
           })
           if(!isContactExist.length)
           {
            req.body.fullName = `${req.body.firstName} ${req.body.lastName}`;
            console.log(req.body);
           
            let saveData = await student.create(req.body);
            console.log(saveData);
            if (saveData && saveData._id) {
              console.log("Data Added Successfully");
              res.redirect("/student-views");
            } else {
              console.log("Data Not Added");
              res.redirect("/");
            }
           }
           else
           {
            console.log("Contact number Already exists");
          res.redirect("/");
    }
        } else {
          console.log("Email Already exists");
          res.redirect("/");
        }
      }
    } catch (err) {
      throw err;
    }
  };
  exports.studentViews=async(req,res)=>{
   try{
      const studentData=await student.find({isDelete:false});
      res.render('studentViews',{
        page_title:"student||views",
        studentData
      })
   }catch(err)
   {
    console.log(err); 
   }
  }
  
  // exports.delete = async (req, res) => {
  //   try {
  //     let deleteData = await student.findByIdAndRemove(req.params.id);
  //     if (deleteData) {
  //       console.log("Data Deleted Successfully...");
  //       res.redirect("/student-views");
  //     } else {
  //       console.log("Something went wrong...");
  //     }
  //   } catch (err) {
  //     throw err;
  //   }
  // };
  exports.delete=async(req,res)=>{
    try{
       let deleteData=await student.findByIdAndUpdate(req.params.id,{isDelete:true});
       if(deleteData && deleteData._id)
       {
        console.log('delete successfully');
        res.redirect('/student-views')
       }else{
        console.log('Somethings went wrong');
        res.redirect('/student-views')
       }
    }catch(err)
    {
      throw err
    }
  }
  exports.edit=async(req,res)=>{
    try{
     let studentData=await student.find({_id:req.params.id});
     console.log(studentData[0]);
     res.render("edit",{
      page_title:'Edit page',
      Response:studentData[0]
     })
    }catch(err)
        {
          throw err
        }
  }
  exports.update=async(req,res)=>{
    try{
      let isEmailExist=await student.find({email:req.body.email,_id:{$ne:req.body.id}});
      if(!isEmailExist.length){
        let isContactExist=await student.find({contactNumber:req.body.contactNumber,_id:{$ne:req.body.id}})
        
        if(!isContactExist.length)
        {
      let studentUpdate=await student.findByIdAndUpdate(req.body.id,req.body);
      if(studentUpdate && studentUpdate._id)
      {
        console.log("student data Updated");
        res.redirect('/student-views')
      }
      else{
        console.log("Something is Wrong");
        res.redirect('/student-views')
      }
    }else{
      console.log("Contact is already exists");
        res.redirect('/student-views')
    }
      }
      else{
        console.log("Email is already exists");
        res.redirect('/student-views')
      }
    }catch(err){
      throw err
    }
  }
  