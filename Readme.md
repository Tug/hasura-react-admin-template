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

### TODO
- [ ] Move `server/start.sh` to `start.sh` and make it start the frontend as well
- [ ] Create an alias for docker-compose using env variables
- [ ] Actually make a production deployement script
- [ ] Auto-create super admin user on initial start
- [ ] Double check permissions in hasura
- [ ] Add new auth strategy: SMS code
- [ ] Finish building the frontend
