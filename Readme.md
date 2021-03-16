# Hasura React Admin Template

This is a template for starting a new SaaS project with everything build in:
- Hasura for the backend
- Hasura Backend Plus for Authentication and Storage
- React-Admin frontend which connects to hasura and has ready to use views

## Getting Started
```bash
curl -H 'x-hasura-admin-secret: a_long_secret_that_should_never_be_used_in_production' -d '{"email":"tug@tugdev.net", "password":"StrongPasswordNot1234", "user_data": { "first_name": "Tugdual", "last_name": "de Kerviler"}}' -H "Content-Type: application/json" -X POST http://localhost:4000/auth/register
```
Go to the Hasura console and copy your user id to the public organization admin_id

## Running locally

To start the containers needed for the backend just run:

```
./server/start.sh
```

Then cd to `client` and run `npm start`.


## Deploying in production

You can use [NHost](https://nhost.io/) for a managed stack.
A lot is still TBD in terms of automating deployments.
Assets should simply be uploaded to a static server or CDN.

### TODO
- [ ] [Ops] Create an alias for docker-compose using env variables
- [ ] [Ops] Actually make a production deployment script
- [ ] [Ops] Auto-create super admin user on initial start
- [ ] [Hasura] Double check permissions on tables in hasura
- [ ] [HBP] Add new auth strategies: SMS code or magic link
- [ ] [HBP] Customize emails
- [ ] [Frontend] configuration page for 2FA
- [ ] [Frontend] Finish building the CRUD views
- [ ] [Frontend] Super admin can invite other super admins
- [ ] [Frontend] Org admins can invite user in their org
- [ ] [Backend] Add a server for Hasura Actions or find a way to extend HBP
- [ ] [Backend] A stripe connection for subscriptions and invoices
