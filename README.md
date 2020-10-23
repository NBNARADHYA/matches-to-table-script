# matches-to-table-script

Downloads football stats from footall-data.co.uk using curl and pipes it into a node script which is then imported into Postgresql tables


## Steps

1.  **Clone the repo**
  - `git clone https://github.com/NBNARADHYA/matches-to-table-script.git` for https
  - `git clone git@github.com:NBNARADHYA/matches-to-table-script.git` for ssh

2.  **cd to the directory**
    `cd matches-to-table-script`
    
3.  **Install all dependencies**
    `npm install`
    
4.  **Create a postgres user called football-stats and a database named the same**
  - `createuser -U postgres -P football-stats`
  - It will prompt you for the password and confirm password. Enter them
  - `createdb -U postgres -O football-stats football-stats`
5.  **Change postgres password authentication from `peer` to `md5`**
  - Find your `pg_hba` config file located at `/etc/postgresql/{your_postgresql_version}/main/pg_hba.conf`
  - Change from `local   all             postgres                                peer` to `local   all             postgres                                md5`
  - Add this line `local   sameuser        all                                     md5`
6.  Now execute the `shell` script `./football-data.sh`
7. Done! Now all the data has been stored in different tables.
