/*
===User like schema and block schema===

in user.entity.ts file
Add ref for like and block user
{ type: Schema.Types.ObjectId, ref: "user" }
https://mongoosejs.com/docs/populate.html

While retriving the list for like and block user we will populate the
block and like user. 

Also remove the entity of like user and block user from entity folder.

===delete photos===
take id of the photo instead of the url (If there is any particular reason let me know)
just like $push use $pull to make the code readable

===uid===
uid is just an id we get from firebase. so we dont have to rely on uid from now.
we have to use mobile number and _id for our search for now.

=====Chat=======

User have seen the msg or not
displaying the list of new msg received 

*/