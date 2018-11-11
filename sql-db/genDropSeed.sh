node csvGenerator.js
mysql -u root < schema.sql
mysqlimport yelgat restaurants.csv -u root --local --columns=name_city_number,name
mysqlimport yelgat users.csv -u root --local --columns=name,location,reviews,friends,thumbnail
mysqlimport yelgat reviews.csv -u root --local --columns=id_users,id_restaurants,text,createdAt,stars

# make users' review count accurate
mysql -D 'yelgat' -u root -e 'UPDATE users SET reviews = (SELECT COUNT(id) FROM reviews WHERE reviews.id_users = users.id);'
