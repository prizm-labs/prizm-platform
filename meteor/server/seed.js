function seedCollection( collection, seedFile, seedObject, iterator ){

    if ( collection.find().count() === 0 ){
        console.log('seeding collection',seedObject);

        var documents = JSON.parse(Assets.getText(seedFile+'.json'))[seedObject];

        _.each( documents, function( doc ){

            if (iterator){
                doc = iterator(doc);
            }

            collection.insert(doc);
        });
    }

}

/*
Add user profile for images

var userId = `first user`

"profile": { "creator_id": userId  }

*/


/*
Game Piece Group

create group with all 52 cards in gamePieces
lookup item by slug

var userId = `first user`

{
    "pieces": {
        "cards": [...]
    },
    "profile": {
        "creator_id": userId,

        
    }
}

*/

/*
Inventory Items
*/