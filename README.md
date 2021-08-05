# EmployeeManagementSystem
Technology Stack
- .Net Core Web Api
- Angular CLI: 12
- Node: v14
- Postgres Sql

# Local development setup
~~~
git clone https://github.com/sresta/EmployeeManagementSystem.git
cd EmployeeManagementSystem
open EmployeeManagementSystem.sln with visual studio 19
cd Ui/client
npm install
~~~

## Running frontend, backend and sidekiq
- Frontend (from client folder): ng serve -o
- API: Start IIS express from visual studio
 
## Default login credential for admin
Admin user is seed to database.
- Email: admin@gmail.com
- Password: P@ssw0rd
Now you can visit the site with the URL http://localhost:4200
