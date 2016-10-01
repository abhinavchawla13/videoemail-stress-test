import requests


for i in range(0, 50):
    r = requests.post("http://localhost:8080/api/stress-tester", data={"videoid": "#" + str(i)})
print(r.status_code)

