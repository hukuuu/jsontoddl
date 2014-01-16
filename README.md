#jsontosql

simple cli tool for translating json data to sql inserts

It will convert this
```
{
    "id": 1,
    "name": "John Doe",
    "age": 45
}
```
to this

```
insert into [tablename] ( id, name, age ) values ( 1, 'John Doe', 45 )
```

##instalation

1. clone the repository
2. npm link

##usage

```jsontosql -i data.json -o result.sql -t Contacts```

```jsontosql -i http://www.json-generator.com/j/cagiEUCgLC?indent=0 -o result.sql -t Contacts```

you can use [online json generator](http://www.json-generator.com/) to generate data.