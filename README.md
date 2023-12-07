# Gains
Admin panel which can track customers and their payments.


# Todo
- proper authentication and authorization.
- implement search feature in customers page.
- filters - filter by paymentStatus, joining date, added recently (createdAt: -1)
- should work on schedulers for updating payment status
- add forgot password text in login page. and create UI
- add navbar logout button inside profile avatar options (update navbar)
- create transaction obj during customer creation - DONE
- create transaction obj during update payment
- should add partner id in all levels
- add loaders for all modal popups

## Long scope
- every 'any' should be replaced with proper interface
- all the find query's should have select statements.
- payment type is always gonna be 'CASH' try to capture that in future.
- saved a new desing in books mark for layout.
- payment's should be handled in different service(payment-service)
- services should be divided based on services not on roles. (i.e admin-service is wrong)


### paymentdue refactor thought process
- payment due collection should be renamed to membership collection
- every user should have a doc in membership collection, i.e, relation between user and membership should be one to one
- all fields related to membership should be removed from user collection and saved in membership collections
- scheduler should only targert membership collection.
- when making a payment, membership valid upto should be updated and a transaction doc in transaction collection should
  be created
- fields that need to be removed from user collection
    - vaildUpto
    - paymentStatus
    - membershipFee
    - membershipDuriation
- update models in all collections


## Quick Fixes
- Customers page paginationation, inital previous button should be disabled
- Frontend: add apiSlic end points in .env file 
- Onces token expires and logouts. next login getCustomers api is always failing and signing out.
