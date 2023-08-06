if __name__ == '__main__':
	from superspider import scraper
	import sys, datetime
	from jinja2 import Template
	args = sys.argv[1:]
	prefix = sys.argv[0].replace(__name__ + ".py","")
	if len(args) < 1:
		print("No website was specified.")
	else:
		myTitle = args[0].replace("https://","").replace("http://","")
		myTitle = myTitle[:myTitle.find("/")].split(".")[0] + "\'s Summary Data"
		myTitle = myTitle[0].upper() + myTitle[1:]
		x = scraper.scrape(args[0])
		t = Template(open(prefix + "templates/index.html",'r').read())
		for p in range(len(x)):
			x[p][0] = ",".join(x[p][0])
			x[p][1] = x[p][1].text
		z = {}
		for a,b in x:
			z[a] = b
		with open("yourdata.html","w") as w:
			w.write(t.render(content=z,title=myTitle,time=str(datetime.datetime.now()),url=args[0],Stype="Blog"))
