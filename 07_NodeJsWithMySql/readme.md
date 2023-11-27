# Implementing Node.js with MySQL

## Pre-requisites

- Install and run XAMPP
  Official Page: https://sourceforge.net/projects/xampp/
  Start MySQL from XAMPP Control Panel
- Install command line MySQL
  Add MySQL bin folder to the Path ambient variable
  Verify current: $env:Path  
  Add directory temporarily: $senv:Path += ";C:\XAMPP\mysql\bin"
  Add dir definitively using Admin Terminal: [Environment]::SetEnvironmentVariable("Path", $env:Path + ";C:\XAMPP\mysql\bin", "Machine")
- Start command line MySQL
  mysql -u root
- Use cmd of MySQL
  SHOW DATABASES;
