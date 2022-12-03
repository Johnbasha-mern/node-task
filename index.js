var express = require('express')
var multer = require('multer')
var mongoose = require('mongoose')
var path = require('path')
var bodyParser = require('body-parser')
var csv = require('csvtojson')



// dotenv.config();
const app = express();
// app.use(cors());
app.use(express.json());
const PORT =  5000;
app.get("/", async function (req,res){
    res.json(`this task server is working on port no ${PORT}`)
});

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './public/uploads')
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname)
    },
  })

  var uploads = multer({ storage: storage })
  mongoose
    .connect("mongodb+srv://shoukathsandy:shoukath123@cluster0.elsl2.mongodb.net/task-node", { useNewUrlParser: true })
    .then(() => console.log('Connected'))
    .catch((err) => console.log(err))
  app.set('view engine', 'ejs')
  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(express.static(path.resolve(__dirname, 'public')))
  app.get('/', (req, res) => {
    studentSchema.find((err, data) => {
      if (err) {
      } else {
        if (data != '') {
          res.render('index', { data: data })
        } else {
          res.render('index', { data: '' })
        }
      }
    })
  })
  var empResponse
  app.post('/upload', uploads.single('csvFile'), (req, res) => {
    csv()
      .fromFile(req.file.path)
      .then((response) => {
        for (var x = 0; x < response; x++) {
          empResponse = parseFloat(response[x].Id)
          response[x].Id = empResponse
          empResponse = parseFloat(response[x].Name)
          response[x].Name = empResponse
          empResponse = parseFloat(response[x].	Age)
          response[x].Age = empResponse
          empResponse = parseFloat(response[x].	Mark1)
          response[x].Mark1 = empResponse
          empResponse = parseFloat(response[x].	Mark2)
          response[x].Mark2 = empResponse
          empResponse = parseFloat(response[x].	Mark3)
          response[x].Mark3 = empResponse
        }
        studentSchema.insertMany(response, (err, data) => {
          if (err) {
            console.log(err)
          } else {
            res.redirect('/upload')
          }
        })
      })
  })
  app.post("/students/:id", async (req, res) => {
    const { Id } = req.params;
    try {
      const student = await studentSchema.findById(Id);
      res.status(200).json(student);
    } catch (error) {
      res.status(404).json({ message: "Something went wrong" });
    }
}
  );

  app.listen(5000, ()=>{console.log(`this server running on ${PORT}`)});