dont delete this

things you can optimize in future
- right now using both email and phone unique true;
- admin are loggin in with emails and are store in users collection
- bulk upload for user doesn't have emails but has phone numbers
- right now i will depend on emails because its free to send emails
- but in future we have to make phone numbers unique 


- todo
- save partner details when registering the admin in super admin controller
- while inserting user in bulk we will have to add partnerId to each user (get it from middleware if you fetch details of the user)