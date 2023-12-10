// first  i need to create a topic then link that to a unit then link that unit to a subject
const video = require("../model/videoscollectionModel");
const coursedata = require("../model/coursedatamodel");

const topicdata = require("../model/topicmodel");
const { default: mongoose } = require("mongoose");

//creating video data method

//get a subject details
const getvideodata = async (req, res) => {
  const find_data = await video.find().distinct("collegename");
  res.json(find_data);
};
const getyeardata = async (req, res) => {
  const collegename = req.params.collegename;
  const find_year = await video
    .find({ collegename: collegename })
    .distinct("year");
  res.json(find_year);
};
const getdepartmentdata = async (req, res) => {
  const collegename = req.params.collegename;
  const year = req.params.year;
  const find_Department = await video
    .find({ collegename: collegename, year: year })
    .distinct("department");
  res.json(find_Department);
};
const getsubjectdata = async (req, res) => {
  const collegename = req.params.collegename;
  const year = req.params.year;
  const department = req.params.department;
  const find_subject = await video
    .find({ collegename: collegename, year: year, department: department })
    .populate({
      path: "coursedata",
      populate: { path: "topics", model: "topics" },
    });
  res.json(find_subject);
};

const get_coursedetails_from_a_subject = async (req, res) => {
  const subjectid = req.params.id;

  const find_subject = await video.findById({ _id: subjectid });
  const populated_data = await find_subject.populate({
    path: "coursedata",
    populate: { path: "topics", model: "topics" },
  });
  const coursedatas = await populated_data.coursedata;
  res.json(coursedatas);
};
//get subject name
const getsubjectname = async (req, res) => {
  const subjectid = req.params.id;
  const find_subject = await video.findById({ _id: subjectid });
  const subjectname = await find_subject.subjectname;
  res.send(subjectname);
};

const getalldata = async (req, res) => {
    const find_data = await video.find({});
    res.json(find_data);
  };
//delete a topic
const deletetopic = async (req, res) => {
  const topicid = req.params.topicid;
  const courseid = req.params.courseid;
  console.log(topicid, courseid);
  const deleted = await topicdata.deleteOne({ _id: topicid });
  const find_and_update_course = await coursedata.updateOne(
    { _id: courseid },
    { $pull: { topics: topicid } }
  );
  console.log(find_and_update_course, topicid, courseid, deleted);
  res.status(200).json(find_and_update_course);
};
//edit topic
const edittopic = async (req, res) => {
  const id = req.params.id;
  const topicname = req.body.topicname;
  const topicuri = req.body.topicuri;
  const update_topic = await topicdata.updateOne(
    { _id: id },
    { $set: { topicname: topicname, topicuri: topicuri } }
  );
  res.json(update_topic);
};


const createvideodata = async (req, res) => {
    const collegename = req.body.collegename;
    const year = req.body.year;
    const department = req.body.department;
    const topicname = req.body.topicname;
    const topicuri = req.body.topicuri;
    const subjectname = req.body.subjectname;
    const unitname = req.body.unitname;
    const combinedname = collegename + subjectname + unitname + year;
    console.log(collegename, year, department, topicname, topicuri, subjectname);
    const new_topic = await topicdata.create({
      topicname: topicname,
      uri: topicuri,
    });
  
    console.log("new topic data :- ", new_topic, "\n\n");
    //upper tak code sahi hai
    const topic_obj_id = new mongoose.Types.ObjectId(new_topic.id);
    //console.log('new topic objid :- ',topic_obj_id,'\n\n');
    //console.log('new topic id :- ',new_topic.id,'\n\n');
    //agar subject na ho to kya kere
    const find_college = await video.findOne({
      collegename: collegename,
      subjectname: subjectname,
    });
    if (!find_college) {
      const new_subject_data = await video.create({
        collegename: collegename,
        year: year,
        department: department,
        subjectname: subjectname,
      });
      const new_unit_data = await coursedata.create({
        unitname: unitname,
        combinedname: combinedname,
      });
      //console.log('new unit is ->',new_unit_data,'\n new unit obj id is ->',new_unit_data.id,'\n\n')
      const update_new_unit_data = await coursedata.updateOne(
        { _id: new_unit_data.id },
        { $push: { topics: new_topic.id } }
      );
  
      const update_new_subject = await video.updateOne(
        { collegename: collegename, subjectname: subjectname },
        { $push: { coursedata: new_unit_data.id } }
      );
      const get_subject_data = await video
        .find()
        .populate({
          path: "coursedata",
          populate: { path: "topics", model: "topics" },
        });
      //console.log(get_subject_data)
      //res.json(get_subject_data);
    } else if (find_college) {
      // agar subject ho to kya kare
      const is_course_available = await coursedata.findOne({
        combinedname: combinedname,
      });
      //console.log('is_course available :-> ',is_course_available,'\n\n' );
      if (!is_course_available) {
        const create_new_course = await coursedata.create({
          unitname: unitname,
          combinedname: combinedname,
          topics: new_topic.id,
        });
        const upadte_existing_subject = await video.updateOne(
          { subjectname: subjectname },
          { $push: { coursedata: create_new_course.id } }
        );
      } else {
        // agar course ho to kya kare
        const update_existing_course = await coursedata.updateOne(
          { combinedname: combinedname },
          { $push: { topics: new_topic.id } }
        );
      }
    }
    const get_subject_data = await video
      .find()
      .populate({
        path: "coursedata",
        populate: { path: "topics", model: "topics" },
      });
    //console.log(get_subject_data)
    res.json(get_subject_data);
  };
  
module.exports = {
  createvideodata,
  getvideodata,
  get_coursedetails_from_a_subject,
  getsubjectname,
  getyeardata,
  getsubjectdata,
  getalldata,
  getdepartmentdata,
  deletetopic,
  edittopic,
};
