const mongoose = require('mongoose');

mongoose
  .connect(
    "mongodb+srv://jiencyu:SH85x4D2pOdwCKsM@cluster0.tfz0x.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

  const personSchema = new mongoose.Schema({
    firstName: {
        type: String,
        require: true,
        trim: true,
    },

    lastName: {
        type: String, 
        require: true,
        trim: true,
    },

    age: {
        type: Number,
        require: true,
        min: 0,
    },

    govId: {
        type: String,
        require: true,
        unique: true,
    }
  })

  const Person = mongoose.model('Persons', personSchema);

  async function findPerson(govId) {
    try {
        const person = await Person.findOne({govId});
        if (!person) {
            console.log("gov id not found");
        } else {
            console.log("person was found", person);
            return person;
        }
    } catch (err) {
        console.log("cant find person", err.message);
    }
}

async function savePerson(fName, lName, age, id) {
    const newPerson = new Person({fName, lName, age, id});
    try {
        const savePerson = await newPerson.save();
        console.log("new person saved successfully");
    } catch (err) {
        console.log("error saveing person", err.message);
    }
}

async function updatePersonName(name, govId) {
    try {
        const updatedPerson = await Person.findOneAndUpdate(
            { govId },
            { firstName: name },
          );

          if (!updatedPerson) {
            console.log("ccan't find person by id")
          } else {
            console.log("person was updated", updatePerson);
          }

    } catch (err) {
        console.log("can't delete person", err.message);

    }
}

async function deletePerson(govId) {
    try {
        const deletedPerson = await Person.delete(govId);
        if (!deletedPerson) {
            console.log("gov id not found");
        } else {
            console.log("person deleted", deletedPerson);
        }
    } catch (err) {
        console.log("error deleting", err.message);
    }
}

(async () => {
    await savePerson("Aleks", "Deobp", 10, '21u21b2hr');
    await savePerson("Dudu", "Voodoo", 44, 'qwfwq214');
    await findPerson("qwfwq214");
    await updatePersonName('updateName', '21u21b2hr' )
    await deletePerson("doqwfwq214r");
  
    // Close the connection after all operations are done
    mongoose.connection.close();
  })();