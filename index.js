require('dotenv').config()
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const moment = require('moment');
mongoose.set('strictQuery', true);

const defaultItemList = [{ name: "Apple" }, { name: "Banana" }, { name: "Mango" }, { name: "Orange" }];
const https = require('https');

// var students=[]
// mongoose.connect("mongodb://localhost:27017/todoListDB");
mongoose.connect(process.env.MONGODB_URI)

const itemsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
})
const itemModel = mongoose.model('Item', itemsSchema);

const itemListSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    items: [itemsSchema]
});
const itemListModel = new mongoose.model('ItemList', itemListSchema);


app.set('view engine', 'ejs');
app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function (req, res) {
    // var today = new Date()
    var itemList = [];

    itemModel.find({}, function (err, items) {
        if (err) {
            console.log(err);
        }
        else {
            // console.log('items', items);
            if (items.length) {
                // itemList = items.map(x => x.name);
                res.render('index', { listTitle: moment().format('D-MMMM-YYYY'), itemList: items })
                // console.log('itemList:', itemList);
            }
            else {
                itemModel.insertMany(defaultItemList, function (err, item) {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log("Default item inserted successfully!");
                    }
                });
                res.redirect('/');
            }
        }
    });

});


app.post('/delete', function (req, res) {
    const listName = req.body.listTitle;
    const itemId = req.body.itemId;
    console.log(listName+","+itemId);
    if (listName === moment().format('D-MMMM-YYYY')) {
        itemModel.findByIdAndRemove(itemId, function (err, item) {
            if (err) {
                console.log(err);
            } else {
                console.log("Item deleted successfully!");
                res.redirect('/');
            }
        });
    } else {
        itemListModel.findOneAndUpdate( {name: listName}, {$pull : {items:{_id: itemId}}},function (err, listItem) { 
            if (err) {
                console.log(err);
            } else {
                console.log("Item deleted successfully! from "+listItem);
                res.redirect('/' + listName);
            }
        });
    }


});

app.get('/:listName', function (req, res) {
    const customListName = req.params.listName;
    itemListModel.findOne({ name: customListName }, function (err, list) {
        if (err) {
            console.log(err);
        }
        else {
            if (!list) {
                console.log('No list found so let create new default list with called :' + customListName + '.');
                itemListModel({ name: customListName, items: defaultItemList }).save();
                res.redirect('/' + customListName);
            } else {
                // console.log(list);
                res.render('index', { listTitle: customListName, itemList: list.items });
            }
        }
    })
    // itemListModel({name:customListName, items : [defaultItemList]}).save();
    // res.render('list', { listTitle: moment().format('D-MMMM-YYYY') ,  });
});

app.post("/", function (req, res) {
    // students.push(req.body.newItem);
    const listName = req.body.listName;
    const newItem = new itemModel({
        name: req.body.newItem
    });
    if (listName === moment().format('D-MMMM-YYYY')) {
        // itemModel({name:req.body.newItem}).save();
        newItem.save();
        res.redirect("/")
    } else {
        itemListModel.findOne({ name: listName }, function (req, foundList) {
            if (foundList) {
                foundList.items.push(newItem);
                foundList.save();
                res.redirect('/' + listName);
            } else {
                console.log("List not found: " + listName + ".");
            }
        });
    }



});

app.listen(process.env.PORT || 3001, () => {
    console.log('server is running on port http://localhost:3001');
});
