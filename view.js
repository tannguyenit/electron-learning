let $ = require('jquery')
let fs = require('fs')
const fsPromises = require('fs/promises');

let filename = 'contacts'
let sno = 0

$('#add-to-list').on('click', () => {
   let name = $('#Name').val()
   let email = $('#Email').val()

   try {
    addToFile(name + ',' + email + '\n')
    // fs.appendFile('contacts', name + ',' + email + '\n')
   } catch (error) {
    console.log(error, 'error');
   }

   addEntry(name, email)
})

const addToFile = async data => {
    let fileContents = await fsPromises.readFile(filename, { encoding: 'utf8' });
    // console.log(fileContents, 'fileContents');
    fileContents += data
    // fileContents.push(data);
    await fsPromises.writeFile(filename, fileContents, { encoding: 'utf8' });
  };

function addEntry(name, email) {
   if(name && email) {
      sno++
      let updateString = '<tr><td>'+ sno + '</td><td>'+ name +'</td><td>' 
         + email +'</td></tr>'
      $('#contact-table').append(updateString)
   }
}

function loadAndDisplayContacts() {  
   
   //Check if file exists
   if(fs.existsSync(filename)) {
      let data = fs.readFileSync(filename, 'utf8').split('\n')
      
      data.forEach((contact) => {
         let [ name, email ] = contact.split(',')
         addEntry(name, email)
      })
   
   } else {
      console.log("File Doesn\'t Exist. Creating new file.")
      fs.writeFile(filename, '', (err) => {
         if(err)
            console.log(err)
      })
   }
}

loadAndDisplayContacts()
