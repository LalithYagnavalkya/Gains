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
- rename paymentType to paymentMethod in transactions collections.

## Long scope
- every 'any' should be replaced with proper interface
- all the find query's should have select statements.
- payment type is always gonna be 'CASH' try to capture that in future.
- saved a new desing in books mark for layout.
- payment's should be handled in different service(payment-service)
- services should be divided based on services not on roles. (i.e admin-service is wrong)

## Quick Fixes
- Customers page paginationation, inital previous button should be disabled
- Frontend: add apiSlic end points in .env file 
- Onces token expires and logouts. next login getCustomers api is always failing and signing out.
g