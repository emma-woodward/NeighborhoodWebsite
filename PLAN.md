# The Plan

# Today (6/11/22)

- Put invitation code in it's own component\*\*
- Make dashboards look more visually pleasing.
- Apply prettier to all js files [Apply prettier with CLI](https://github.com/prettier/prettier-vscode/issues/321)
- If there's more time and energy, start cleaning up backend code.

Notes:

- Create endpoint to remove all invites
- Perhaps have an associated name with each of the invites and allow an admin to view a list of active invites
- Figure out a new dashboard layout that makes sense and looks good.
- Look at testing the backend and frontend.
  - Use supertest for backend; may require some refactoring.
  - For the frontend, take a look at this [React Testing](https://reactjs.org/docs/testing.html)

## Version 0.0

- Be able to have admin and user accounts and allow them to have their own respective panels; allow them to login and logout reliably; allow users to reset passwords and emails; allow admins to reset passwords and emails on the user's behalf.
- Allow admins to create, modify, and remove announcements.
- Allow admins to create, modify, and remove documents in both public and private facing sections of the site.
- Meaningful documentation for running and building project.
- Fix vulnerabilities in dependencies.
- Replace @material-ui components with @mui components.

## Version 0.1

- Fix any bugs and issues with 1.0.
- Revise documentation as needed.
- Typescriptify both backend and frontend.
