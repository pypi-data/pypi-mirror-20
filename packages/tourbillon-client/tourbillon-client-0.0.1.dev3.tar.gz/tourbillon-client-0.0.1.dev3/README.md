# Tourbillon Client

## Usage


### Connection
```python
from tourbillon_client import Client

client = Client('http[s]://<tourbillon instance>[:<tourbillon port>]/')

```

### Create a table
```python
client.create('ham')
```

### Delete a table
```python
client.delete('ham')
```

### Write data to a table
```python
client.create('ham')
sample_data = [
    ('2016-11-03 01:00', 10),
    ('2016-11-03 02:00', 20),
    ('2016-11-03 04:00', 40),
    ('2016-11-03 05:00', 50),
]
client.write('ham', sample_data)
```


### Read back data
```python
result = client.read('ham', '2016-11-01', '2016-11-05')
print(result)
#                      value
# index
# 2016-11-03 01:00:00     10
# 2016-11-03 02:00:00     20
# 2016-11-03 04:00:00     40
# 2016-11-03 05:00:00     50
```
