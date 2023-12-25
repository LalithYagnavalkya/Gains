# Gains
Admin panel which can track customers and their payments.


# Todo
- proper authentication and authorization.
- implement search feature in customers page. - DONE
- filters - filter by paymentStatus, joining date, added recently (createdAt: -1)
- should work on schedulers for updating payment status
- add navbar logout button inside profile avatar options (update navbar)
- add loaders every where
- logout user if the token is expired.

## Long scope
- every 'any' should be replaced with proper interface
- all the find query's should have select statements.
- payment type is always gonna be 'CASH' try to capture that in fu ture.
- saved a new desing in books mark for layout.
- payment's should be handled in different service(payment-service)
- services should be divided based on services not on roles. (i.e admin-service is wrong)

## Quick Fixes
- Customers page paginationation, inital previous button should be disabled - DONE
- Frontend: add apiSlic end points in .env file 
- Onces token expires and logouts. next login getCustomers api is always failing and signing out.


## Issues 
 Because of RAM memory constraints, I must maintain fewer services. In my ec2 instance, I only have 1GB of RAM.