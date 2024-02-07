# Gains
Admin panel which can track customers and their payments.


# Todo
- filters - filter by paymentStatus, joining date, added recently (createdAt: -1) - UI in progress
- add navbar logout button inside profile avatar options (update navbar)
- add loaders every where
- add dummy data in db.
- create a landing page for gains. and add it in the sheet - Done
- add pending customers in dashboard in place of recent sales - can switch between them


## Long scope
- every 'any' should be replaced with proper interface
- all the find query's should have select statements.
- payment type is always gonna be 'CASH' try to capture that in future.
- saved a new desing in books mark for layout.
- payment's should be handled in different service(payment-service)
- services should be divided based on services not on roles. (i.e admin-service is wrong)

## Quick Fixes
- Customers page paginationation, inital previous button should be disabled - DONE
- Frontend: add apiSlic end points in .env file  


## Issues 
 Because of RAM memory constraints, I must maintain fewer services. In my ec2 instance, I only have 1GB of RAM.
 - shifted every API into admin-service, now the project is monolithic
